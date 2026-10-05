"use client";

import {
  animate,
  createDrawable,
  createScope,
  createSpring,
  createTimeline,
  stagger,
  type Scope,
} from "animejs";
import { useEffect, useId, useRef } from "react";
import { onIntroDone, prefersReducedMotion } from "@/lib/motion";
import { COMPACT_GRAPH, GRAPH, NODES } from "./geometry.mjs";
import { LogoMark } from "./LogoMark";

type Trigger = "mount" | "intro" | "scroll";

type Props = {
  className?: string;
  compact?: boolean;
  weight?: number;
  title?: string;
  // Cuándo se dibuja: al montar, al terminar el preloader o al entrar en pantalla.
  trigger?: Trigger;
  // Más lento y lucido (preloader) o rápido (cabecera).
  duration?: "long" | "short";
  // Puntos que corren por la red saltando de nodo en nodo.
  packets?: boolean;
  // Puntos simultáneos como máximo.
  maxPackets?: number;
  // Reacciona al cursor: los corchetes se abren y los nodos laten.
  interactive?: boolean;
};

const SVG_NS = "http://www.w3.org/2000/svg";

// Lista de vecinos de cada nodo a partir de los segmentos del grafo.
function adjacency(segments: string[][]) {
  const map = new Map<string, string[]>();
  for (const [a, b] of segments) {
    map.set(a, [...(map.get(a) ?? []), b]);
    map.set(b, [...(map.get(b) ?? []), a]);
  }
  return map;
}

const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)];

export function AnimatedLogo({
  className = "",
  compact = false,
  weight = 1,
  title,
  trigger = "mount",
  duration = "long",
  packets = false,
  maxPackets = 6,
  interactive = true,
}: Props) {
  const id = useId().replace(/:/g, "");
  const root = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const markReady = () => el.setAttribute("data-ready", "");
    if (prefersReducedMotion()) {
      markReady();
      return;
    }

    const cleanups: Array<() => void> = [];
    const k = duration === "long" ? 1 : 0.55;
    const spring = createSpring({ stiffness: 220, damping: 12 });
    const w = compact ? 1.6 : weight;

    const scope: Scope = createScope({ root: el }).add(() => {
      const svg = el.querySelector("svg")!;
      const primary = createDrawable(el.querySelectorAll(".logo-primary"));
      const mesh = createDrawable(el.querySelectorAll(".logo-mesh"));
      const nodes = el.querySelectorAll<SVGCircleElement>(".logo-node");
      const left = el.querySelectorAll(".logo-bracket-left, .logo-knockout-left");
      const right = el.querySelectorAll(".logo-bracket-right, .logo-knockout-right");

      // Estado inicial: todo sin dibujar. Después ya se puede mostrar.
      animate([...primary, ...mesh], { draw: "0 0", duration: 0 });
      animate(nodes, { scale: 0, duration: 0 });
      animate(left, { x: 22, opacity: 0, duration: 0 });
      animate(right, { x: -22, opacity: 0, duration: 0 });
      markReady();

      let afterIntro = () => {};
      const intro = createTimeline({ autoplay: false, onComplete: () => afterIntro() })
        .add(primary, { draw: ["0 0", "0 1"], duration: 900 * k, ease: "inOutQuart", delay: stagger(110 * k) })
        .add(mesh, { draw: ["0 0", "0 1"], duration: 650 * k, ease: "outQuad", delay: stagger(22 * k) }, 350 * k)
        .add(nodes, { scale: [0, 1], ease: spring, delay: stagger(28 * k, { from: "center" }) }, 450 * k)
        .add([...left, ...right], { x: 0, opacity: 1, duration: 900 * k, ease: "outExpo" }, 900 * k);

      if (trigger === "mount") intro.play();
      else if (trigger === "intro") cleanups.push(onIntroDone(() => intro.play()));
      else {
        // IntersectionObserver: más fiable que un umbral de scroll cuando se
        // salta directamente a la sección (anclas, teclado, "ir al final").
        const io = new IntersectionObserver(
          ([entry]) => {
            if (!entry.isIntersecting) return;
            intro.play();
            io.disconnect();
          },
          { threshold: 0.3 },
        );
        io.observe(svg);
        cleanups.push(() => io.disconnect());
      }

      // Visible en pantalla y pestaña activa: si no, no se lanza nada nuevo.
      let visible = true;
      const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
      io.observe(svg);
      cleanups.push(() => io.disconnect());
      const active = () => visible && !document.hidden;

      const nodeById = new Map([...nodes].map((n) => [n.dataset.node!, n]));
      const layer = el.querySelector(".logo-packets")!;

      // Onda cian que sale de un nodo cuando le llega un paquete.
      const ripple = (nodeId: string) => {
        const n = NODES[nodeId];
        const ring = document.createElementNS(SVG_NS, "circle");
        ring.setAttribute("cx", String(n.x));
        ring.setAttribute("cy", String(n.y));
        ring.setAttribute("fill", "none");
        ring.setAttribute("stroke", "var(--accent)");
        ring.setAttribute("stroke-width", String(2 * w));
        layer.appendChild(ring);
        animate(ring, {
          r: [n.r * w, n.r * w + 14 * w],
          opacity: [0.9, 0],
          duration: 700,
          ease: "outQuad",
          onComplete: () => ring.remove(),
        });
        const node = nodeById.get(nodeId);
        if (node) {
          animate(node, {
            scale: [{ to: 1.5, duration: 140 }, { to: 1, ease: spring }],
            composition: "replace",
          });
        }
      };

      afterIntro = () => {
        // Los nodos titilan en reposo para que la red se note viva.
        const twinkle = window.setInterval(() => {
          if (!active()) return;
          const node = pick([...nodes]);
          animate(node, { opacity: [{ to: 0.35, duration: 260 }, { to: 1, duration: 520 }] });
        }, 380);
        cleanups.push(() => window.clearInterval(twinkle));

        if (!packets) return;

        // Paquetes de datos que saltan de nodo en nodo por la red.
        const graph = adjacency(compact ? COMPACT_GRAPH : GRAPH);
        const ids = [...graph.keys()];
        let running = 0;

        const launch = () => {
          if (!active() || running >= maxPackets) return;
          running++;
          let current = pick(ids);
          let previous = "";
          const start = NODES[current];

          const packet = document.createElementNS(SVG_NS, "g");
          const halo = document.createElementNS(SVG_NS, "circle");
          halo.setAttribute("r", String(7 * w));
          halo.setAttribute("fill", "var(--accent)");
          halo.setAttribute("opacity", "0.25");
          const core = document.createElementNS(SVG_NS, "circle");
          core.setAttribute("r", String(3.2 * w));
          core.setAttribute("fill", "var(--accent)");
          packet.append(halo, core);
          packet.setAttribute("transform", `translate(${start.x} ${start.y})`);
          layer.appendChild(packet);

          const pos = { x: start.x, y: start.y };
          const tl = createTimeline({
            onComplete: () => {
              packet.remove();
              running--;
            },
          }).add(packet, { opacity: [0, 1], duration: 200 });

          const hops = 3 + Math.floor(Math.random() * 4);
          for (let i = 0; i < hops; i++) {
            const options = (graph.get(current) ?? []).filter((n) => n !== previous);
            const next = pick(options.length ? options : graph.get(current) ?? [current]);
            const a = NODES[current];
            const b = NODES[next];
            const distance = Math.hypot(b.x - a.x, b.y - a.y);
            tl.add(pos, {
              x: b.x,
              y: b.y,
              duration: 260 + distance * 4.5,
              ease: "inOutSine",
              onUpdate: () => packet.setAttribute("transform", `translate(${pos.x} ${pos.y})`),
              onComplete: () => ripple(next),
            });
            previous = current;
            current = next;
          }
          tl.add(packet, { opacity: 0, duration: 260 });
        };

        launch();
        const timer = window.setInterval(launch, 340);
        cleanups.push(() => {
          window.clearInterval(timer);
          layer.replaceChildren();
        });
      };

      // Al pasar el cursor: los corchetes "se abren" y los nodos laten.
      if (interactive) {
        const enter = () => {
          animate(left, { x: -7, ease: spring });
          animate(right, { x: 7, ease: spring });
          animate(nodes, {
            scale: [{ to: 1.4, duration: 180 }, { to: 1, ease: spring }],
            delay: stagger(18, { from: "center" }),
          });
        };
        const leave = () => {
          animate([...left, ...right], { x: 0, ease: spring });
        };
        // Si el logo va dentro de un enlace (logo + nombre), reacciona a todo el enlace.
        const hoverTarget = el.closest("a") ?? el;
        hoverTarget.addEventListener("pointerenter", enter);
        hoverTarget.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          hoverTarget.removeEventListener("pointerenter", enter);
          hoverTarget.removeEventListener("pointerleave", leave);
        });
      }
    });

    return () => {
      cleanups.forEach((fn) => fn());
      scope.revert();
    };
  }, [trigger, duration, packets, maxPackets, interactive, compact, weight]);

  return (
    <span ref={root} data-logo-anim="" className={`inline-block ${className}`}>
      <LogoMark id={id} compact={compact} weight={weight} title={title} className="block h-full w-full" />
    </span>
  );
}

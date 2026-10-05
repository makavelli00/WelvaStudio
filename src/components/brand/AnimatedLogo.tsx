"use client";

import {
  animate,
  createDrawable,
  createMotionPath,
  createScope,
  createSpring,
  createTimeline,
  stagger,
  type Scope,
} from "animejs";
import { useEffect, useId, useRef } from "react";
import { onIntroDone, prefersReducedMotion } from "@/lib/motion";
import { LogoMark } from "./LogoMark";

type Trigger = "mount" | "intro" | "scroll";

type Props = {
  className?: string;
  compact?: boolean;
  title?: string;
  // Cuándo se dibuja: al montar, al terminar el preloader o al entrar en pantalla.
  trigger?: Trigger;
  // Más lento y lucido (preloader) o rápido (cabecera).
  duration?: "long" | "short";
  // Paquetes de datos que recorren la red en bucle (solo en tamaños grandes).
  packets?: boolean;
  // Reacciona al cursor: los corchetes se abren y los nodos laten.
  interactive?: boolean;
};

const SVG_NS = "http://www.w3.org/2000/svg";

export function AnimatedLogo({
  className = "",
  compact = false,
  title,
  trigger = "mount",
  duration = "long",
  packets = false,
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

    const scope: Scope = createScope({ root: el }).add(() => {
      const svg = el.querySelector("svg")!;
      const primary = createDrawable(el.querySelectorAll(".logo-primary"));
      const mesh = createDrawable(el.querySelectorAll(".logo-mesh"));
      const nodes = el.querySelectorAll(".logo-node");
      const left = el.querySelectorAll(".logo-bracket-left, .logo-knockout-left");
      const right = el.querySelectorAll(".logo-bracket-right, .logo-knockout-right");

      // Estado inicial: todo sin dibujar. Después ya se puede mostrar.
      animate([...primary, ...mesh], { draw: "0 0", duration: 0 });
      animate(nodes, { scale: 0, duration: 0 });
      animate(left, { x: 22, opacity: 0, duration: 0 });
      animate(right, { x: -22, opacity: 0, duration: 0 });
      markReady();

      let startPackets = () => {};
      const intro = createTimeline({ autoplay: false, onComplete: () => startPackets() })
        .add(primary, { draw: ["0 0", "0 1"], duration: 900 * k, ease: "inOutQuart", delay: stagger(110 * k) })
        .add(mesh, { draw: ["0 0", "0 1"], duration: 650 * k, ease: "outQuad", delay: stagger(28 * k) }, 350 * k)
        .add(nodes, { scale: [0, 1], ease: spring, delay: stagger(35 * k, { from: "center" }) }, 450 * k)
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

      // Paquetes de datos viajando por la red, solo cuando ya está dibujada.
      if (packets) startPackets = () => {
        const layer = el.querySelector(".logo-packets")!;
        const paths = [...el.querySelectorAll<SVGPathElement>(".logo-mesh, .logo-primary")];
        let visible = true;
        const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
        io.observe(svg);
        const send = () => {
          if (!visible || document.hidden) return;
          const path = paths[Math.floor(Math.random() * paths.length)];
          const dot = document.createElementNS(SVG_NS, "circle");
          dot.setAttribute("r", compact ? "7" : "3.5");
          dot.setAttribute("fill", "var(--accent)");
          layer.appendChild(dot);
          const reverse = Math.random() > 0.5;
          animate(dot, {
            ...createMotionPath(path),
            opacity: [0, 1, 1, 0],
            duration: 1400,
            ease: "inOutSine",
            reversed: reverse,
            onComplete: () => dot.remove(),
          });
        };
        const timer = window.setInterval(send, 520);
        cleanups.push(() => {
          window.clearInterval(timer);
          io.disconnect();
          layer.replaceChildren();
        });
      };

      // Al pasar el cursor: los corchetes "se abren" y los nodos laten.
      if (interactive) {
        const enter = () => {
          animate(left, { x: -7, ease: spring });
          animate(right, { x: 7, ease: spring });
          animate(nodes, {
            scale: [{ to: 1.35, duration: 180 }, { to: 1, ease: spring }],
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
  }, [trigger, duration, packets, interactive, compact]);

  return (
    <span ref={root} data-logo-anim="" className={`inline-block ${className}`}>
      <LogoMark id={id} compact={compact} title={title} className="block h-full w-full" />
    </span>
  );
}

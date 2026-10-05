"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { onIntroDone, prefersReducedMotion } from "@/lib/motion";
import { AnimatedLogo } from "./AnimatedLogo";
import { NODES, PRIMARY, STROKE, VIEWBOX, W_EXTRUSION, segmentPath } from "./geometry.mjs";

gsap.registerPlugin(ScrollTrigger);

// Capas de profundidad de la W: juntas forman sus caras laterales.
const LAYERS = 22;
const STEP = 2.2; // px entre capas

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a: string, b: string, t: number) => {
  const [x, y] = [hex(a), hex(b)];
  return `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * t)).join(",")})`;
};

function ExtrusionLayer({ index }: { index: number }) {
  const color = mix(W_EXTRUSION.near, W_EXTRUSION.far, index / (LAYERS - 1));
  return (
    <svg
      viewBox={VIEWBOX}
      aria-hidden
      className="logo3d-layer absolute inset-0 h-full w-full overflow-visible"
      style={{ transform: `translateZ(${-(index + 1) * STEP}px)` }}
    >
      <g fill="none" stroke={color} strokeLinecap="round" strokeWidth={STROKE.primary}>
        {PRIMARY.map((seg) => (
          <path key={seg.join("-")} d={segmentPath(seg)} />
        ))}
      </g>
      <g fill={color}>
        {Object.values(NODES)
          .filter((n) => n.hub)
          .map((n) => (
            <circle key={`${n.x}-${n.y}`} cx={n.x} cy={n.y} r={n.r} />
          ))}
      </g>
    </svg>
  );
}

// Logo grande del hero con volumen: W extruida, inclinación con el ratón,
// balanceo en reposo y giro al hacer scroll.
export function HeroLogo3D({ className = "" }: { className?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const swayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollRef.current;
    const tilt = tiltRef.current;
    const sway = swayRef.current;
    if (!scroller || !tilt || !sway) return;

    const layers = sway.querySelectorAll<SVGElement>(".logo3d-layer");

    if (prefersReducedMotion()) {
      // Sin movimiento, pero con un ángulo fijo que deja ver el volumen.
      gsap.set(sway, { rotationY: -16, rotationX: 8 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(layers, { opacity: 0 });
      gsap.set(sway, { rotationY: -14, rotationX: 6 });

      // Las capas aparecen de delante hacia atrás cuando la W ya está dibujada.
      const stop = onIntroDone(() => {
        gsap.to(layers, { opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.025, delay: 0.7 });
        gsap.to(sway, {
          rotationY: 14,
          rotationX: -5,
          duration: 4.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 0.7,
        });
      });

      // Inclinación hacia el cursor.
      const rotY = gsap.quickTo(tilt, "rotationY", { duration: 1.2, ease: "power3.out" });
      const rotX = gsap.quickTo(tilt, "rotationX", { duration: 1.2, ease: "power3.out" });
      const onMove = (e: PointerEvent) => {
        rotY((e.clientX / window.innerWidth - 0.5) * 34);
        rotX(-(e.clientY / window.innerHeight - 0.5) * 22);
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      // Al hacer scroll gira, se aleja y se desvanece.
      gsap.to(scroller, {
        rotationY: 50,
        rotationX: 18,
        scale: 0.75,
        yPercent: -12,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: { trigger: scroller.closest("section"), start: "top top", end: "bottom top", scrub: true },
      });

      return () => {
        stop();
        window.removeEventListener("pointermove", onMove);
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={`[perspective:1100px] ${className}`}>
      <div ref={scrollRef} className="relative h-full w-full [transform-style:preserve-3d]">
        <div ref={tiltRef} className="relative h-full w-full [transform-style:preserve-3d]">
          <div ref={swayRef} className="relative h-full w-full [transform-style:preserve-3d]" style={{ willChange: "transform" }}>
            {/* Halo cian detrás de la pieza */}
            <div
              aria-hidden
              className="absolute inset-[10%] rounded-full bg-accent/20 blur-[60px]"
              style={{ transform: `translateZ(${-(LAYERS + 20) * STEP}px)` }}
            />
            {Array.from({ length: LAYERS }, (_, i) => (
              <ExtrusionLayer key={i} index={LAYERS - 1 - i} />
            ))}
            {/* Cara frontal: el logo animado completo */}
            <AnimatedLogo
              trigger="intro"
              packets
              maxPackets={8}
              title="Welva Studio"
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { animate, createDrawable, createScope, onScroll, type Scope } from "animejs";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

// Trazo "a mano" que se dibuja alrededor de una palabra al hacer scroll.
export function Scribble({ className = "" }: { className?: string }) {
  const root = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    const svg = root.current;

    const scope: Scope = createScope({ root: svg }).add(() => {
      animate(createDrawable(svg.querySelectorAll("path")), {
        draw: ["0 0", "0 1"],
        ease: "inOutQuad",
        duration: 1000,
        autoplay: onScroll({
          target: svg,
          enter: "bottom top",
          leave: "center bottom",
          sync: 0.4,
        }),
      });
    });

    return () => scope.revert();
  }, []);

  return (
    <svg
      ref={root}
      viewBox="0 0 320 150"
      fill="none"
      aria-hidden
      className={`pointer-events-none absolute overflow-visible ${className}`}
    >
      <path
        d="M58 92C30 58 92 22 176 16c86-6 136 26 128 66-8 42-86 58-170 54C56 132 6 104 22 70 34 44 82 30 132 26"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M226 140c22 2 44-2 62-12"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

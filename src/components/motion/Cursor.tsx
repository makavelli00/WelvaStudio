"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";

type CursorState = "default" | "hover" | "view" | "drag" | "hidden";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>("hidden");
  const enabled = useMediaQuery("(pointer: fine) and (hover: hover)");

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");
    return () => document.documentElement.classList.remove("has-cursor");
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !dot.current || !ring.current) return;

    const dotX = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
    const dotY = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });
    const ringX = gsap.quickTo(ring.current, "x", { duration: 0.5, ease: "power3" });
    const ringY = gsap.quickTo(ring.current, "y", { duration: 0.5, ease: "power3" });

    let last: { x: number; y: number } | null = null;

    const update = (x: number, y: number) => {
      const target = document
        .elementFromPoint(x, y)
        ?.closest<HTMLElement>("[data-cursor], a, button");
      setState((target?.dataset.cursor as CursorState | undefined) ?? (target ? "hover" : "default"));
    };
    const move = (e: PointerEvent) => {
      last = { x: e.clientX, y: e.clientY };
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      update(e.clientX, e.clientY);
    };
    // Al hacer scroll el elemento bajo el cursor cambia aunque el ratón no se mueva.
    const scroll = () => last && update(last.x, last.y);
    const leave = () => setState("hidden");

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled]);

  if (!enabled) return null;

  const ringSize = { default: 36, hover: 72, view: 104, drag: 88, hidden: 0 }[state];
  const label = state === "view" ? "View" : state === "drag" ? "Drag" : "";

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <div
        ref={ring}
        className="absolute left-0 top-0"
        style={{ willChange: "transform" }}
      >
        <div
          className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-[width,height,background-color,border-color,opacity] duration-500 ease-out-expo ${
            state === "view" || state === "drag"
              ? "border border-transparent bg-accent"
              : state === "hover"
                ? "border border-transparent bg-white mix-blend-difference"
                : "border border-white/60 mix-blend-difference"
          }`}
          style={{ width: ringSize, height: ringSize, opacity: state === "hidden" ? 0 : 1 }}
        >
          <span
            className={`label text-accent-ink transition-opacity duration-300 ${
              label ? "opacity-100" : "opacity-0"
            }`}
          >
            {label}
          </span>
        </div>
      </div>
      <div ref={dot} className="absolute left-0 top-0" style={{ willChange: "transform" }}>
        <div
          className={`h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference transition-opacity duration-300 ${
            state === "default" ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
}

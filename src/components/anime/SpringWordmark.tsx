"use client";

import {
  animate,
  createScope,
  createSpring,
  onScroll,
  splitText,
  stagger,
  type Scope,
} from "animejs";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

// Palabra gigante: las letras entran escalonadas y saltan con muelle al pasar el cursor.
export function SpringWordmark({ text, className = "" }: { text: string; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    const el = root.current;
    const cleanups: Array<() => void> = [];

    const scope: Scope = createScope({ root: el }).add(() => {
      const { chars } = splitText(el, { chars: { wrap: "clip" } });

      animate(chars, {
        y: ["100%", "0%"],
        duration: 1100,
        ease: "outExpo",
        delay: stagger(70),
        autoplay: onScroll({ target: el, enter: "bottom-=10% top" }),
        // La máscara solo sirve para la entrada; después recortaría los saltos.
        onComplete: () => {
          chars.forEach((char: HTMLElement) => {
            if (char.parentElement) char.parentElement.style.overflow = "visible";
          });
        },
      });

      const bounce = createSpring({ stiffness: 260, damping: 9 });
      chars.forEach((char: HTMLElement, i: number) => {
        const jump = () => {
          animate(char, {
            y: [{ to: "-22%", duration: 220, ease: "outQuad" }, { to: "0%", ease: bounce }],
            rotate: [{ to: i % 2 ? 6 : -6, duration: 220 }, { to: 0, ease: bounce }],
            composition: "replace",
          });
        };
        char.addEventListener("pointerenter", jump);
        cleanups.push(() => char.removeEventListener("pointerenter", jump));
      });
    });

    return () => {
      cleanups.forEach((fn) => fn());
      scope.revert();
    };
  }, [text]);

  return (
    <div ref={root} aria-hidden className={className}>
      {text}
    </div>
  );
}

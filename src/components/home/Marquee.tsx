"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { marquee } from "@/data/site";
import { prefersReducedMotion } from "@/lib/motion";

// Banda de texto infinita que acelera e invierte su dirección con el scroll.
export function Marquee({ items = marquee, className = "" }: { items?: readonly string[]; className?: string }) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || prefersReducedMotion()) return;

    el.style.animation = "none";
    let x = 0;
    let direction = -1;
    let boost = 0;

    const trigger = ScrollTrigger.create({
      onUpdate: (self) => {
        direction = self.direction === 1 ? -1 : 1;
        boost = Math.min(Math.abs(self.getVelocity()) / 300, 12);
      },
    });

    const tick = () => {
      const half = el.scrollWidth / 2;
      x += direction * (0.6 + boost);
      boost *= 0.92;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      el.style.transform = `translate3d(${x}px,0,0)`;
    };
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      trigger.kill();
    };
  }, []);

  const row = [...items, ...items];

  return (
    <div className={`relative overflow-hidden border-y border-line py-6 ${className}`} aria-label={items.join(", ")}>
      <div ref={track} className="marquee-track" aria-hidden>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0">
            {row.map((item, i) => (
              <span key={`${copy}-${i}`} className="display flex items-center whitespace-nowrap text-[clamp(2.5rem,7vw,6.5rem)]">
                <span className={i % 2 ? "outline-text" : ""}>{item}</span>
                <span className="mx-[0.4em] text-[0.5em] text-accent">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

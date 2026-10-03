"use client";

import {
  animate,
  createDraggable,
  createScope,
  createSpring,
  type Draggable,
  type Scope,
} from "animejs";
import { useEffect, useRef } from "react";

const stickers = [
  { label: "✦ Diseño", className: "bg-accent text-accent-ink", pos: "left-[6%] top-[14%]", rotate: -8 },
  { label: "</> Código", className: "bg-fg text-bg font-mono", pos: "left-[30%] top-[52%]", rotate: 5 },
  { label: "↗ Conversión", className: "border border-fg text-fg", pos: "left-[58%] top-[18%]", rotate: -4 },
  { label: "IA", className: "bg-[#8d73f0] text-white", pos: "left-[78%] top-[58%]", rotate: 10 },
  { label: "Responsive", className: "bg-[#ff4b23] text-[#111]", pos: "left-[10%] top-[66%]", rotate: 3 },
  { label: "Welva ●", className: "bg-surface text-fg", pos: "left-[46%] top-[6%]", rotate: -12 },
];

// Pegatinas que se pueden lanzar dentro de su zona y rebotan con muelle.
export function Stickers() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const container = root.current;
    let z = 10;

    const draggables: Draggable[] = [];
    const scope: Scope = createScope({ root: container }).add(() => {
      container.querySelectorAll<HTMLElement>("[data-sticker]").forEach((el) => {
        const draggable = createDraggable(el, {
          container,
          // Margen para que la rotación no haga sobresalir las esquinas.
          containerPadding: 14,
          containerFriction: 0.6,
          releaseContainerFriction: 0.6,
          releaseEase: createSpring({ stiffness: 120, damping: 12 }),
          velocityMultiplier: 1.4,
          cursor: false,
          onGrab: () => {
            // El envoltorio es el elemento posicionado que compite en z-index.
            if (el.parentElement) el.parentElement.style.zIndex = String(++z);
            animate(el, { scale: 1.12, duration: 300, ease: "outBack" });
          },
          onRelease: () => {
            animate(el, { scale: 1, duration: 600, ease: createSpring({ stiffness: 200, damping: 10 }) });
          },
        });
        draggables.push(draggable);
      });
    });

    // Las pegatinas cambian de ancho al cargar la fuente: recalcula los límites.
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) draggables.forEach((d) => d.refresh());
    });

    return () => {
      cancelled = true;
      scope.revert();
    };
  }, []);

  return (
    <div className="mt-24" data-reveal="">
      <div className="label mb-4 flex justify-between text-muted">
        <span>(Playground)</span>
        <span>Arrástralos · Lánzalos</span>
      </div>
      <div
        ref={root}
        className="relative h-[24rem] overflow-hidden rounded-sm border border-dashed border-line sm:h-[28rem]"
      >
        <span className="display pointer-events-none absolute inset-0 flex items-center justify-center text-[clamp(3rem,12vw,10rem)] text-fg/[0.04]">
          Play
        </span>
        {stickers.map((s) => (
          <div key={s.label} className={`absolute ${s.pos}`}>
            {/* La rotación va en un hijo: si la llevara el elemento arrastrable,
                también giraría su traslación y se saldría de los límites. */}
            <div data-sticker="" data-cursor="drag" className="touch-none select-none">
              <div
                style={{ rotate: `${s.rotate}deg` }}
                className={`whitespace-nowrap rounded-full px-6 py-4 text-[clamp(1rem,2.2vw,1.6rem)] font-semibold shadow-[0_10px_30px_rgba(0,0,0,0.25)] ${s.className}`}
              >
                {s.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

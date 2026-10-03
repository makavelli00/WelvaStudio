"use client";

import { useSyncExternalStore } from "react";
import { MOTION_STORAGE_KEY } from "@/lib/motion";

const subscribe = () => () => {};
const isOff = () => document.documentElement.classList.contains("reduce-motion");

// Interruptor para pausar todas las animaciones automáticas (WCAG 2.2.2).
// La etiqueta es fija; el estado lo comunica aria-pressed y el interruptor visual.
export function MotionToggle({ className = "" }: { className?: string }) {
  const paused = useSyncExternalStore(subscribe, isOff, () => false);

  const toggle = () => {
    try {
      if (paused) localStorage.removeItem(MOTION_STORAGE_KEY);
      else localStorage.setItem(MOTION_STORAGE_KEY, "off");
    } catch {
      // Sin almacenamiento disponible: el cambio dura hasta recargar.
    }
    document.documentElement.classList.toggle("reduce-motion", !paused);
    // Las animaciones se configuran al cargar, así que recargar es lo más fiable.
    window.location.reload();
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={paused}
      className={`inline-flex min-h-6 items-center gap-2 uppercase hover:text-fg ${className}`}
    >
      <span
        aria-hidden
        className={`flex h-4 w-7 items-center rounded-full border border-current p-0.5 ${
          paused ? "justify-end" : "justify-start"
        }`}
      >
        <span className={`h-2.5 w-2.5 rounded-full ${paused ? "bg-fg" : "bg-muted"}`} />
      </span>
      Pausar animaciones
    </button>
  );
}

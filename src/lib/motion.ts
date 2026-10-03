import type Lenis from "lenis";

let lenis: Lenis | null = null;

export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};

export const getLenis = () => lenis;

// Reduce el movimiento si lo pide el sistema o si el usuario lo ha desactivado
// con el interruptor de la web (clase puesta antes de pintar en layout.tsx).
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    document.documentElement.classList.contains("reduce-motion"));

export const MOTION_STORAGE_KEY = "welva-motion";
export const INTRO_SEEN_KEY = "welva-intro-seen";

// La animación de entrada del hero espera a que termine el preloader.
export const INTRO_EVENT = "welva:intro";

export const markIntroDone = () => {
  window.__welvaIntroDone = true;
  document.documentElement.classList.add("intro-done");
  window.dispatchEvent(new Event(INTRO_EVENT));
};

export const onIntroDone = (callback: () => void) => {
  if (window.__welvaIntroDone) {
    callback();
    return () => {};
  }
  window.addEventListener(INTRO_EVENT, callback, { once: true });
  return () => window.removeEventListener(INTRO_EVENT, callback);
};

declare global {
  interface Window {
    __welvaIntroDone?: boolean;
  }
}

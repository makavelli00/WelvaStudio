"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getLenis, markIntroDone, prefersReducedMotion, setLenis } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

// Scroll suave global.
function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ duration: 1.15, anchors: { offset: 0 } });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);
}

// Animaciones declarativas mediante atributos data-* en el HTML.
function useScrollAnimations(pathname: string) {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      // Cambio de tema claro/oscuro entre secciones.
      gsap.utils.toArray<HTMLElement>("[data-theme-section]").forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive) root.dataset.theme = section.dataset.themeSection;
          },
        });
      });

      if (reduced) return;

      gsap.utils
        .toArray<HTMLElement>("[data-split]:not([data-intro])")
        .forEach((el) => {
          gsap.fromTo(
            el.querySelectorAll(".split-word"),
            { yPercent: 110, y: 0 },
            {
              yPercent: 0,
              duration: 1.2,
              ease: "expo.out",
              stagger: 0.06,
              scrollTrigger: { trigger: el, start: "top 88%" },
            },
          );
        });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "expo.out",
            delay: Number(el.dataset.delay ?? 0),
            scrollTrigger: { trigger: el, start: "top 92%" },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.4,
            ease: "expo.inOut",
            scrollTrigger: { trigger: el, start: "top 90%" },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = Number(el.dataset.parallax || 0.15);
        gsap.fromTo(
          el,
          { yPercent: -speed * 100 },
          {
            yPercent: speed * 100,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-scale-in]").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.86 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "top 30%", scrub: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const pad = el.textContent?.length ?? 2;
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => {
            el.textContent = String(Math.round(counter.value)).padStart(pad, "0");
          },
        });
      });
    });

    // Recalcula posiciones cuando cargan fuentes e imágenes.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
      delete root.dataset.theme;
    };
  }, [pathname]);
}

export function MotionProvider() {
  const pathname = usePathname();
  useSmoothScroll();
  useScrollAnimations(pathname);

  useEffect(() => {
    // El preloader solo existe en la portada; en el resto la intro arranca ya.
    if (pathname !== "/") markIntroDone();
    if (!window.location.hash) getLenis()?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}

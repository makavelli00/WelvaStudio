"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { SplitText } from "@/components/ui/SplitText";
import { onIntroDone, prefersReducedMotion } from "@/lib/motion";
import { HeroSphere } from "./HeroSphere";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !root.current) return;
    const el = root.current;

    const ctx = gsap.context(() => {
      // Parallax de salida: el titular se aleja al hacer scroll.
      gsap.to(".hero-title", {
        yPercent: -18,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-sphere", {
        yPercent: 25,
        scale: 0.85,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    }, el);

    const stop = onIntroDone(() => {
      ctx.add(() => {
        gsap
          .timeline()
          .fromTo(
            ".hero-title .split-word",
            { yPercent: 110, y: 0 },
            { yPercent: 0, duration: 1.4, ease: "expo.out", stagger: 0.07 },
            0,
          )
          .fromTo(
            ".hero-sphere",
            { opacity: 0, scale: 0.6 },
            { opacity: 1, scale: 1, duration: 2.2, ease: "expo.out" },
            0.1,
          )
          .fromTo(
            ".hero-reveal",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1.2, ease: "expo.out", stagger: 0.1 },
            0.6,
          );
      });
    });

    return () => {
      stop();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="inicio"
      ref={root}
      data-theme-section="dark"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-[clamp(1rem,3vw,2.5rem)] pb-10 pt-32"
    >
      {/* Brillo de acento detrás de la esfera */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[5%] h-[70vmin] w-[70vmin] rounded-full bg-accent/10 blur-[120px]"
      />
      <HeroSphere
        className="hero-sphere pointer-events-none absolute right-[-25%] top-[8%] h-[75vmin] w-[75vmin] sm:right-[-6%] sm:top-[10%] sm:h-[80vmin] sm:w-[80vmin] lg:right-[4%]"
      />

      <div className="relative">
        <p className="hero-reveal label mb-6 flex items-center gap-3 text-muted" data-intro-fade="">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-accent" />
          Estudio de diseño y desarrollo web
        </p>

        <SplitText
          as="h1"
          intro
          className="hero-title display text-[clamp(2.6rem,11.2vw,12.5rem)]"
          lines={[
            "Webs que",
            "hacen que",
            <>
              te recuerden<span className="text-accent">.</span>
            </>,
          ]}
        />

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-[1fr_auto] md:items-end">
          <p className="hero-reveal max-w-md text-lg leading-snug text-fg/80 sm:text-xl" data-intro-fade="">
            Diseñamos experiencias digitales modernas para negocios que quieren destacar.
          </p>
          <div className="hero-reveal flex flex-wrap gap-3" data-intro-fade="">
            <Button href="/#proyectos">Ver proyectos</Button>
            <Button href="/#contacto" variant="ghost" arrow={false}>
              Cuéntanos tu idea
            </Button>
          </div>
        </div>

        <div
          className="hero-reveal mt-14 flex items-center justify-between border-t border-line pt-5"
          data-intro-fade=""
        >
          <span className="label text-muted">Scroll</span>
          <span className="relative block h-10 w-px overflow-hidden bg-line">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_1.8s_ease-in-out_infinite] bg-accent" />
          </span>
          <span className="label text-muted">España · 2026</span>
        </div>
      </div>
    </section>
  );
}

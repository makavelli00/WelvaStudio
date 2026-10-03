"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, site } from "@/data/site";
import { getLenis } from "@/lib/motion";
import { Button, RollText } from "@/components/ui/Button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 400 && y > last);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
    // Con el menú abierto, el teclado no debe llegar al contenido de detrás.
    for (const el of document.querySelectorAll<HTMLElement>("main, footer")) el.inert = open;

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,backdrop-filter] duration-700 ease-out-expo focus-within:translate-y-0 ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${scrolled && !open ? "bg-bg/70 backdrop-blur-xl" : ""}`}
      >
        <div
          className={`mx-auto flex items-center justify-between px-[clamp(1rem,3vw,2.5rem)] transition-[padding] duration-700 ease-out-expo ${
            scrolled ? "py-3" : "py-6"
          }`}
        >
          <Link
            href="/#inicio"
            className="header-fade relative z-10 py-2 text-sm font-bold tracking-tight"
            data-intro-fade=""
            onClick={() => setOpen(false)}
          >
            WELVA<span className="text-accent">●</span>STUDIO
          </Link>

          <nav aria-label="Principal" className="header-fade hidden lg:block" data-intro-fade="">
            <ul className="flex gap-8 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-roll inline-block py-1.5 text-fg/80 hover:text-fg">
                    <RollText>{item.label}</RollText>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-fade flex items-center gap-3" data-intro-fade="">
            <div className="hidden sm:block">
              <Button href="/#contacto" className="!px-5 !py-3 text-sm">
                Hablemos
              </Button>
            </div>
            <button
              type="button"
              className="relative z-10 flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-line lg:hidden"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span
                className={`h-px w-5 bg-current transition-transform duration-500 ease-out-expo ${
                  open ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-5 bg-current transition-transform duration-500 ease-out-expo ${
                  open ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-bg px-[clamp(1rem,3vw,2.5rem)] pb-8 pt-28 transition-[clip-path] duration-700 ease-out-expo lg:hidden ${
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <nav aria-label="Móvil">
          <ul>
            {nav.map((item, i) => (
              <li key={item.href} className="overflow-hidden border-b border-line">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`display flex items-baseline justify-between py-4 text-[clamp(2.4rem,11vw,4.5rem)] transition-transform duration-700 ease-out-expo ${
                    open ? "translate-y-0" : "translate-y-full"
                  }`}
                  style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
                >
                  {item.label}
                  <span className="label text-muted">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col gap-6">
          <Button href={`mailto:${site.email}`} className="w-full justify-between">
            Hablemos
          </Button>
          <div className="label flex justify-between text-muted">
            <a href={site.socials.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={site.socials.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={`mailto:${site.email}`}>Email</a>
          </div>
        </div>
      </div>
    </>
  );
}

import Link from "next/link";
import { site } from "@/data/site";
import { RollText } from "@/components/ui/Button";

const links = [
  { label: "Instagram", href: site.socials.instagram, external: true },
  { label: "LinkedIn", href: site.socials.linkedin, external: true },
  { label: "Email", href: `mailto:${site.email}`, external: true },
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Servicios", href: "/#servicios" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line px-[clamp(1rem,3vw,2.5rem)] pt-16">
      <div className="grid gap-12 md:grid-cols-[1fr_auto]">
        <div>
          <p className="text-sm font-bold">
            WELVA<span className="text-accent">●</span>STUDIO
          </p>
          <p className="mt-3 max-w-xs text-fg/60">{site.tagline}</p>
        </div>
        <ul className="grid grid-cols-2 gap-x-12 gap-y-3 sm:grid-cols-3">
          {links.map((link) => (
            <li key={link.label}>
              {link.external ? (
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="link-roll inline-flex items-center gap-2"
                >
                  <RollText>{link.label}</RollText>
                  <span className="arrow text-muted">↗</span>
                </a>
              ) : (
                <Link href={link.href} className="link-roll inline-flex">
                  <RollText>{link.label}</RollText>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div
        aria-hidden
        className="display mt-16 select-none whitespace-nowrap text-center text-[21vw] leading-[0.75] text-fg/[0.06]"
        data-reveal=""
      >
        Welva
      </div>

      <div className="label flex flex-wrap justify-between gap-4 border-t border-line py-6 text-muted">
        <span>© 2026 Welva Studio</span>
        <span>Diseñado y desarrollado en casa</span>
      </div>
    </footer>
  );
}

import { services } from "@/data/site";
import { SplitText } from "@/components/ui/SplitText";

// Cada servicio tiene su propia animación al pasar el cursor.
function ServiceFx({ fx }: { fx: (typeof services)[number]["fx"] }) {
  switch (fx) {
    case "grid":
      return (
        <div className="fx fx-grid">
          {Array.from({ length: 9 }, (_, i) => (
            <i key={i} style={{ "--i": i } as React.CSSProperties} />
          ))}
        </div>
      );
    case "code":
      return (
        <div className="fx fx-code">
          <b>&lt;</b>
          <em>/</em>
          <b>&gt;</b>
        </div>
      );
    case "arrow":
      return (
        <div className="fx fx-arrow">
          <span>→</span>
        </div>
      );
    case "bars":
      return (
        <div className="fx fx-bars">
          {[30, 55, 40, 75, 50].map((h, i) => (
            <i key={i} style={{ "--h": `${h}%`, "--i": i } as React.CSSProperties} />
          ))}
        </div>
      );
    case "spark":
      return (
        <div className="fx fx-spark">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0z" />
          </svg>
        </div>
      );
  }
}

export function Services() {
  return (
    <section
      id="servicios"
      data-theme-section="light"
      className="relative px-[clamp(1rem,3vw,2.5rem)] py-28 sm:py-40"
    >
      <p className="label mb-8 text-muted" data-reveal="">
        (02) — Qué hacemos
      </p>
      <SplitText
        className="display text-[clamp(3rem,12.5vw,13rem)]"
        lines={[
          "No hacemos",
          <span key="w" className="outline-text">webs.</span>,
          "Creamos",
          "presencia.",
        ]}
      />

      <div className="mt-24 grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
        <p className="max-w-sm text-lg leading-snug text-fg/75 md:sticky md:top-32 md:self-start" data-reveal="">
          Una web no es un folleto online. Es el primer sitio donde un cliente decide si confía en ti.
          Por eso cuidamos cada parte del proceso.
        </p>

        <ul className="border-t border-line">
          {services.map((service, i) => (
            <li key={service.title} data-reveal="" className="border-b border-line">
              <div className="group relative isolate flex items-center gap-6 overflow-hidden px-3 py-8 sm:px-6 sm:py-10" data-cursor="hover">
                {/* Relleno que sube desde abajo */}
                <span className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-fg transition-transform duration-700 ease-out-expo group-hover:scale-y-100" />
                <span className="label w-8 shrink-0 text-muted transition-colors duration-500 group-hover:text-bg/60">
                  0{i + 1}
                </span>
                <div className="flex-1 transition-[transform,color] duration-700 ease-out-expo group-hover:translate-x-3 group-hover:text-bg">
                  <h3 className="text-[clamp(1.8rem,4vw,3.5rem)] font-semibold leading-none tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-lg text-fg/70 transition-colors duration-500 group-hover:text-bg/70">
                    {service.text}
                  </p>
                </div>
                <div className="hidden text-fg transition-colors duration-500 group-hover:text-accent sm:block">
                  <ServiceFx fx={service.fx} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

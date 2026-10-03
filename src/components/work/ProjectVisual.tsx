import type { ReactNode } from "react";
import type { ProjectVisualVariant } from "@/data/site";

// Portadas de proyecto generadas en código. Usan unidades cqw para escalar
// con su contenedor. Sustitúyelas por capturas reales con <Image> cuando existan.

function Browser({
  children,
  className = "",
  bar = "bg-white/90",
  dots = "bg-black/20",
}: {
  children: ReactNode;
  className?: string;
  bar?: string;
  dots?: string;
}) {
  return (
    <div className={`absolute overflow-hidden rounded-[1.2cqw] shadow-[0_3cqw_6cqw_rgba(0,0,0,0.35)] ${className}`}>
      <div className={`flex h-[3.2cqw] items-center gap-[0.6cqw] px-[1.2cqw] ${bar}`}>
        {[0, 1, 2].map((i) => (
          <span key={i} className={`h-[0.8cqw] w-[0.8cqw] rounded-full ${dots}`} />
        ))}
      </div>
      <div className="relative h-[calc(100%-3.2cqw)]">{children}</div>
    </div>
  );
}

function Phone({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`absolute overflow-hidden rounded-[3cqw] border-[0.6cqw] border-black shadow-[0_3cqw_6cqw_rgba(0,0,0,0.4)] ${className}`}
    >
      {children}
    </div>
  );
}

const Bar = ({ className }: { className: string }) => <div className={`rounded-full ${className}`} />;

function WhyNot() {
  return (
    <div className="absolute inset-0 bg-[#ff4b23]">
      <div className="absolute left-[5%] top-[6%] text-[20cqw] font-black leading-[0.8] tracking-[-0.06em] text-[#111]">
        WHY
        <br />
        NOT?
      </div>
      <Browser className="right-[5%] top-[22%] h-[68%] w-[52%] rotate-[4deg] bg-[#111]">
        <div className="p-[3cqw] text-[#ff4b23]">
          <div className="text-[5cqw] font-black leading-none tracking-tight">DO IT.</div>
          <Bar className="mt-[2cqw] h-[1cqw] w-[60%] bg-white/30" />
          <Bar className="mt-[1cqw] h-[1cqw] w-[45%] bg-white/30" />
          <div className="mt-[3cqw] inline-block rounded-full bg-[#ff4b23] px-[2cqw] py-[0.8cqw] text-[1.6cqw] font-bold text-[#111]">
            SHOP NOW →
          </div>
          <div className="mt-[3cqw] grid grid-cols-3 gap-[1cqw]">
            {[0, 1, 2].map((i) => (
              <div key={i} className="aspect-[3/4] rounded-[0.8cqw] bg-white/10" />
            ))}
          </div>
        </div>
      </Browser>
      <div className="absolute bottom-[8%] left-[6%] flex h-[13cqw] w-[13cqw] items-center justify-center rounded-full bg-[#111] text-[2cqw] font-bold text-[#ff4b23] spin-slow">
        ✦ NEW DROP ✦
      </div>
    </div>
  );
}

function NorthCoast() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#0e3b43] via-[#1c6b70] to-[#e7c9a0]">
      <div className="absolute left-1/2 top-[12%] h-[34cqw] w-[34cqw] -translate-x-1/2 rounded-full bg-[#f5d9a8] opacity-90" />
      <svg className="absolute inset-x-0 bottom-0 h-[45%] w-full" viewBox="0 0 400 100" preserveAspectRatio="none">
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M0 ${30 + i * 18} Q 50 ${20 + i * 18} 100 ${30 + i * 18} T 200 ${30 + i * 18} T 300 ${30 + i * 18} T 400 ${30 + i * 18} V100 H0Z`}
            fill={["#2a7f86", "#226a72", "#1a565d", "#123f45"][i]}
          />
        ))}
      </svg>
      <Browser className="left-[8%] top-[18%] h-[66%] w-[48%] bg-[#f6efe4]" bar="bg-[#efe6d6]">
        <div className="p-[3cqw] text-[#123f45]">
          <div className="text-[1.4cqw] tracking-[0.3em]">HOTEL · SPA</div>
          <div className="mt-[1.5cqw] font-serif text-[5cqw] italic leading-none">North Coast</div>
          <div className="mt-[2.5cqw] grid grid-cols-3 gap-[1cqw] rounded-[0.8cqw] border border-[#123f45]/20 p-[1.2cqw] text-[1.3cqw]">
            <span>Llegada</span>
            <span>Salida</span>
            <span className="rounded-full bg-[#123f45] text-center text-[#f6efe4]">Reservar</span>
          </div>
          <div className="mt-[2cqw] h-[14cqw] rounded-[0.8cqw] bg-gradient-to-br from-[#1c6b70] to-[#e7c9a0]" />
        </div>
      </Browser>
    </div>
  );
}

function Noir() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#262624] to-[#121211]">
      <div className="absolute inset-x-0 top-[6%] text-center font-serif text-[16cqw] italic leading-none text-white/10">
        Noir
      </div>
      {[
        "left-[10%] top-[22%] rotate-[-6deg]",
        "left-[38%] top-[14%] z-10",
        "left-[66%] top-[22%] rotate-[6deg]",
      ].map((pos, i) => (
        <Phone key={i} className={`${pos} h-[72%] w-[22%] bg-[#f2f0eb]`}>
          <div
            className={`h-[62%] ${
              ["bg-gradient-to-b from-[#bdb7ad] to-[#5d5850]", "bg-gradient-to-b from-[#2b2b2b] to-[#000]", "bg-gradient-to-b from-[#d9d4cc] to-[#8b857b]"][i]
            }`}
          />
          <div className="p-[1.4cqw]">
            <div className="font-serif text-[2cqw] italic text-black">{["Coat 01", "Noir SS26", "Shirt 07"][i]}</div>
            <Bar className="mt-[0.8cqw] h-[0.7cqw] w-[60%] bg-black/20" />
            <div className="mt-[1.2cqw] rounded-full bg-black py-[0.6cqw] text-center text-[1.1cqw] text-white">
              Añadir
            </div>
          </div>
        </Phone>
      ))}
    </div>
  );
}

function Forma() {
  return (
    <div className="absolute inset-0 bg-[#d8d4cb]">
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(#0002_1px,transparent_1px),linear-gradient(90deg,#0002_1px,transparent_1px)] [background-size:5cqw_5cqw]" />
      <div className="absolute bottom-0 left-[8%] h-[70%] w-[24%] bg-[#1d1d1b]" />
      <div className="absolute bottom-0 left-[32%] h-[48%] w-[18%] bg-[#8d8a83]" />
      <div className="absolute bottom-0 left-[50%] h-[85%] w-[16%] rounded-t-full bg-[#b3aea4]" />
      <div className="absolute bottom-0 left-[66%] h-[38%] w-[26%] bg-[#ece9e2]" />
      <div className="absolute left-[8%] top-[8%] text-[1.6cqw] tracking-[0.4em] text-[#1d1d1b]">
        FORMA — ARQUITECTURA
      </div>
      <div className="absolute right-[6%] top-[8%] text-right text-[9cqw] font-light leading-[0.85] tracking-tight text-[#1d1d1b]">
        Space
        <br />
        &amp; light
      </div>
      <div className="absolute bottom-[6%] right-[6%] text-[1.4cqw] text-[#1d1d1b]">N 40°25′ — W 3°42′</div>
    </div>
  );
}

function Lumen() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#cfc3f7] via-[#efd7ee] to-[#fbe6cf]">
      <div className="absolute left-[12%] top-[15%] h-[40cqw] w-[40cqw] rounded-full bg-[#8d73f0] opacity-50 blur-[6cqw] float" />
      <div className="absolute right-[10%] top-[30%] h-[22cqw] w-[22cqw] rounded-full bg-[#ffb38a] opacity-60 blur-[5cqw]" />
      <div className="absolute left-[7%] top-[12%] text-[11cqw] font-semibold leading-[0.9] tracking-tight text-[#2a2140]">
        Breathe.
        <br />
        <span className="text-[#2a2140]/40">Slow down.</span>
      </div>
      <Phone className="bottom-[-20%] right-[12%] h-[95%] w-[28%] bg-[#2a2140]">
        <div className="flex h-full flex-col items-center p-[2cqw] text-white">
          <div className="mt-[3cqw] text-[1.4cqw] tracking-[0.3em] opacity-70">LUMEN</div>
          <div className="mt-[4cqw] flex h-[16cqw] w-[16cqw] items-center justify-center rounded-full border border-white/30">
            <div className="h-[10cqw] w-[10cqw] rounded-full bg-gradient-to-br from-[#cfc3f7] to-[#ffb38a]" />
          </div>
          <div className="mt-[3cqw] text-[2.2cqw]">04:00</div>
        </div>
      </Phone>
    </div>
  );
}

function Alta() {
  return (
    <div className="absolute inset-0 bg-[#101210]">
      <div className="absolute left-[6%] top-[10%] text-[8cqw] font-bold leading-[0.9] tracking-tight text-white">
        Tu dinero,
        <br />
        <span className="text-[#c8ff3d]">a la vista.</span>
      </div>
      <Browser className="bottom-[-6%] right-[5%] h-[70%] w-[58%] bg-[#1a1d1a]" bar="bg-[#232723]" dots="bg-white/20">
        <div className="p-[2.5cqw]">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-[1.3cqw] text-white/50">Balance</div>
              <div className="text-[4cqw] font-bold text-white">24.380 €</div>
            </div>
            <div className="rounded-full bg-[#c8ff3d] px-[1.5cqw] py-[0.5cqw] text-[1.3cqw] font-bold text-black">
              +12,4%
            </div>
          </div>
          <svg viewBox="0 0 200 60" className="mt-[2cqw] w-full">
            <defs>
              <linearGradient id="alta-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#c8ff3d" stopOpacity="0.35" />
                <stop offset="1" stopColor="#c8ff3d" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 50 L20 44 L40 47 L60 36 L80 38 L100 26 L120 30 L140 18 L160 22 L180 8 L200 12 V60 H0Z" fill="url(#alta-fill)" />
            <path d="M0 50 L20 44 L40 47 L60 36 L80 38 L100 26 L120 30 L140 18 L160 22 L180 8 L200 12" fill="none" stroke="#c8ff3d" strokeWidth="1.5" />
          </svg>
        </div>
      </Browser>
      <div className="absolute bottom-[10%] left-[6%] w-[26%] rounded-[1.5cqw] bg-gradient-to-br from-[#c8ff3d] to-[#7ccf00] p-[2cqw] text-black shadow-2xl float">
        <div className="text-[1.3cqw] font-bold">ALTA</div>
        <div className="mt-[5cqw] font-mono text-[1.4cqw]">•••• 4821</div>
      </div>
    </div>
  );
}

const variants: Record<ProjectVisualVariant, () => ReactNode> = {
  whynot: WhyNot,
  northcoast: NorthCoast,
  noir: Noir,
  forma: Forma,
  lumen: Lumen,
  alta: Alta,
};

export function ProjectVisual({ variant, className = "" }: { variant: ProjectVisualVariant; className?: string }) {
  const Visual = variants[variant];
  return (
    <div className={`@container relative overflow-hidden ${className}`} aria-hidden>
      <div className="absolute inset-0 transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.06]">
        <Visual />
      </div>
    </div>
  );
}

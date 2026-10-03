import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter_Tight } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Cursor } from "@/components/motion/Cursor";
import { MotionProvider } from "@/components/motion/MotionProvider";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Welva Studio — Webs que hacen que te recuerden",
    template: "%s — Welva Studio",
  },
  description:
    "Estudio de diseño y desarrollo web. Diseñamos experiencias digitales modernas para negocios que quieren destacar.",
  openGraph: {
    title: "Welva Studio",
    description: "Webs que hacen que te recuerden.",
    locale: "es_ES",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${interTight.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Marca que hay JS antes de pintar, para ocultar lo que se va a animar. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "var d=document.documentElement;d.classList.add('js');try{if(localStorage.getItem('welva-motion')==='off')d.classList.add('reduce-motion');if(sessionStorage.getItem('welva-intro-seen'))d.classList.add('intro-seen')}catch(e){}",
          }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[200] rounded-full bg-accent px-4 py-2 text-accent-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Saltar al contenido
        </a>
        <MotionProvider />
        <div className="grid-lines" aria-hidden>
          <span />
          <span />
          <span />
          <span />
        </div>
        <Header />
        <main id="main" className="relative">
          {children}
        </main>
        <Footer />
        <Cursor />
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}

import { About } from "@/components/home/About";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { Process } from "@/components/home/Process";
import { Services } from "@/components/home/Services";
import { Testimonials } from "@/components/home/Testimonials";
import { Values } from "@/components/home/Values";
import { Work } from "@/components/home/Work";
import { Preloader } from "@/components/motion/Preloader";

export default function Home() {
  return (
    <>
      <Preloader />
      <Hero />
      <Marquee />
      <Work />
      <Services />
      <Values />
      <Process />
      <About />
      <Marquee items={["Let's talk", "Hablemos", "Let's build", "Construyamos"]} />
      <Testimonials />
      <FinalCta />
    </>
  );
}

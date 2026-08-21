import { tickers } from "@/lib/data/site";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { EngineeringDna } from "@/components/sections/EngineeringDna";
import { CareerLog } from "@/components/sections/CareerLog";
import { Work } from "@/components/sections/Work";
import { Impact } from "@/components/sections/Impact";
import { Contact } from "@/components/sections/Contact";
import { Marquee } from "@/components/motion/Marquee";

/*
 * Who I am, how I build, where I have been, what I shipped, what it added up
 * to, how to reach me.
 * Identity is established before the reader ever reaches the project list —
 * and no divider strips interrupt the hand-offs the sections set up for
 * each other.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <EngineeringDna />
      <CareerLog />
      <Work />

      <Marquee
        items={tickers.invitation}
        direction={1}
        baseVelocity={1.8}
        className="border-y border-line bg-void py-5"
        itemClassName="font-display text-title font-bold tracking-tight text-dim"
      />

      <Impact />
      <Contact />
    </>
  );
}

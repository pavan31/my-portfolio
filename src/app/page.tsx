import { tickers } from "@/lib/data/site";
import { Hero } from "@/components/sections/Hero";
import { Index } from "@/components/sections/Index";
import { Stack } from "@/components/sections/Stack";
import { Work } from "@/components/sections/Work";
import { Trajectory } from "@/components/sections/Trajectory";
import { Contact } from "@/components/sections/Contact";
import { Marquee } from "@/components/motion/Marquee";

export default function HomePage() {
  return (
    <>
      <Hero />

      <Marquee
        items={tickers.disciplines}
        className="border-y border-line bg-surface py-4"
        itemClassName="label text-muted"
      />

      <Index />
      <Stack />
      <Work />
      <Trajectory />

      <Marquee
        items={tickers.invitation}
        direction={1}
        baseVelocity={1.8}
        className="border-y border-line bg-void py-5"
        itemClassName="font-display text-title font-bold tracking-tight text-dim"
      />

      <Contact />
    </>
  );
}

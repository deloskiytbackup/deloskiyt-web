import { LiquidBackground } from "@/components/LiquidBackground";
import { Hero } from "@/components/Hero";
import { Portfolio } from "@/components/Portfolio";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-white/20">
      <LiquidBackground />
      <div className="relative z-10">
        <Hero />
        <Portfolio />
      </div>
    </main>
  );
}

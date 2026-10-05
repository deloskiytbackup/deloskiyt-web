import { Hero } from "@/components/Hero";
import { Portfolio } from "@/components/Portfolio";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white/20">
      <Hero />
      <Portfolio />
    </main>
  );
}

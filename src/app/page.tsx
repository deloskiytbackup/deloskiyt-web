import { Hero } from "@/components/Hero";
import { Portfolio } from "@/components/Portfolio";

export default function Home() {
  return (
    <main className="bg-black text-white">
      <Hero />
      <Portfolio />
    </main>
  );
}

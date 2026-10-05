import { SocialLinks } from "./SocialLinks";
import { ScrollDownArrow } from "./ScrollDownArrow";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">deloskiyt</h1>
        <SocialLinks />
      </div>
      <ScrollDownArrow targetId="portfolio" />
    </section>
  );
}

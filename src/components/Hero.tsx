import { SocialLinks } from "./SocialLinks";
import { ScrollDownArrow } from "./ScrollDownArrow";

export function Hero() {
  return (
    <section className="relative min-h-dvh flex flex-col items-center justify-center px-4 sm:px-6">
      <div className="flex flex-col items-center gap-6 sm:gap-8 -translate-y-4 sm:translate-y-0">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight select-none">
          deloskiyt
        </h1>
        <SocialLinks />
      </div>
      <ScrollDownArrow targetId="portfolio" />
    </section>
  );
}

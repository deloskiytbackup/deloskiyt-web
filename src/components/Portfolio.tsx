import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export function Portfolio() {
  return (
    <section
      id="portfolio"
      className="min-h-screen flex flex-col justify-center px-6 py-20 max-w-5xl mx-auto w-full"
    >
      <div className="flex flex-col gap-3 mb-12 text-center sm:text-left">
        <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">
          Projekty & Twórczość
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Moje Portfolio
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base max-w-xl">
          Rzeczy, nad którymi pracuję – od tworzenia treści po projekty i społeczność.
        </p>
      </div>

      {/* Siatka projektów */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

      {/* Powrót na górę & stopka */}
      <div className="mt-16 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
        <span>© {new Date().getFullYear()} deloskiyt</span>
        <a
          href="#"
          className="hover:text-zinc-300 transition-colors flex items-center gap-1.5"
        >
          <span>Wróć na górę</span>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </a>
      </div>
    </section>
  );
}

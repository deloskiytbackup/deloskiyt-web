import { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl liquid-glass liquid-glass-interactive overflow-hidden active:scale-[0.99] transition-all duration-300 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
    >
      {/* Subtelny odblask świetlny w rogu karty */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/[0.04] rounded-full blur-2xl group-hover:bg-white/[0.09] transition-colors pointer-events-none" />

      <div className="space-y-3 relative z-10">
        <div className="flex items-center justify-between">
          <span className="text-[11px] sm:text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            {project.category}
          </span>
          <svg
            className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white group-hover:text-zinc-100 tracking-tight">
          {project.title}
        </h3>
        <p className="text-xs sm:text-sm text-zinc-300/80 leading-relaxed">
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-6 relative z-10">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[11px] sm:text-xs px-2.5 py-1 rounded-lg bg-white/[0.04] text-zinc-300 border border-white/[0.08] backdrop-blur-sm"
          >
            #{tag}
          </span>
        ))}
      </div>
    </a>
  );
}

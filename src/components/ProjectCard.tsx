import { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col justify-between p-6 rounded-2xl bg-zinc-950 border border-zinc-800/80 hover:border-zinc-600 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
            {project.category}
          </span>
          <svg
            className="w-4 h-4 text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white group-hover:text-zinc-100">
          {project.title}
        </h3>
        <p className="text-sm text-zinc-400 leading-relaxed">
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-6">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-md bg-zinc-900 text-zinc-400 border border-zinc-800"
          >
            #{tag}
          </span>
        ))}
      </div>
    </a>
  );
}

"use client";

import { motion } from "framer-motion";
import { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-zinc-600/90 active:scale-[0.99] transition-colors duration-300 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-emerald-500/5 backdrop-blur-sm cursor-pointer"
    >
      {/* Subtle shine highlight on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="space-y-3 relative z-10">
        <div className="flex items-center justify-between">
          <span className="text-[11px] sm:text-xs font-semibold text-zinc-500 uppercase tracking-wider group-hover:text-zinc-400 transition-colors">
            {project.category}
          </span>
          <svg
            className="w-4 h-4 text-zinc-600 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-zinc-100 transition-colors">
          {project.title}
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-6 relative z-10">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[11px] sm:text-xs px-2.5 py-1 rounded-md bg-zinc-900/90 text-zinc-400 border border-zinc-800 group-hover:border-zinc-700/80 transition-colors"
          >
            #{tag}
          </span>
        ))}
      </div>
    </motion.a>
  );
}

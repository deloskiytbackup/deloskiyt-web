"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export function Portfolio() {
  return (
    <section
      id="portfolio"
      className="min-h-dvh flex flex-col justify-center px-4 sm:px-6 py-16 sm:py-24 max-w-5xl mx-auto w-full"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-2.5 mb-8 sm:mb-12 text-center sm:text-left"
      >
        <p className="text-[11px] sm:text-xs uppercase tracking-widest text-zinc-500 font-semibold">
          Projekty & Twórczość
        </p>
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
          Moje Portfolio
        </h2>
        <p className="text-zinc-400 text-xs sm:text-base max-w-xl mx-auto sm:mx-0">
          Rzeczy, nad którymi pracuję – od tworzenia treści po projekty i społeczność.
        </p>
      </motion.div>

      {/* Siatka projektów */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>

      {/* Powrót na górę & stopka z linkami */}
      <div className="mt-14 sm:mt-20 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-5 text-xs text-zinc-500 pb-10">
        <div className="flex items-center gap-6">
          <Link
            href="/regulamin"
            className="hover:text-white transition-colors underline-offset-4 hover:underline"
          >
            Regulamin
          </Link>
          <span className="text-zinc-800">•</span>
          <Link
            href="/panel-klienta"
            className="hover:text-white transition-colors underline-offset-4 hover:underline"
          >
            Panel Klienta
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <span>© {new Date().getFullYear()} deloskiyt</span>
          <a
            href="#"
            className="hover:text-zinc-300 active:text-white transition-colors flex items-center gap-1.5 p-1 touch-manipulation"
          >
            <span>Wróć na górę</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { projects, getProjectById } from "@/data/projects";
import { getPortfolioEnabled } from "@/lib/settings";
import { getSessionUser } from "@/lib/auth";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return {
      title: "Projekt nie znaleziony | Portfolio deloskiyt",
    };
  }

  return {
    title: `${project.title} - Portfolio | deloskiyt`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const isPortfolioEnabled = await getPortfolioEnabled();
  const user = await getSessionUser();
  const isAdmin = user && (user.role === "admin" || user.email === "deloskiyt@gmail.com");

  if (!isPortfolioEnabled && !isAdmin) {
    redirect("/");
  }

  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  // Pozostałe projekty do sekcji "Zobacz również"
  const otherProjects = projects.filter((p) => p.id !== project.id);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white/20 pb-20">
      {!isPortfolioEnabled && isAdmin && (
        <div className="bg-amber-500/15 border-b border-amber-500/30 text-amber-300 text-xs py-2 px-4 text-center font-medium sticky top-0 z-50 backdrop-blur-md">
          ⚠️ <strong>Tryb administratora:</strong> Portfolio jest obecnie WYŁĄCZONE dla odwiedzających.
        </div>
      )}
      {/* Pasek nawigacyjny */}
      <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-md border-b border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Wróć do Portfolio</span>
          </Link>

          <Link href="/" className="font-extrabold text-sm tracking-tight text-white hover:text-zinc-300 transition-colors">
            deloskiyt
          </Link>
        </div>
      </header>

      {/* Główna sekcja projektu */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16">
        {/* Nagłówek projektu */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] sm:text-xs font-semibold px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-xs text-zinc-500 font-mono">id: {project.id}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Statystyki / Specyfikacja */}
        {project.stats && project.stats.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 sm:mt-10">
            {project.stats.map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-850 flex flex-col gap-1"
              >
                <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                  {stat.label}
                </span>
                <span className="text-sm sm:text-base font-bold text-white">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Szczegółowy opis & Cechy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 sm:mt-14 pt-10 border-t border-zinc-900">
          <div className="md:col-span-2 space-y-8">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white tracking-tight">
                O projekcie
              </h2>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed whitespace-pre-line">
                {project.fullDescription}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-bold text-white tracking-tight">
                Kluczowe elementy & cechy
              </h2>
              <div className="grid grid-cols-1 gap-2.5">
                {project.highlights.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-950 border border-zinc-900"
                  >
                    <svg
                      className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs sm:text-sm text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Panel boczny z przyciskiem akcji & tagami */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-850 space-y-5">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Odnośnik do projektu
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Przejdź bezpośrednio do platformy lub repozytorium tego projektu.
              </p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-all shadow-md active:scale-95"
              >
                <span>{project.linkLabel}</span>
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-850 space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Technologie & Tagi
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-md bg-zinc-900 text-zinc-300 border border-zinc-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Zobacz także inne projekty w portfolio */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-zinc-900">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                Więcej
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Pozostałe projekty w portfolio
              </h2>
            </div>
            <Link
              href="/#portfolio"
              className="text-xs text-zinc-400 hover:text-white transition-colors"
            >
              Zobacz wszystkie
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherProjects.map((item) => (
              <Link
                key={item.id}
                href={`/portfolio/${item.id}`}
                className="group p-5 rounded-2xl bg-zinc-950 border border-zinc-850 hover:border-zinc-700 transition-all flex flex-col justify-between gap-4"
              >
                <div>
                  <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-zinc-200 mt-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs text-zinc-500 group-hover:text-white transition-colors font-medium">
                  <span>Przejdź do podstrony</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

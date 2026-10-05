export default function Home() {
  const links = [
    {
      name: "YouTube",
      url: "https://youtube.com/@deloskiyt", // Tutaj możesz wkleić swój link do YouTube
      description: "Oglądaj filmy i transmisje",
      accent: "hover:border-red-500/50 hover:bg-red-500/10 hover:shadow-[0_0_25px_rgba(239,68,68,0.25)] text-red-500",
      borderDefault: "border-white/10 hover:border-red-500/40",
      icon: (
        <svg className="w-6 h-6 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: "Spotify",
      url: "https://open.spotify.com", // Tutaj możesz wkleić swój link do Spotify
      description: "Posłuchaj playlist i utworów",
      accent: "hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] text-emerald-400",
      borderDefault: "border-white/10 hover:border-emerald-500/40",
      icon: (
        <svg className="w-6 h-6 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.308c-.218.356-.682.47-1.038.252-2.846-1.739-6.429-2.132-10.65-1.168-.405.093-.811-.16-.903-.564-.093-.404.16-.81.564-.903 4.622-1.055 8.583-.604 11.775 1.345.356.218.47.682.252 1.038zm1.47-3.266c-.274.444-.86.586-1.304.312-3.259-2.003-8.227-2.584-12.083-1.413-.497.151-1.026-.134-1.177-.631-.151-.497.134-1.026.631-1.177 4.41-1.339 9.894-.693 13.621 1.605.444.274.586.86.312 1.304zm.126-3.41c-3.908-2.321-10.352-2.535-14.084-1.402-.599.182-1.235-.16-1.417-.76-.182-.599.16-1.235.76-1.417 4.29-1.302 11.41-1.053 15.918 1.623.539.32.716 1.018.396 1.558-.32.539-1.018.718-1.573.398z" />
        </svg>
      ),
    },
    {
      name: "Discord",
      url: "https://discord.gg", // Tutaj możesz wkleić swoje zaproszenie na Discord
      description: "Dołącz do serwera społeczności",
      accent: "hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:shadow-[0_0_25px_rgba(99,102,241,0.25)] text-indigo-400",
      borderDefault: "border-white/10 hover:border-indigo-500/40",
      icon: (
        <svg className="w-6 h-6 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden select-none">
      {/* Efekt ambient glow w tle */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-purple-900/20 via-blue-900/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      <main className="relative z-10 w-full max-w-md flex flex-col items-center gap-8">
        {/* Sekcja profilu */}
        <header className="flex flex-col items-center text-center gap-3">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-900 border-2 border-white/10 flex items-center justify-center shadow-xl shadow-black/50 overflow-hidden group-hover:border-white/30 transition-all duration-300">
              <span className="text-3xl font-extrabold tracking-wider bg-gradient-to-br from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
                D
              </span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-black flex items-center justify-center" title="Online">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            </div>
          </div>

          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              deloskiyt
            </h1>
            <p className="text-sm text-zinc-400 font-medium">
              Oficjalne linki i społeczność
            </p>
          </div>
        </header>

        {/* Lista 3 przycisków */}
        <nav className="w-full flex flex-col gap-4" aria-label="Social links">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex items-center gap-4 w-full p-4 rounded-2xl bg-zinc-900/60 backdrop-blur-md border ${link.borderDefault} ${link.accent} transition-all duration-300 hover:-translate-y-1 active:translate-y-0`}
            >
              <div className="p-3 rounded-xl bg-black/50 border border-white/5">
                {link.icon}
              </div>

              <div className="flex flex-col flex-1 text-left">
                <span className="text-base font-semibold text-white tracking-wide group-hover:text-white">
                  {link.name}
                </span>
                <span className="text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors">
                  {link.description}
                </span>
              </div>

              <div className="text-zinc-500 group-hover:text-white transition-colors pr-1">
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </a>
          ))}
        </nav>

        {/* Stopka */}
        <footer className="pt-6 text-xs text-zinc-600 font-medium">
          © {new Date().getFullYear()} deloskiyt. Wszelkie prawa zastrzeżone.
        </footer>
      </main>
    </div>
  );
}

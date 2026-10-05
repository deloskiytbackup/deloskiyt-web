export default function Home() {
  const projects = [
    {
      title: "Kanał YouTube",
      category: "Wideo & Twórczość",
      description: "Tworzenie materiałów wideo, streamów oraz treści dla społeczności.",
      tags: ["YouTube", "Montaż", "Gaming"],
      link: "https://youtube.com/@deloskiyt",
    },
    {
      title: "Społeczność Discord",
      category: "Community & Eventy",
      description: "Prowadzenie własnego serwera Discord, moderacja oraz organizacja wydarzeń dla widzów.",
      tags: ["Discord", "Społeczność", "Boty"],
      link: "https://discord.gg",
    },
    {
      title: "Kolekcje Muzyczne",
      category: "Muzyka & Playlists",
      description: "Selekcja playlist i ulubionych brzmień dostępnych na profilu Spotify.",
      tags: ["Spotify", "Playlisty", "Audio"],
      link: "https://open.spotify.com",
    },
    {
      title: "Projekty Webowe",
      category: "Development",
      description: "Nowoczesne aplikacje internetowe i projekty cyfrowe tworzone w Next.js & Tailwind CSS.",
      tags: ["Next.js", "React", "Tailwind"],
      link: "https://github.com/deloskiytbackup/deloskiyt-web",
    },
  ];

  return (
    <div className="bg-black text-white">
      {/* SEKCJA GŁÓWNA (HERO) */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-6">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">deloskiyt</h1>

          {/* 3 ikony obok siebie */}
          <div className="flex items-center gap-7">
            {/* YouTube */}
            <a
              href="https://youtube.com/@deloskiyt"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-white hover:text-red-500 transition-colors"
            >
              <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>

            {/* Spotify */}
            <a
              href="https://open.spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spotify"
              className="text-white hover:text-[#1DB954] transition-colors"
            >
              <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.308c-.218.356-.682.47-1.038.252-2.846-1.739-6.429-2.132-10.65-1.168-.405.093-.811-.16-.903-.564-.093-.404.16-.81.564-.903 4.622-1.055 8.583-.604 11.775 1.345.356.218.47.682.252 1.038zm1.47-3.266c-.274.444-.86.586-1.304.312-3.259-2.003-8.227-2.584-12.083-1.413-.497.151-1.026-.134-1.177-.631-.151-.497.134-1.026.631-1.177 4.41-1.339 9.894-.693 13.621 1.605.444.274.586.86.312 1.304zm.126-3.41c-3.908-2.321-10.352-2.535-14.084-1.402-.599.182-1.235-.16-1.417-.76-.182-.599.16-1.235.76-1.417 4.29-1.302 11.41-1.053 15.918 1.623.539.32.716 1.018.396 1.558-.32.539-1.018.718-1.573.398z" />
              </svg>
            </a>

            {/* Discord */}
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
              className="text-white hover:text-[#5865F2] transition-colors"
            >
              <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Strzałka w dół */}
        <a
          href="#portfolio"
          aria-label="Przejdź do portfolio"
          className="absolute bottom-8 flex flex-col items-center gap-2 text-zinc-500 hover:text-white transition-colors group cursor-pointer"
        >
          <span className="text-xs uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300 transition-colors">
            Portfolio
          </span>
          <svg
            className="w-6 h-6 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </section>

      {/* SEKCJA PORTFOLIO */}
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
          {projects.map((item) => (
            <a
              key={item.title}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between p-6 rounded-2xl bg-zinc-950 border border-zinc-800/80 hover:border-zinc-600 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    {item.category}
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
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-6">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-md bg-zinc-900 text-zinc-400 border border-zinc-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </a>
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
    </div>
  );
}

export function MaintenancePage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="flex flex-col items-center gap-6 max-w-md">
        <span className="text-6xl sm:text-8xl font-black tracking-tighter text-zinc-800">
          deloskiyt
        </span>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Zmieniamy się na lepsze
          </h1>
          <p className="text-sm text-zinc-400">
            Pracujemy nad nowymi funkcjami i ulepszeniami. Wracamy już niebawem.
          </p>
        </div>
      </div>
    </main>
  );
}

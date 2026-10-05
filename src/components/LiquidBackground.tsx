export function LiquidBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Orb 1: Fiolet / Indigo */}
      <div className="absolute top-[15%] left-[20%] w-[380px] sm:w-[500px] h-[380px] sm:h-[500px] rounded-full bg-gradient-to-tr from-indigo-600/25 via-purple-600/20 to-pink-600/15 blur-[120px] animate-liquid-1" />

      {/* Orb 2: Błękit / Cyan */}
      <div className="absolute top-[50%] right-[15%] w-[320px] sm:w-[480px] h-[320px] sm:h-[480px] rounded-full bg-gradient-to-br from-cyan-600/20 via-blue-600/20 to-violet-600/15 blur-[130px] animate-liquid-2" />

      {/* Orb 3: Subtelna zieleń / szmaragd na dole sekcji */}
      <div className="absolute bottom-[10%] left-[30%] w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full bg-gradient-to-t from-emerald-600/15 via-teal-600/15 to-transparent blur-[140px] animate-liquid-1" />
    </div>
  );
}

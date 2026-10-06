import Link from "next/link";

export default function AnulowanoPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full p-8 rounded-3xl bg-zinc-950 border border-zinc-850 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <h1 className="text-xl font-extrabold text-white">Płatność została anulowana</h1>
        <p className="text-xs text-zinc-400">
          Twoja transakcja Stripe została przerwana i żadne środki nie zostały pobrane.
        </p>

        <div className="pt-2">
          <Link
            href="/sklep"
            className="w-full py-3 px-4 rounded-xl bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-colors inline-block text-center"
          >
            Wróć do Sklepu
          </Link>
        </div>
      </div>
    </div>
  );
}

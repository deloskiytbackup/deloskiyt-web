"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface ManagedProduct {
  id: string;
  name: string;
  description: string | null;
  version: string;
  category: string;
  price: number | null;
  badge: string | null;
  features: string | null;
  isPublic: boolean;
  downloadUrl: string | null;
  videoUrl?: string | null;
  imageUrl?: string | null;
  createdAt: Date | string;
}

interface StoreManagerViewProps {
  products: ManagedProduct[];
}

export function StoreManagerView({ products: initialProducts }: StoreManagerViewProps) {
  const router = useRouter();
  const [products, setProducts] = useState<ManagedProduct[]>(initialProducts);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Formularz nowego produktu
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [version, setVersion] = useState("1.0.0");
  const [category, setCategory] = useState("Bot Discord");
  const [price, setPrice] = useState("49.99");
  const [badge, setBadge] = useState("NOWOŚĆ");
  const [features, setFeatures] = useState("System ticketów;Baza MySQL;Auto-aktualizacje;Ochrona licencyjna");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/store/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          version,
          category,
          price: parseFloat(price) || null,
          badge,
          features,
          downloadUrl,
          videoUrl,
          imageUrl,
          isPublic: true,
        }),
      });

      const data = await res.json();
      if (res.ok && data.product) {
        setProducts([data.product, ...products]);
        setShowAddForm(false);
        setName("");
        setDescription("");
        setDownloadUrl("");
        setVideoUrl("");
        setImageUrl("");
        router.refresh();
      } else {
        alert(data.error || "Wystąpił błąd podczas wystawiania produktu.");
      }
    } catch {
      alert("Błąd połączenia z serwerem.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleVisibility = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/store/manage", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isPublic: !currentStatus }),
      });

      if (res.ok) {
        setProducts(
          products.map((p) => (p.id === id ? { ...p, isPublic: !currentStatus } : p))
        );
        router.refresh();
      }
    } catch {
      alert("Błąd aktualizacji statusu.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Czy na pewno chcesz usunąć ten produkt ze sklepu?")) return;

    try {
      const res = await fetch(`/api/store/manage?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
        router.refresh();
      }
    } catch {
      alert("Błąd usuwania produktu.");
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Zarządzanie Sklepem
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 border border-amber-500/20 text-amber-400">
              Admin
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Wystawiaj gotowe boty, pluginy i oprogramowanie, które pojawią się w publicznym sklepie <code className="text-zinc-200 bg-zinc-900 px-1.5 py-0.5 rounded">/sklep</code>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/sklep"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-white transition-colors"
          >
            <span>Zobacz /sklep na żywo</span>
            <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span>{showAddForm ? "Zamknij formularz" : "Wystaw nowy produkt"}</span>
          </button>
        </div>
      </div>

      {/* Formularz Wystawiania Nowego Produktu */}
      {showAddForm && (
        <form onSubmit={handleCreate} className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-850 space-y-5">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Wystaw gotowy produkt do sprzedaży
            </h3>
            <span className="text-[11px] text-emerald-400 font-semibold">
              Pojawi się natychmiast na stronie /sklep
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1.5">Nazwa produktu *</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="np. ServerHardcore - Bot Discord & Panel"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1.5">Kategoria</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-zinc-500"
              >
                <option value="Bot Discord">Bot Discord</option>
                <option value="Minecraft">Pluginy Minecraft</option>
                <option value="Web Platform & Template">Strony & Szablony WWW</option>
                <option value="Inne">Inne oprogramowanie</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1.5">Cena (PLN)</label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="np. 49.99"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1.5">Wersja</label>
              <input
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                placeholder="np. 1.0.0"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1.5">Etykieta (Badge)</label>
              <input
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="np. BESTSELLER, NOWOŚĆ, POLECANE"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
              Kluczowe funkcje (oddzielaj średnikiem <code className="text-white">;</code>)
            </label>
            <input
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              placeholder="np. System ticketów; Baza MySQL; Statystyki zaproszeń; Ochrona licencyjna"
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                Wideo demonstracyjne / Trailer (YouTube URL lub plik MP4)
              </label>
              <input
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=... lub https://.../demo.mp4"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
              />
              <span className="text-[10px] text-zinc-500 mt-1 block">
                Odtwarza się w odtwarzaczu na podstronie produktu i jako podgląd w kafelku.
              </span>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                Link do okładki / miniatury (JPG, PNG, WebP)
              </label>
              <input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://.../okladka.png"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
              />
              <span className="text-[10px] text-zinc-500 mt-1 block">
                Wyświetla się na liście i jako plakat podglądu wideo.
              </span>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1.5">Opis produktu</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Dokładny opis możliwości bota, technologii, wymagań..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1.5">Link do pobrania paczki ZIP (opcjonalnie)</label>
            <input
              value={downloadUrl}
              onChange={(e) => setDownloadUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-white text-black text-xs font-extrabold hover:bg-zinc-200 transition-colors cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? "Wystawianie..." : "Opublikuj w Sklepie"}
          </button>
        </form>
      )}

      {/* Lista Wystawionych Produktów */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">
          Aktualnie wystawione produkty ({products.length})
        </h2>

        {products.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-zinc-950 border border-dashed border-zinc-850">
            <p className="text-xs text-zinc-400">Brak wystawionych produktów w sklepie.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {products.map((prod) => (
              <div
                key={prod.id}
                className="p-5 rounded-2xl bg-zinc-950 border border-zinc-850 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-sm text-white">{prod.name}</h3>
                    {prod.badge && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                        {prod.badge}
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-900 text-zinc-400">
                      v{prod.version}
                    </span>
                    {prod.videoUrl && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center gap-1">
                        <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        Wideo
                      </span>
                    )}
                    {prod.imageUrl && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/15 border border-indigo-500/30 text-indigo-400">
                        Okładka
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-zinc-400 line-clamp-1">{prod.description}</p>

                  <div className="flex items-center gap-3 text-[11px] text-zinc-500 pt-1">
                    <span>Kategoria: {prod.category}</span>
                    <span>•</span>
                    <span className="font-semibold text-white">
                      Cena: {prod.price ? `${prod.price.toFixed(2)} PLN` : "Wycena"}
                    </span>
                    <span>•</span>
                    <Link
                      href={`/sklep/${prod.id}`}
                      target="_blank"
                      className="text-emerald-400 hover:text-emerald-300 font-medium underline inline-flex items-center gap-1"
                    >
                      Podgląd szczegółów /sklep/{prod.id}
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleVisibility(prod.id, prod.isPublic)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                      prod.isPublic
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20"
                        : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    {prod.isPublic ? "Widoczny w /sklep" : "Ukryty"}
                  </button>

                  <button
                    onClick={() => handleDelete(prod.id)}
                    className="p-2 rounded-xl bg-zinc-900 hover:bg-red-500/10 border border-zinc-800 hover:border-red-500/20 text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
                    title="Usuń produkt"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

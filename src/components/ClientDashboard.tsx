"use client";

import { useActionState, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutAction, createOrderAction } from "@/actions/authActions";

export interface Order {
  id: string;
  orderNumber: string;
  title: string;
  description: string | null;
  status: string;
  price: number | null;
  createdAt: Date | string;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  version: string;
  category: string;
  downloadUrl: string | null;
  createdAt: Date | string;
}

export interface License {
  id: string;
  licenseKey: string;
  name: string;
  status: string;
  expiresAt: Date | string | null;
  createdAt: Date | string;
  productId: string | null;
  product?: Product | null;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
  orders: Order[];
  products?: Product[];
  licenses?: License[];
}

interface ClientDashboardProps {
  user: User;
  initialTab?: "orders" | "products" | "licenses" | "new_order" | "support";
}

export function ClientDashboard({ user, initialTab = "orders" }: ClientDashboardProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"orders" | "products" | "licenses" | "new_order" | "support">(initialTab);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  // Lokalne listy produktów i licencji dla płynnej reakcji na tworzenie
  const [productsList, setProductsList] = useState<Product[]>(user.products || []);
  const [licensesList, setLicensesList] = useState<License[]>(user.licenses || []);

  // Stany formularzy dodawania
  const [showAddProductModal, setShowAddProductModal] = useState<boolean>(false);
  const [showAddLicenseModal, setShowAddLicenseModal] = useState<boolean>(false);
  const [isSubmittingProduct, setIsSubmittingProduct] = useState<boolean>(false);
  const [isSubmittingLicense, setIsSubmittingLicense] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Formularz nowego produktu
  const [newProductName, setNewProductName] = useState("");
  const [newProductDesc, setNewProductDesc] = useState("");
  const [newProductVersion, setNewProductVersion] = useState("1.0.0");
  const [newProductCategory, setNewProductCategory] = useState("Szablon / Kod");
  const [newProductDownload, setNewProductDownload] = useState("");

  // Formularz nowej licencji
  const [newLicenseName, setNewLicenseName] = useState("");
  const [newLicenseProductId, setNewLicenseProductId] = useState("");

  const [orderState, orderDispatch, isPending] = useActionState(createOrderAction, null);

  useEffect(() => {
    if (orderState?.success) {
      setActiveTab("orders");
    }
  }, [orderState]);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim()) return;
    setIsSubmittingProduct(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newProductName,
          description: newProductDesc,
          version: newProductVersion,
          category: newProductCategory,
          downloadUrl: newProductDownload,
        }),
      });
      const data = await res.json();
      if (res.ok && data.product) {
        setProductsList((prev) => [data.product, ...prev]);
        setShowAddProductModal(false);
        setNewProductName("");
        setNewProductDesc("");
        setNewProductDownload("");
        router.refresh();
      } else {
        alert(data.error || "Wystąpił błąd.");
      }
    } catch {
      alert("Błąd połączenia z serwerem.");
    } finally {
      setIsSubmittingProduct(false);
    }
  };

  const handleCreateLicense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLicenseName.trim()) return;
    setIsSubmittingLicense(true);
    try {
      const res = await fetch("/api/licenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newLicenseName,
          productId: newLicenseProductId || undefined,
        }),
      });
      const data = await res.json();
      if (res.ok && data.license) {
        setLicensesList((prev) => [data.license, ...prev]);
        setShowAddLicenseModal(false);
        setNewLicenseName("");
        setNewLicenseProductId("");
        router.refresh();
      } else {
        alert(data.error || "Wystąpił błąd.");
      }
    } catch {
      alert("Błąd połączenia z serwerem.");
    } finally {
      setIsSubmittingLicense(false);
    }
  };

  const totalOrders = user.orders.length;
  const inProgressOrders = user.orders.filter(
    (o) => o.status === "w_trakcie" || o.status === "w_kolejce"
  ).length;
  const completedOrders = user.orders.filter((o) => o.status === "zakonczone").length;

  const filteredOrders = user.orders.filter((order) => {
    if (filterStatus === "all") return true;
    return order.status === filterStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "w_kolejce":
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-400">
            W kolejce
          </span>
        );
      case "w_trakcie":
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400">
            W realizacji
          </span>
        );
      case "do_akceptacji":
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-purple-500/10 border border-purple-500/20 text-purple-400">
            Do akceptacji
          </span>
        );
      case "zakonczone":
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            Zakończone
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-zinc-800 text-zinc-300">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row w-full selection:bg-white/20">
      {/* PASEK MOBILNY */}
      <header className="md:hidden flex items-center justify-between p-4 bg-zinc-950 border-b border-zinc-850 z-30 sticky top-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-sm">
            D
          </div>
          <div>
            <span className="font-bold text-sm text-white block">deloskiyt</span>
            <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Panel Klienta</span>
          </div>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </header>

      {/* SIDEBAR (DESKTOP + MOBILNY PO ROZWINIĘCIU) */}
      <aside
        className={`${
          mobileMenuOpen ? "flex" : "hidden"
        } md:flex flex-col justify-between ${
          isCollapsed ? "md:w-20 md:min-w-[5rem]" : "md:w-64 md:min-w-[16rem]"
        } bg-zinc-950 border-r border-zinc-850 p-4 md:min-h-screen fixed md:sticky top-0 z-20 h-auto md:h-screen transition-all duration-300 ease-in-out`}
      >
        <div className="space-y-6">
          {/* Logo, Tytuł & Przycisk Zwijania */}
          <div className="hidden md:flex items-center justify-between px-2 py-1">
            {!isCollapsed && (
              <Link href="/panel-klienta" className="flex items-center gap-3 overflow-hidden">
                <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-base shadow-sm shrink-0">
                  D
                </div>
                <div className="truncate">
                  <span className="font-bold text-base text-white block tracking-tight truncate">deloskiyt</span>
                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-medium truncate">
                    Panel Klienta
                  </span>
                </div>
              </Link>
            )}

            {isCollapsed && (
              <Link href="/panel-klienta" className="mx-auto block" title="deloskiyt Panel">
                <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-base shadow-sm">
                  D
                </div>
              </Link>
            )}

            {/* Przycisk zwijania/rozwijania sidebara na desktopie */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`p-1.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer ${
                isCollapsed ? "mx-auto mt-3" : ""
              }`}
              title={isCollapsed ? "Rozwiń panel boczny" : "Zwiń panel boczny"}
              aria-label="Zwiń / Rozwiń sidebar"
            >
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
          </div>

          {/* Nawigacja w Sidebarze */}
          <nav className="space-y-1.5">
            {/* Zlecenia */}
            <Link
              href="/panel-klienta"
              onClick={() => {
                setActiveTab("orders");
                setMobileMenuOpen(false);
              }}
              title="Twoje Zlecenia"
              className={`w-full flex items-center ${
                isCollapsed ? "justify-center px-2 py-3" : "gap-3 px-3 py-2.5"
              } rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "orders"
                  ? "bg-white text-black shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900/60"
              }`}
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {!isCollapsed && <span>Twoje Zlecenia</span>}
              {!isCollapsed && totalOrders > 0 && (
                <span
                  className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full ${
                    activeTab === "orders" ? "bg-zinc-200 text-black" : "bg-zinc-900 text-zinc-400"
                  }`}
                >
                  {totalOrders}
                </span>
              )}
            </Link>

            {/* Moje Produkty */}
            <Link
              href="/panel-klienta/produkty"
              onClick={() => {
                setActiveTab("products");
                setMobileMenuOpen(false);
              }}
              title="Moje Produkty"
              className={`w-full flex items-center ${
                isCollapsed ? "justify-center px-2 py-3" : "gap-3 px-3 py-2.5"
              } rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "products"
                  ? "bg-white text-black shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900/60"
              }`}
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              {!isCollapsed && <span>Moje Produkty</span>}
              {!isCollapsed && productsList.length > 0 && (
                <span
                  className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full ${
                    activeTab === "products" ? "bg-zinc-200 text-black" : "bg-zinc-900 text-zinc-400"
                  }`}
                >
                  {productsList.length}
                </span>
              )}
            </Link>

            {/* Moje Licencje */}
            <Link
              href="/panel-klienta/licencje"
              onClick={() => {
                setActiveTab("licenses");
                setMobileMenuOpen(false);
              }}
              title="Moje Licencje"
              className={`w-full flex items-center ${
                isCollapsed ? "justify-center px-2 py-3" : "gap-3 px-3 py-2.5"
              } rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "licenses"
                  ? "bg-white text-black shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900/60"
              }`}
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              {!isCollapsed && <span>Moje Licencje</span>}
              {!isCollapsed && licensesList.length > 0 && (
                <span
                  className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full ${
                    activeTab === "licenses" ? "bg-zinc-200 text-black" : "bg-zinc-900 text-zinc-400"
                  }`}
                >
                  {licensesList.length}
                </span>
              )}
            </Link>

            {/* Nowe Zlecenie */}
            <button
              onClick={() => {
                setActiveTab("new_order");
                setMobileMenuOpen(false);
              }}
              title="Nowe Zlecenie"
              className={`w-full flex items-center ${
                isCollapsed ? "justify-center px-2 py-3" : "gap-3 px-3 py-2.5"
              } rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "new_order"
                  ? "bg-white text-black shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900/60"
              }`}
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              {!isCollapsed && <span>Nowe Zlecenie</span>}
            </button>

            {/* Wsparcie & Discord */}
            <button
              onClick={() => {
                setActiveTab("support");
                setMobileMenuOpen(false);
              }}
              title="Wsparcie & Discord"
              className={`w-full flex items-center ${
                isCollapsed ? "justify-center px-2 py-3" : "gap-3 px-3 py-2.5"
              } rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "support"
                  ? "bg-white text-black shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900/60"
              }`}
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {!isCollapsed && <span>Wsparcie & Discord</span>}
            </button>
          </nav>

          {/* Linki Zewnętrzne */}
          {!isCollapsed && (
            <div className="pt-4 border-t border-zinc-900 space-y-1">
              <span className="px-3 text-[10px] uppercase tracking-wider text-zinc-600 font-bold block mb-1">
                Przydatne linki
              </span>
              <Link
                href="/regulamin"
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-zinc-400 hover:text-white hover:bg-zinc-900/40 transition-colors"
              >
                <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Regulamin zleceń</span>
              </Link>

              <Link
                href="/"
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-zinc-400 hover:text-white hover:bg-zinc-900/40 transition-colors"
              >
                <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Strona główna</span>
              </Link>
            </div>
          )}
        </div>

        {/* Profil i Wylogowanie */}
        <div className="pt-4 border-t border-zinc-900 mt-6">
          {!isCollapsed ? (
            <div className="p-3 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 mb-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-zinc-800 to-zinc-700 flex items-center justify-center font-bold text-white text-sm shrink-0">
                {(user.name || user.email)[0].toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <span className="font-semibold text-xs text-white block truncate">
                  {user.name || user.email.split("@")[0]}
                </span>
                <span className="text-[10px] text-zinc-500 block truncate">
                  {user.email}
                </span>
              </div>
            </div>
          ) : (
            <div
              className="w-9 h-9 mx-auto rounded-xl bg-gradient-to-tr from-zinc-800 to-zinc-700 flex items-center justify-center font-bold text-white text-sm mb-3"
              title={user.email}
            >
              {(user.name || user.email)[0].toUpperCase()}
            </div>
          )}

          <form action={logoutAction}>
            <button
              type="submit"
              title="Wyloguj się"
              className={`w-full flex items-center ${
                isCollapsed ? "justify-center p-2.5" : "justify-center gap-2 px-3 py-2"
              } rounded-xl bg-zinc-900 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 border border-zinc-800 text-zinc-400 text-xs font-semibold transition-all cursor-pointer`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              {!isCollapsed && <span>Wyloguj się</span>}
            </button>
          </form>
        </div>
      </aside>

      {/* GŁÓWNA TREŚĆ PULPITU */}
      <main className="flex-1 p-5 md:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
        {/* ZAKŁADKA 1: TWOJE ZLECENIA */}
        {activeTab === "orders" && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Witaj, {user.name || user.email.split("@")[0]} 👋
                </h1>
                <p className="text-xs text-zinc-400 mt-1">
                  Śledź status bieżących projektów oraz zamówień w jednym miejscu.
                </p>
              </div>

              <button
                onClick={() => setActiveTab("new_order")}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-colors cursor-pointer w-fit"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span>Nowe Zlecenie</span>
              </button>
            </div>

            {/* Podsumowanie Liczbowe */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-850">
                <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block">Wszystkie zlecenia</span>
                <span className="text-2xl font-black text-white mt-1 block">{totalOrders}</span>
              </div>
              <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-850">
                <span className="text-[11px] font-semibold text-amber-500 uppercase tracking-wider block">W trakcie / W kolejce</span>
                <span className="text-2xl font-black text-amber-400 mt-1 block">{inProgressOrders}</span>
              </div>
              <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-850">
                <span className="text-[11px] font-semibold text-emerald-500 uppercase tracking-wider block">Ukończone</span>
                <span className="text-2xl font-black text-emerald-400 mt-1 block">{completedOrders}</span>
              </div>
            </div>

            {/* Filtrowanie i Lista */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-zinc-900">
                <h2 className="text-base font-bold text-white">Historia i Postęp Zleceń</h2>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  {["all", "w_kolejce", "w_trakcie", "do_akceptacji", "zakonczone"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setFilterStatus(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                        filterStatus === st
                          ? "bg-zinc-800 text-white"
                          : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50"
                      }`}
                    >
                      {st === "all" ? "Wszystkie" : st.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>

              {filteredOrders.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-zinc-950/60 border border-dashed border-zinc-850 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-white">Brak zarejestrowanych zleceń</h3>
                  <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                    Nie masz jeszcze żadnego aktywnego zlecenia w wybranej kategorii. Złóż formularz, aby rozpocząć realizację projektu.
                  </p>
                  <button
                    onClick={() => setActiveTab("new_order")}
                    className="mt-2 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-xs font-semibold text-white transition-colors cursor-pointer"
                  >
                    Złóż pierwsze zlecenie
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className="p-5 rounded-2xl bg-zinc-950 border border-zinc-850 hover:border-zinc-700 transition-all space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-zinc-500 font-semibold">
                            {order.orderNumber}
                          </span>
                          <h3 className="font-bold text-sm text-white">{order.title}</h3>
                        </div>
                        <div>{getStatusBadge(order.status)}</div>
                      </div>

                      {order.description && (
                        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                          {order.description}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-900 text-[11px] text-zinc-500">
                        <span>
                          Data zgłoszenia: {new Date(order.createdAt).toLocaleDateString("pl-PL")}
                        </span>
                        {order.price && (
                          <span className="font-bold text-white">
                            Wycena: {order.price} PLN
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ZAKŁADKA 2: MOJE PRODUKTY */}
        {activeTab === "products" && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Moje Produkty
                </h1>
                <p className="text-xs text-zinc-400 mt-1">
                  Wszystkie przypisane produkty cyfrowe, szablony, pliki i oprogramowanie.
                </p>
              </div>

              <button
                onClick={() => setShowAddProductModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-colors cursor-pointer w-fit"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span>Dodaj / Zarejestruj produkt</span>
              </button>
            </div>

            {/* Modal dodawania produktu */}
            {showAddProductModal && (
              <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">Zarejestruj nowy produkt cyfrowy</h3>
                  <button
                    onClick={() => setShowAddProductModal(false)}
                    className="text-zinc-500 hover:text-white text-xs"
                  >
                    ✕ Zamknij
                  </button>
                </div>
                <form onSubmit={handleCreateProduct} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Nazwa produktu *</label>
                      <input
                        required
                        value={newProductName}
                        onChange={(e) => setNewProductName(e.target.value)}
                        placeholder="np. Deloskiyt Web Template"
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Kategoria</label>
                      <input
                        value={newProductCategory}
                        onChange={(e) => setNewProductCategory(e.target.value)}
                        placeholder="np. Website, Plugin, Szablon"
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Wersja</label>
                      <input
                        value={newProductVersion}
                        onChange={(e) => setNewProductVersion(e.target.value)}
                        placeholder="np. 1.0.0"
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Link do pobrania (URL)</label>
                      <input
                        value={newProductDownload}
                        onChange={(e) => setNewProductDownload(e.target.value)}
                        placeholder="https://..."
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Opis produktu</label>
                    <textarea
                      value={newProductDesc}
                      onChange={(e) => setNewProductDesc(e.target.value)}
                      rows={2}
                      placeholder="Krótki opis produktu lub instrukcja instalacji..."
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmittingProduct}
                    className="px-4 py-2.5 rounded-xl bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isSubmittingProduct ? "Zapisywanie..." : "Dodaj produkt"}
                  </button>
                </form>
              </div>
            )}

            {/* Lista produktów */}
            {productsList.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-zinc-950/60 border border-dashed border-zinc-850 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-white">Brak przypisanych produktów</h3>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                  Gdy zakupisz gotowy projekt, szablon lub oprogramowanie, pojawi się ono tutaj wraz z plikami do pobrania.
                </p>
                <button
                  onClick={() => setShowAddProductModal(true)}
                  className="mt-2 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-xs font-semibold text-white transition-colors cursor-pointer"
                >
                  Dodaj produkt demonstracyjny
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {productsList.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-5 rounded-2xl bg-zinc-950 border border-zinc-850 hover:border-zinc-700 transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider block">
                            {prod.category}
                          </span>
                          <h3 className="font-bold text-base text-white mt-0.5">{prod.name}</h3>
                        </div>
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-400">
                          v{prod.version}
                        </span>
                      </div>

                      {prod.description && (
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          {prod.description}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-zinc-900 flex items-center justify-between gap-3">
                      <span className="text-[11px] text-zinc-500">
                        Dodano: {new Date(prod.createdAt).toLocaleDateString("pl-PL")}
                      </span>

                      {prod.downloadUrl ? (
                        <a
                          href={prod.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-colors"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          <span>Pobierz pliki</span>
                        </a>
                      ) : (
                        <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                          Dostęp aktywny
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ZAKŁADKA 3: MOJE LICENCJE */}
        {activeTab === "licenses" && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Moje Licencje
                </h1>
                <p className="text-xs text-zinc-400 mt-1">
                  Zarządzaj swoimi kluczami licencyjnymi, weryfikacją domen i czasem ważności.
                </p>
              </div>

              <button
                onClick={() => setShowAddLicenseModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-colors cursor-pointer w-fit"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span>Wygeneruj / Aktywuj klucz</span>
              </button>
            </div>

            {/* Modal dodawania licencji */}
            {showAddLicenseModal && (
              <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">Wygeneruj nowy klucz licencyjny</h3>
                  <button
                    onClick={() => setShowAddLicenseModal(false)}
                    className="text-zinc-500 hover:text-white text-xs"
                  >
                    ✕ Zamknij
                  </button>
                </div>
                <form onSubmit={handleCreateLicense} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Nazwa licencji / Projekt *</label>
                      <input
                        required
                        value={newLicenseName}
                        onChange={(e) => setNewLicenseName(e.target.value)}
                        placeholder="np. Licencja Komercyjna - Moja Strona"
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Powiązany produkt (opcjonalnie)</label>
                      <select
                        value={newLicenseProductId}
                        onChange={(e) => setNewLicenseProductId(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-zinc-500"
                      >
                        <option value="">-- Wybierz produkt --</option>
                        {productsList.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmittingLicense}
                    className="px-4 py-2.5 rounded-xl bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isSubmittingLicense ? "Generowanie..." : "Generuj klucz licencji"}
                  </button>
                </form>
              </div>
            )}

            {/* Lista licencji */}
            {licensesList.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-zinc-950/60 border border-dashed border-zinc-850 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-white">Brak aktywnych licencji</h3>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                  Każdy zakupiony skrypt lub oprogramowanie deloskiyt posiada unikalny klucz licencyjny chroniący Twoją instalację.
                </p>
                <button
                  onClick={() => setShowAddLicenseModal(true)}
                  className="mt-2 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-xs font-semibold text-white transition-colors cursor-pointer"
                >
                  Wygeneruj klucz testowy
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {licensesList.map((lic) => (
                  <div
                    key={lic.id}
                    className="p-5 rounded-2xl bg-zinc-950 border border-zinc-850 hover:border-zinc-700 transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm text-white">{lic.name}</h3>
                          {lic.product && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 font-medium">
                              {lic.product.name}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-zinc-500 block">
                          Wygenerowano: {new Date(lic.createdAt).toLocaleDateString("pl-PL")}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {lic.status === "active" ? (
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                            Aktywna
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-red-500/10 border border-red-500/20 text-red-400">
                            {lic.status}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Klucz licencji z kopiowaniem */}
                    <div className="p-3 rounded-xl bg-black border border-zinc-850 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span className="text-zinc-500 text-xs shrink-0 font-mono">KEY:</span>
                        <code className="text-xs sm:text-sm font-mono text-zinc-200 tracking-wider font-semibold truncate select-all">
                          {lic.licenseKey}
                        </code>
                      </div>

                      <button
                        onClick={() => copyToClipboard(lic.licenseKey)}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-200 transition-colors cursor-pointer shrink-0"
                      >
                        {copiedKey === lic.licenseKey ? (
                          <>
                            <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-emerald-400">Skopiowano</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <span>Kopiuj klucz</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-500">
                      <span>
                        Ważność: {lic.expiresAt ? new Date(lic.expiresAt).toLocaleDateString("pl-PL") : "Dożywotnia (Lifetime)"}
                      </span>
                      <span>Typ licencji: Commercial Single Use</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ZAKŁADKA 4: NOWE ZLECENIE */}
        {activeTab === "new_order" && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Złóż Nowe Zlecenie
              </h1>
              <p className="text-xs text-zinc-400">
                Wypełnij formularz. Otrzymasz indywidualną wycenę oraz status zlecenia w panelu.
              </p>
            </div>

            <form
              action={orderDispatch}
              className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-850 space-y-5"
            >
              {orderState?.error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
                  {orderState.error}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">
                  Tytuł zlecenia / Nazwa projektu
                </label>
                <input
                  name="title"
                  required
                  placeholder="np. Montaż odcinka YouTube, Konfiguracja Discorda..."
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">
                  Szczegółowy opis & Link do materiałów
                </label>
                <textarea
                  name="description"
                  rows={5}
                  placeholder="Opisz oczekiwania, preferowany styl, format i wklej ewentualny link do dysku Google / WeTransfer..."
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full py-3.5 rounded-xl bg-white text-black text-xs font-bold hover:bg-zinc-200 disabled:opacity-50 active:scale-95 transition-all cursor-pointer"
              >
                {isPending ? "Zapisywanie w bazie..." : "Wyślij zgłoszenie zlecenia"}
              </button>
            </form>
          </div>
        )}

        {/* ZAKŁADKA 5: WSPARCIE & DISCORD */}
        {activeTab === "support" && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Wsparcie & Pomoc
              </h1>
              <p className="text-xs text-zinc-400">
                Masz pytania do swojego zamówienia? Skontaktuj się ze mną bezpośrednio.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-850 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#5865F2]/10 border border-[#5865F2]/20 flex items-center justify-center text-[#5865F2]">
                  <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">System Ticketów Discord</h3>
                  <p className="text-xs text-zinc-400">Najszybsza forma kontaktu w sprawie bieżących zleceń.</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-zinc-300">
                <p>1. Dołącz do oficjalnego serwera Discord.</p>
                <p>2. Wejdź na kanał <code className="text-white bg-zinc-900 px-2 py-0.5 rounded">#pomoc-ticket</code> i utwórz zgłoszenie.</p>
                <p>3. Podaj numer swojego zlecenia (np. <code className="text-white bg-zinc-900 px-2 py-0.5 rounded">#ORD-xxxx</code>), aby natychmiast otrzymać odpowiedź.</p>
              </div>

              <a
                href="https://discord.gg"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-bold transition-colors"
              >
                <span>Przejdź do Discorda</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

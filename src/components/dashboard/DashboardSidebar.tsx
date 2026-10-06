"use client";

import Link from "next/link";
import { logoutAction } from "@/actions/authActions";
import { User, DashboardTab } from "./types";

interface DashboardSidebarProps {
  user: User;
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  totalOrders: number;
  productsCount: number;
  licensesCount: number;
}

export function DashboardSidebar({
  user,
  activeTab,
  setActiveTab,
  mobileMenuOpen,
  setMobileMenuOpen,
  isCollapsed,
  setIsCollapsed,
  totalOrders,
  productsCount,
  licensesCount,
}: DashboardSidebarProps) {
  return (
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

          {/* Przycisk zwijania/rozwijania */}
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

        {/* Nawigacja */}
        <nav className="space-y-1.5">
          {/* Twoje Zlecenia */}
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
            {!isCollapsed && productsCount > 0 && (
              <span
                className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeTab === "products" ? "bg-zinc-200 text-black" : "bg-zinc-900 text-zinc-400"
                }`}
              >
                {productsCount}
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
            {!isCollapsed && licensesCount > 0 && (
              <span
                className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeTab === "licenses" ? "bg-zinc-200 text-black" : "bg-zinc-900 text-zinc-400"
                }`}
              >
                {licensesCount}
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
  );
}

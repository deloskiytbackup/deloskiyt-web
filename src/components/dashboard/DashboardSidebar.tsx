"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/actions/authActions";
import { User } from "./types";

interface DashboardSidebarProps {
  user: User;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  productsCount: number;
  licensesCount: number;
  accountsCount?: number;
  unclaimedAccountsCount?: number;
}

export function DashboardSidebar({
  user,
  mobileMenuOpen,
  setMobileMenuOpen,
  isCollapsed,
  setIsCollapsed,
  productsCount,
  licensesCount,
  accountsCount = 0,
  unclaimedAccountsCount = 0,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  const isProductsActive =
    pathname === "/panel-klienta" ||
    pathname === "/panel-klienta/produkty" ||
    pathname.startsWith("/panel-klienta/produkty/");

  const isLicensesActive =
    pathname === "/panel-klienta/licencje" ||
    pathname.startsWith("/panel-klienta/licencje/");

  const isAccountsActive =
    pathname === "/panel-klienta/konta" ||
    pathname.startsWith("/panel-klienta/konta/");

  const isStoreActive = pathname.startsWith("/panel-klienta/zarzadzaj-sklepem");
  const isAdmin = user.role === "admin" || user.email === "deloskiyt@gmail.com";

  return (
    <>
      {/* ========================================================
          MOBILE DRAWER (Wysuwane menu na smartfonach i tabletach)
          ======================================================== */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-zinc-950/98 border-r border-zinc-800/80 z-50 p-5 flex flex-col justify-between shadow-2xl transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-6">
          {/* Header w wysuwanym menu mobilnym */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-850">
            <Link
              href="/panel-klienta/produkty"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-base text-white shadow-sm">
                D
              </div>
              <div>
                <span className="font-bold text-base text-white block tracking-tight">deloskiyt</span>
                <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-medium">
                  Panel Klienta
                </span>
              </div>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Zamknij menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Nawigacja mobilna */}
          <nav className="space-y-2">
            {/* Moje Produkty */}
            <Link
              href="/panel-klienta/produkty"
              onClick={() => setMobileMenuOpen(false)}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                isProductsActive
                  ? "bg-white text-black shadow-md"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900/60"
              }`}
            >
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span>Moje Produkty</span>
              {productsCount > 0 && (
                <span
                  className={`ml-auto text-xs px-2 py-0.5 rounded-full font-bold ${
                    isProductsActive ? "bg-zinc-200 text-black" : "bg-zinc-900 text-zinc-400"
                  }`}
                >
                  {productsCount}
                </span>
              )}
            </Link>

            {/* Moje Licencje */}
            <Link
              href="/panel-klienta/licencje"
              onClick={() => setMobileMenuOpen(false)}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                isLicensesActive
                  ? "bg-white text-black shadow-md"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900/60"
              }`}
            >
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              <span>Moje Licencje</span>
              {licensesCount > 0 && (
                <span
                  className={`ml-auto text-xs px-2 py-0.5 rounded-full font-bold ${
                    isLicensesActive ? "bg-zinc-200 text-black" : "bg-zinc-900 text-zinc-400"
                  }`}
                >
                  {licensesCount}
                </span>
              )}
            </Link>

            {/* Konta do gier (NOWA ZAKŁADKA) */}
            <Link
              href="/panel-klienta/konta"
              onClick={() => setMobileMenuOpen(false)}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                isAccountsActive
                  ? "bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold shadow-lg shadow-amber-500/20"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900/60"
              }`}
            >
              <span className="text-lg shrink-0">🎮</span>
              <span>Konta do gier</span>

              {unclaimedAccountsCount > 0 ? (
                <span className="ml-auto text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-black animate-pulse flex items-center gap-1">
                  <span>{unclaimedAccountsCount} do odbioru</span>
                </span>
              ) : accountsCount > 0 ? (
                <span
                  className={`ml-auto text-xs px-2 py-0.5 rounded-full font-bold ${
                    isAccountsActive ? "bg-amber-600/30 text-black" : "bg-zinc-900 text-zinc-400"
                  }`}
                >
                  {accountsCount}
                </span>
              ) : null}
            </Link>

            {/* Zarządzaj Sklepem (Admin) */}
            {isAdmin && (
              <Link
                href="/panel-klienta/zarzadzaj-sklepem"
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  isStoreActive
                    ? "bg-amber-400 text-black shadow-md font-bold"
                    : "text-amber-400/90 hover:text-amber-300 hover:bg-amber-400/10 border border-amber-400/20"
                }`}
              >
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-8-6h16" />
                </svg>
                <span>Wystaw w Sklepie</span>
              </Link>
            )}
          </nav>
        </div>

        {/* Profil & Wylogowanie na telefonie */}
        <div className="pt-4 border-t border-zinc-850 space-y-3">
          <div className="p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-zinc-800 to-zinc-700 flex items-center justify-center font-bold text-white text-sm shrink-0">
              {(user.name || user.email)[0].toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <span className="font-semibold text-xs text-white block truncate">
                {user.name || user.email.split("@")[0]}
              </span>
              <span className="text-[10px] text-zinc-400 block truncate">
                {user.email}
              </span>
            </div>
          </div>

          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-zinc-900 hover:bg-red-500/15 hover:border-red-500/30 hover:text-red-400 border border-zinc-800 text-zinc-400 text-xs font-semibold transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Wyloguj się</span>
            </button>
          </form>
        </div>
      </div>

      {/* ========================================================
          DESKTOP SIDEBAR (Elegancki, zwijany sidebar na komputerach)
          ======================================================== */}
      <aside
        className={`hidden md:flex flex-col justify-between ${
          isCollapsed ? "w-20 min-w-[5rem]" : "w-64 min-w-[16rem]"
        } bg-zinc-950/95 border-r border-zinc-850/80 p-4 sticky top-0 h-screen z-20 transition-all duration-300 ease-in-out`}
      >
        <div className="space-y-6">
          {/* Logo, Tytuł & Przycisk Zwijania */}
          <div className="flex items-center justify-between px-2 py-1">
            {!isCollapsed && (
              <Link href="/panel-klienta/produkty" className="flex items-center gap-3 overflow-hidden">
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
              <Link href="/panel-klienta/produkty" className="mx-auto block" title="deloskiyt Panel">
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
            {/* Moje Produkty */}
            <Link
              href="/panel-klienta/produkty"
              title="Moje Produkty"
              className={`w-full flex items-center ${
                isCollapsed ? "justify-center px-2 py-3" : "gap-3 px-3 py-2.5"
              } rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isProductsActive
                  ? "bg-white text-black shadow-sm font-bold"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900/60"
              }`}
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              {!isCollapsed && <span>Moje Produkty</span>}
              {!isCollapsed && productsCount > 0 && (
                <span
                  className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isProductsActive ? "bg-zinc-200 text-black" : "bg-zinc-900 text-zinc-400"
                  }`}
                >
                  {productsCount}
                </span>
              )}
            </Link>

            {/* Moje Licencje */}
            <Link
              href="/panel-klienta/licencje"
              title="Moje Licencje"
              className={`w-full flex items-center ${
                isCollapsed ? "justify-center px-2 py-3" : "gap-3 px-3 py-2.5"
              } rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isLicensesActive
                  ? "bg-white text-black shadow-sm font-bold"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900/60"
              }`}
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              {!isCollapsed && <span>Moje Licencje</span>}
              {!isCollapsed && licensesCount > 0 && (
                <span
                  className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isLicensesActive ? "bg-zinc-200 text-black" : "bg-zinc-900 text-zinc-400"
                  }`}
                >
                  {licensesCount}
                </span>
              )}
            </Link>

            {/* Konta do gier (NOWA ZAKŁADKA) */}
            <Link
              href="/panel-klienta/konta"
              title="Konta do gier"
              className={`w-full flex items-center ${
                isCollapsed ? "justify-center px-2 py-3" : "gap-3 px-3 py-2.5"
              } rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isAccountsActive
                  ? "bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold shadow-md shadow-amber-500/10"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900/60"
              }`}
            >
              <span className="text-base shrink-0">🎮</span>
              {!isCollapsed && <span>Konta do gier</span>}

              {!isCollapsed && unclaimedAccountsCount > 0 ? (
                <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-amber-500 text-black animate-pulse">
                  {unclaimedAccountsCount}
                </span>
              ) : !isCollapsed && accountsCount > 0 ? (
                <span
                  className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isAccountsActive ? "bg-amber-600/30 text-black" : "bg-zinc-900 text-zinc-400"
                  }`}
                >
                  {accountsCount}
                </span>
              ) : null}
            </Link>

            {/* Zarządzaj Sklepem (Tylko dla Admina) */}
            {isAdmin && (
              <Link
                href="/panel-klienta/zarzadzaj-sklepem"
                title="Zarządzaj Sklepem"
                className={`w-full flex items-center ${
                  isCollapsed ? "justify-center px-2 py-3" : "gap-3 px-3 py-2.5"
                } rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isStoreActive
                    ? "bg-amber-400 text-black shadow-sm font-bold"
                    : "text-amber-400/90 hover:text-amber-300 hover:bg-amber-400/10 border border-amber-400/20"
                }`}
              >
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-8-6h16" />
                </svg>
                {!isCollapsed && <span>Wystaw w Sklepie</span>}
              </Link>
            )}
          </nav>
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
    </>
  );
}

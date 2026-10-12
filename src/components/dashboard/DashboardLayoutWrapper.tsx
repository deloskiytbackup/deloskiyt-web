"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "./types";
import { DashboardHeaderMobile } from "./DashboardHeaderMobile";
import { DashboardSidebar } from "./DashboardSidebar";

interface DashboardLayoutWrapperProps {
  user: User;
  children: React.ReactNode;
}

export function DashboardLayoutWrapper({ user, children }: DashboardLayoutWrapperProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const productsCount = user.products?.length ?? 0;
  
  // Licencje deweloperskie / wtyczki (niebędące kontami do gier)
  const softwareLicenses = (user.licenses || []).filter(
    (l) => l.product?.itemType !== "konto" && !l.accountCredentials
  );
  const licensesCount = softwareLicenses.length;

  // Konta do gier z zamówień i licencji
  const gameOrders = (user.orders || []).filter(
    (o) => o.orderType === "konto" || Boolean(o.accountCredentials)
  );
  const gameLicenses = (user.licenses || []).filter(
    (l) => l.product?.itemType === "konto" || Boolean(l.accountCredentials)
  );

  const totalAccountsCount = Math.max(gameOrders.length, gameLicenses.length);
  const unclaimedAccountsCount =
    gameOrders.filter((o) => !o.isClaimed).length ||
    gameLicenses.filter((l) => !l.isClaimed).length;

  const isAdmin = user.role === "admin" || user.email === "deloskiyt@gmail.com";

  // Sprawdzanie aktywności dla paska dolnego na telefonie
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

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row w-full selection:bg-white/20">
      {/* Pasek nawigacyjny na telefonach (Góra) */}
      <DashboardHeaderMobile
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        unclaimedAccountsCount={unclaimedAccountsCount}
      />

      {/* Zwijany sidebar na desktopie + drawer na mobile */}
      <DashboardSidebar
        user={user}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        productsCount={productsCount}
        licensesCount={licensesCount}
        accountsCount={totalAccountsCount}
        unclaimedAccountsCount={unclaimedAccountsCount}
      />

      {/* Główna zawartość dowolnej podstrony w panelu (pb-24 na mobile ze względu na bottom dock) */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 max-w-7xl mx-auto w-full overflow-y-auto pb-24 md:pb-10">
        {children}
      </main>

      {/* ========================================================
          MOBILE BOTTOM DOCK (Szybki pasek dolny dla mobilnego UX)
          ======================================================== */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-zinc-950/95 backdrop-blur-2xl border-t border-zinc-850/80 px-2 py-2 flex items-center justify-around shadow-2xl">
        {/* Produkty */}
        <Link
          href="/panel-klienta/produkty"
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            isProductsActive
              ? "text-white font-bold"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <div className="relative">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isProductsActive ? 2.5 : 2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            {productsCount > 0 && (
              <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-zinc-800 text-[9px] font-bold text-zinc-300 rounded-full flex items-center justify-center">
                {productsCount}
              </span>
            )}
          </div>
          <span className="text-[10px]">Produkty</span>
        </Link>

        {/* Licencje */}
        <Link
          href="/panel-klienta/licencje"
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            isLicensesActive
              ? "text-white font-bold"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <div className="relative">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isLicensesActive ? 2.5 : 2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            {licensesCount > 0 && (
              <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-zinc-800 text-[9px] font-bold text-zinc-300 rounded-full flex items-center justify-center">
                {licensesCount}
              </span>
            )}
          </div>
          <span className="text-[10px]">Licencje</span>
        </Link>

        {/* Konta */}
        <Link
          href="/panel-klienta/konta"
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all relative ${
            isAccountsActive
              ? "text-amber-400 font-bold"
              : "text-zinc-500 hover:text-amber-400/80"
          }`}
        >
          <div className="relative">
            <span className="text-base leading-none block">🎮</span>
            {unclaimedAccountsCount > 0 && (
              <span className="absolute -top-1.5 -right-2 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping"></span>
            )}
            {unclaimedAccountsCount > 0 && (
              <span className="absolute -top-1.5 -right-2 w-2.5 h-2.5 bg-amber-400 rounded-full"></span>
            )}
          </div>
          <span className="text-[10px]">Konta</span>
        </Link>

        {/* Admin Sklep */}
        {isAdmin && (
          <Link
            href="/panel-klienta/zarzadzaj-sklepem"
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
              isStoreActive
                ? "text-amber-400 font-bold"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isStoreActive ? 2.5 : 2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-8-6h16" />
            </svg>
            <span className="text-[10px]">Sklep</span>
          </Link>
        )}
      </nav>
    </div>
  );
}

"use client";

import { useState } from "react";
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

  const productsCount = user.products?.length ?? 0;
  const licensesCount = user.licenses?.length ?? 0;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row w-full selection:bg-white/20">
      {/* Pasek nawigacyjny na telefonach */}
      <DashboardHeaderMobile
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Zwijany sidebar */}
      <DashboardSidebar
        user={user}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        productsCount={productsCount}
        licensesCount={licensesCount}
      />

      {/* Główna zawartość dowolnej podstrony w panelu */}
      <main className="flex-1 p-5 md:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

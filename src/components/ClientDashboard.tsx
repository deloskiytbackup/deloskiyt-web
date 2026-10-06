"use client";

import { useState, useEffect } from "react";
import {
  User,
  DashboardTab,
} from "./dashboard/types";
import { DashboardHeaderMobile } from "./dashboard/DashboardHeaderMobile";
import { DashboardSidebar } from "./dashboard/DashboardSidebar";
import { ProductsTab } from "./dashboard/ProductsTab";
import { LicensesTab } from "./dashboard/LicensesTab";
import { SupportTab } from "./dashboard/SupportTab";

export type { Order, Product, License, User, DashboardTab } from "./dashboard/types";

interface ClientDashboardProps {
  user: User;
  initialTab?: DashboardTab;
}

export function ClientDashboard({ user, initialTab = "products" }: ClientDashboardProps) {
  const [activeTab, setActiveTab] = useState<DashboardTab>(initialTab);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const productsList = user.products || [];
  const licensesList = user.licenses || [];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row w-full selection:bg-white/20">
      {/* Pasek nawigacyjny na telefonach */}
      <DashboardHeaderMobile
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Zwijany sidebar na desktopie i pełny na mobile */}
      <DashboardSidebar
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        productsCount={productsList.length}
        licensesCount={licensesList.length}
      />

      {/* Główna zawartość wybranej zakładki */}
      <main className="flex-1 p-5 md:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
        {activeTab === "products" && (
          <ProductsTab products={productsList} />
        )}

        {activeTab === "licenses" && (
          <LicensesTab licenses={licensesList} />
        )}

        {activeTab === "support" && <SupportTab />}
      </main>
    </div>
  );
}

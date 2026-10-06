"use client";

import { useState, useEffect } from "react";
import {
  User,
  Product,
  License,
  DashboardTab,
} from "./dashboard/types";
import { DashboardHeaderMobile } from "./dashboard/DashboardHeaderMobile";
import { DashboardSidebar } from "./dashboard/DashboardSidebar";
import { OrdersTab } from "./dashboard/OrdersTab";
import { ProductsTab } from "./dashboard/ProductsTab";
import { LicensesTab } from "./dashboard/LicensesTab";
import { NewOrderTab } from "./dashboard/NewOrderTab";
import { SupportTab } from "./dashboard/SupportTab";

// Eksportujemy typy na zewnątrz dla zachowania wstecznej kompatybilności
export type { Order, Product, License, User, DashboardTab } from "./dashboard/types";

interface ClientDashboardProps {
  user: User;
  initialTab?: DashboardTab;
}

export function ClientDashboard({ user, initialTab = "orders" }: ClientDashboardProps) {
  const [activeTab, setActiveTab] = useState<DashboardTab>(initialTab);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  // Lokalne listy dla reaktywnego odświeżania po dodaniu
  const [productsList, setProductsList] = useState<Product[]>(user.products || []);
  const [licensesList, setLicensesList] = useState<License[]>(user.licenses || []);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

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
        totalOrders={user.orders.length}
        productsCount={productsList.length}
        licensesCount={licensesList.length}
      />

      {/* Główna zawartość wybranej zakładki */}
      <main className="flex-1 p-5 md:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
        {activeTab === "orders" && (
          <OrdersTab user={user} setActiveTab={setActiveTab} />
        )}

        {activeTab === "products" && (
          <ProductsTab products={productsList} setProducts={setProductsList} />
        )}

        {activeTab === "licenses" && (
          <LicensesTab
            licenses={licensesList}
            setLicenses={setLicensesList}
            products={productsList}
          />
        )}

        {activeTab === "new_order" && (
          <NewOrderTab setActiveTab={setActiveTab} />
        )}

        {activeTab === "support" && <SupportTab />}
      </main>
    </div>
  );
}

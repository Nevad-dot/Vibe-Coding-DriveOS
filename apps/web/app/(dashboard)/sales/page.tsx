import React from "react";
import SalesHeroHeader from "@/features/sales/components/SalesHeroHeader";
import SalesMetricsGrid from "@/features/sales/components/SalesMetricsGrid";
import SalesTrendChart from "@/features/dashboard/components/SalesTrendChart";
import SalesFunnelPanel from "@/features/sales/components/SalesFunnelPanel";
import TopConsultantsList from "@/features/sales/components/TopConsultantsList";
import HotLeadsList from "@/features/sales/components/HotLeadsList";

export const metadata = {
  title: "DriveOS — Sales Intelligence",
  description: "Sales Intelligence & Pipeline Management — Real-time revenue, conversion, and deals.",
};

export default function SalesPage() {
  return (
    <div className="w-full flex flex-col">
      {/* Top Header Banner: Pure White background with horizontal divider line */}
      <div className="bg-surfaceLight-card border-b border-surfaceLight-border px-6 md:px-8 py-6 md:py-7 w-full">
        <div className="max-w-[1440px] mx-auto">
          <SalesHeroHeader />
        </div>
      </div>

      {/* Main Sales Canvas: Slightly tinted gray background with all cards */}
      <div className="bg-surfaceLight-pearl px-6 md:px-8 py-6 md:py-8 w-full min-h-[calc(100vh-200px)]">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-6">
          {/* 1. KPI Metrics Grid */}
          <SalesMetricsGrid />

          {/* 2. Middle Section: Monthly Sales Chart & Funnel Conversion Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            <div className="lg:col-span-2">
              <SalesTrendChart />
            </div>
            <div className="lg:col-span-1">
              <SalesFunnelPanel />
            </div>
          </div>

          {/* 3. Bottom Section: Top Consultants & Hot Leads */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <TopConsultantsList />
            <HotLeadsList />
          </div>
        </div>
      </div>
    </div>
  );
}

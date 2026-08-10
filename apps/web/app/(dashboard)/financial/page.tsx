import React from "react";
import FinancialHeroHeader from "@/features/financial/components/FinancialHeroHeader";
import FinancialMetricsGrid from "@/features/financial/components/FinancialMetricsGrid";
import RevenueTrendChart from "@/features/financial/components/RevenueTrendChart";
import BrandPerformancePanel from "@/features/financial/components/BrandPerformancePanel";

export const metadata = {
  title: "DriveOS — Financial Dashboard",
  description: "Real-time revenue, gross margin, cash flow working capital, and brand performance leaderboard.",
};

export default function FinancialPage() {
  return (
    <div className="w-full flex flex-col">
      {/* Top Header Banner: Pure White background with horizontal divider line */}
      <div className="bg-surfaceLight-card border-b border-surfaceLight-border px-6 md:px-8 py-6 md:py-7 w-full">
        <div className="max-w-[1440px] mx-auto">
          <FinancialHeroHeader />
        </div>
      </div>

      {/* Main Financial Canvas: Pearl background with metrics grid, revenue trend chart, and brand performance leaderboard */}
      <div className="bg-surfaceLight-pearl px-6 md:px-8 py-6 md:py-8 w-full pb-16">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-6">
          {/* 1. Top Financial KPI Metrics Grid */}
          <FinancialMetricsGrid />

          {/* 2. Middle Section: 12-Month Revenue Trend Chart */}
          <RevenueTrendChart />

          {/* 3. Bottom Section: 6-Brand Performance Leaderboard */}
          <BrandPerformancePanel />
        </div>
      </div>
    </div>
  );
}

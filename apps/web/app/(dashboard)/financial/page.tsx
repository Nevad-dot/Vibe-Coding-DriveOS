"use client";

import React from "react";
import FinancialHeroHeader from "@/features/financial/components/FinancialHeroHeader";
import FinancialMetricsGrid from "@/features/financial/components/FinancialMetricsGrid";
import RevenueTrendChart from "@/features/financial/components/RevenueTrendChart";
import BrandPerformancePanel from "@/features/financial/components/BrandPerformancePanel";

export default function FinancialPage() {
  return (
    <div className="w-full max-w-full flex flex-col min-h-screen">
      {/* Top Header Banner */}
      <div className="bg-surfaceLight-card border-b border-surfaceLight-border px-[20px] md:px-8 py-5 md:py-7 w-full">
        <div className="max-w-[1440px] mx-auto">
          <FinancialHeroHeader />
        </div>
      </div>

      {/* Main Financial Canvas */}
      <div className="bg-surfaceLight-pearl px-[20px] md:px-8 py-5 md:py-8 w-full pb-16">
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

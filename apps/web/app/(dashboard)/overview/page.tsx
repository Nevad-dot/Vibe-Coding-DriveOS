import React from "react";
import HeroGreeting from "@/features/dashboard/components/HeroGreeting";
import MetricsGrid from "@/features/dashboard/components/MetricsGrid";
import SalesTrendChart from "@/features/dashboard/components/SalesTrendChart";
import AiInsightPanel from "@/features/dashboard/components/AiInsightPanel";
import ApprovalsList from "@/features/dashboard/components/ApprovalsList";
import ActivityTimeline from "@/features/dashboard/components/ActivityTimeline";

export const metadata = {
  title: "DriveOS — Overview Dashboard",
  description: "Automotive Intelligence Dashboard — Real-time revenue, inventory, and operations.",
};

export default function OverviewPage() {
  return (
    <div className="w-full flex flex-col">
      {/* Top Header Banner: Pure White background with horizontal divider line */}
      <div className="bg-surfaceLight-card border-b border-surfaceLight-border px-6 md:px-8 py-6 md:py-7 w-full">
        <div className="max-w-[1440px] mx-auto">
          <HeroGreeting />
        </div>
      </div>

      {/* Main Dashboard Content: Slightly tinted gray background with all cards */}
      <div className="bg-surfaceLight-pearl px-6 md:px-8 py-6 md:py-8 w-full min-h-[calc(100vh-200px)]">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-6">
          {/* 1. KPI Metrics Grid */}
          <MetricsGrid />

          {/* 2. Middle Section: Sales Trend Chart & AI Insight Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            <div className="lg:col-span-2">
              <SalesTrendChart />
            </div>
            <div className="lg:col-span-1">
              <AiInsightPanel />
            </div>
          </div>

          {/* 3. Bottom Section: Approvals & Live Feed Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <ApprovalsList />
            <ActivityTimeline />
          </div>
        </div>
      </div>
    </div>
  );
}

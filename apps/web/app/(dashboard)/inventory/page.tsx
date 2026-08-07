import React from "react";
import InventoryHeroHeader from "@/features/inventory/components/InventoryHeroHeader";
import InventoryStatusCards from "@/features/inventory/components/InventoryStatusCards";
import BrandDistributionList from "@/features/inventory/components/BrandDistributionList";
import UrgentInventoryPanel from "@/features/inventory/components/UrgentInventoryPanel";
import InventoryKpiCards from "@/features/inventory/components/InventoryKpiCards";

export const metadata = {
  title: "DriveOS — Inventory Management",
  description: "Vehicle Inventory Management — Real-time stock distribution, branch tracking, and alerts.",
};

export default function InventoryPage() {
  return (
    <div className="w-full flex flex-col">
      {/* Top Header Banner: Pure White background with horizontal divider line */}
      <div className="bg-surfaceLight-card border-b border-surfaceLight-border px-6 md:px-8 py-6 md:py-7 w-full">
        <div className="max-w-[1440px] mx-auto">
          <InventoryHeroHeader />
        </div>
      </div>

      {/* Main Inventory Canvas: Slightly tinted gray background with all cards */}
      <div className="bg-surfaceLight-pearl px-6 md:px-8 py-6 md:py-8 w-full min-h-[calc(100vh-200px)]">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-6">
          {/* 1. Top Status Cards */}
          <InventoryStatusCards />

          {/* 2. Middle Section: Stock Per Brand & Urgent Inventory Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <BrandDistributionList />
            <UrgentInventoryPanel />
          </div>

          {/* 3. Bottom KPI Metrics Grid */}
          <InventoryKpiCards />
        </div>
      </div>
    </div>
  );
}

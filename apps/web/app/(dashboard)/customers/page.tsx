import React from "react";
import CustomersHeroHeader from "@/features/customers/components/CustomersHeroHeader";
import CustomersMetricsGrid from "@/features/customers/components/CustomersMetricsGrid";
import AgeSegmentRevenuePanel from "@/features/customers/components/AgeSegmentRevenuePanel";
import TopCustomersList from "@/features/customers/components/TopCustomersList";

export const metadata = {
  title: "DriveOS — Customer Intelligence",
  description: "Customer Intelligence & Analytics — Real-time active clients, LTV, revenue segment, and top buyers.",
};

export default function CustomersPage() {
  return (
    <div className="w-full flex flex-col">
      {/* Top Header Banner: Pure White background with horizontal divider line */}
      <div className="bg-surfaceLight-card border-b border-surfaceLight-border px-6 md:px-8 py-6 md:py-7 w-full">
        <div className="max-w-[1440px] mx-auto">
          <CustomersHeroHeader />
        </div>
      </div>

      {/* Main Customers Canvas: Slightly tinted gray background with metrics and panels */}
      <div className="bg-surfaceLight-pearl px-6 md:px-8 py-6 md:py-8 w-full min-h-[calc(100vh-200px)]">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-6">
          {/* 1. Top CRM Metrics Grid */}
          <CustomersMetricsGrid />

          {/* 2. Middle Section: Age Segment Revenue Distribution & Top Customers (Equal Height) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <AgeSegmentRevenuePanel />
            <TopCustomersList />
          </div>
        </div>
      </div>
    </div>
  );
}

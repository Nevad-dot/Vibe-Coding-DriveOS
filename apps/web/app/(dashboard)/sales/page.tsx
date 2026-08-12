"use client";

import React, { useState, useEffect } from "react";
import SalesHeroHeader from "@/features/sales/components/SalesHeroHeader";
import SalesMetricsGrid from "@/features/sales/components/SalesMetricsGrid";
import SalesTrendChart from "@/features/dashboard/components/SalesTrendChart";
import SalesFunnelPanel from "@/features/sales/components/SalesFunnelPanel";
import TopConsultantsList from "@/features/sales/components/TopConsultantsList";
import HotLeadsList from "@/features/sales/components/HotLeadsList";
import { salesService, DealRecord } from "@/shared/lib/supabase/salesService";

export default function SalesPage() {
  const [deals, setDeals] = useState<DealRecord[]>([]);

  useEffect(() => {
    salesService.getAll().then((data) => setDeals(data));
  }, []);

  const handleAddDeal = async (data: { customerName: string; vehicleModel: string; dealValue: string; stage: string; consultant: string }) => {
    const created = await salesService.create({
      customerName: data.customerName,
      vehicleModel: data.vehicleModel,
      dealValue: data.dealValue,
      stage: data.stage,
      consultant: data.consultant,
    });
    setDeals((prev) => [created, ...prev]);
  };

  return (
    <div className="w-full max-w-full flex flex-col min-h-screen">
      {/* Top Header Banner */}
      <div className="bg-surfaceLight-card border-b border-surfaceLight-border px-[20px] md:px-8 py-5 md:py-7 w-full">
        <div className="max-w-[1440px] mx-auto">
          <SalesHeroHeader onAddDeal={handleAddDeal} />
        </div>
      </div>

      {/* Main Sales Canvas */}
      <div className="bg-surfaceLight-pearl px-[20px] md:px-8 py-5 md:py-8 w-full min-h-[calc(100vh-200px)]">
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

          {/* 3. Bottom Section: Top Consultants & Persistent Deals Pipeline */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <TopConsultantsList />
            <HotLeadsList deals={deals} />
          </div>
        </div>
      </div>
    </div>
  );
}

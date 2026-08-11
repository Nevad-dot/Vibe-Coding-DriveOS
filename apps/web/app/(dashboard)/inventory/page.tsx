"use client";

import React, { useState, useEffect } from "react";
import InventoryHeroHeader from "@/features/inventory/components/InventoryHeroHeader";
import InventoryStatusCards from "@/features/inventory/components/InventoryStatusCards";
import BrandDistributionList from "@/features/inventory/components/BrandDistributionList";
import UrgentInventoryPanel from "@/features/inventory/components/UrgentInventoryPanel";
import InventoryKpiCards from "@/features/inventory/components/InventoryKpiCards";
import { inventoryService, RestockOrderRecord } from "@/shared/lib/supabase/inventoryService";

export default function InventoryPage() {
  const [restockOrders, setRestockOrders] = useState<RestockOrderRecord[]>([]);

  useEffect(() => {
    inventoryService.getAll().then((data) => setRestockOrders(data));
  }, []);

  const handleAddRestock = async (data: { brand: string; model: string; quantity: number; branch: string; priority: string }) => {
    const created = await inventoryService.create({
      brand: data.brand,
      model: data.model,
      quantity: data.quantity,
      branch: data.branch,
      priority: data.priority,
      status: "Pending Approval",
    });
    setRestockOrders((prev) => [created, ...prev]);
  };

  return (
    <div className="w-full flex flex-col">
      {/* Top Header Banner */}
      <div className="bg-surfaceLight-card border-b border-surfaceLight-border px-6 md:px-8 py-6 md:py-7 w-full">
        <div className="max-w-[1440px] mx-auto">
          <InventoryHeroHeader onAddRestock={handleAddRestock} />
        </div>
      </div>

      {/* Main Inventory Canvas */}
      <div className="bg-surfaceLight-pearl px-6 md:px-8 py-6 md:py-8 w-full min-h-[calc(100vh-200px)]">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-6">
          {/* 1. Top Status Cards */}
          <InventoryStatusCards />

          {/* 2. Middle Section: Stock Per Brand & Persistent Restock Orders Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <BrandDistributionList />
            <UrgentInventoryPanel restockOrders={restockOrders} />
          </div>

          {/* 3. Bottom KPI Metrics Grid */}
          <InventoryKpiCards />
        </div>
      </div>
    </div>
  );
}

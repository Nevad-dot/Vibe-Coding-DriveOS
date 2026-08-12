"use client";

import React, { useState, useEffect } from "react";
import CustomersHeroHeader from "@/features/customers/components/CustomersHeroHeader";
import CustomersMetricsGrid from "@/features/customers/components/CustomersMetricsGrid";
import AgeSegmentRevenuePanel from "@/features/customers/components/AgeSegmentRevenuePanel";
import TopCustomersList from "@/features/customers/components/TopCustomersList";
import CampaignsHistoryPanel, { CampaignItem } from "@/features/customers/components/CampaignsHistoryPanel";
import { campaignsService } from "@/shared/lib/supabase/campaignsService";

export default function CustomersPage() {
  const [campaigns, setCampaigns] = useState<CampaignItem[]>([]);

  useEffect(() => {
    campaignsService.getAll().then((data) => {
      setCampaigns(
        data.map((c) => ({
          id: c.id,
          name: c.name,
          segment: c.segment,
          channel: c.channel,
          subject: c.subject,
          date: c.created_at ? new Date(c.created_at).toLocaleDateString("id-ID") : "Hari ini",
          status: c.status,
        }))
      );
    });
  }, []);

  const handleAddCampaign = async (newCamp: { name: string; segment: string; channel: string; subject: string }) => {
    const createdRecord = await campaignsService.create({
      name: newCamp.name,
      segment: newCamp.segment,
      channel: newCamp.channel,
      subject: newCamp.subject,
      status: "Terkirim",
    });

    const newItem: CampaignItem = {
      id: createdRecord.id,
      name: createdRecord.name,
      segment: createdRecord.segment,
      channel: createdRecord.channel,
      subject: createdRecord.subject,
      date: "Baru saja",
      status: createdRecord.status,
    };
    setCampaigns((prev) => [newItem, ...prev]);
  };

  const handleDeleteCampaign = (id: string) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="w-full max-w-full flex flex-col min-h-screen">
      {/* Top Header Banner */}
      <div className="bg-surfaceLight-card border-b border-surfaceLight-border px-[20px] md:px-8 py-5 md:py-7 w-full">
        <div className="max-w-[1440px] mx-auto">
          <CustomersHeroHeader onAddCampaign={handleAddCampaign} />
        </div>
      </div>

      {/* Main Customers Canvas */}
      <div className="bg-surfaceLight-pearl px-[20px] md:px-8 py-5 md:py-8 w-full min-h-[calc(100vh-200px)]">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-6">
          {/* 1. CRM Metrics Grid */}
          <CustomersMetricsGrid />

          {/* 2. Persistent Campaigns Database Panel */}
          <CampaignsHistoryPanel
            campaigns={campaigns}
            onDeleteCampaign={handleDeleteCampaign}
          />

          {/* 3. Middle Section: Age Segment Revenue Distribution & Top Customers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <AgeSegmentRevenuePanel />
            <TopCustomersList />
          </div>
        </div>
      </div>
    </div>
  );
}

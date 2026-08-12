import React from "react";
import FleetHeroHeader from "@/features/fleet/components/FleetHeroHeader";
import FleetMetricsGrid from "@/features/fleet/components/FleetMetricsGrid";
import LiveDeliveryPanel from "@/features/fleet/components/LiveDeliveryPanel";
import BranchUtilizationPanel from "@/features/fleet/components/BranchUtilizationPanel";
import FleetTablePanel from "@/features/fleet/components/FleetTablePanel";

export const metadata = {
  title: "DriveOS — Fleet Monitoring",
  description: "Fleet Monitoring & Utilization — Real-time active vehicles, live delivery routes, and fleet directory.",
};

export default function FleetPage() {
  return (
    <div className="w-full max-w-full flex flex-col min-h-screen">
      {/* Top Header Banner */}
      <div className="bg-surfaceLight-card border-b border-surfaceLight-border px-[20px] md:px-8 py-5 md:py-7 w-full">
        <div className="max-w-[1440px] mx-auto">
          <FleetHeroHeader />
        </div>
      </div>

      {/* Main Fleet Canvas */}
      <div className="bg-surfaceLight-pearl px-[20px] md:px-8 py-5 md:py-8 w-full pb-16">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-6">
          {/* 1. Top Fleet KPI Metrics Grid */}
          <FleetMetricsGrid />

          {/* 2. Middle Section: Live Delivery & Branch Utilization */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <LiveDeliveryPanel />
            <BranchUtilizationPanel />
          </div>

          {/* 3. Fleet Vehicles Directory & Maintenance Table */}
          <FleetTablePanel />
        </div>
      </div>
    </div>
  );
}

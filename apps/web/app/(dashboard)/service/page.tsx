import React from "react";
import ServiceHeroHeader from "@/features/service/components/ServiceHeroHeader";
import ServiceMetricsGrid from "@/features/service/components/ServiceMetricsGrid";
import LiveStatusPanel from "@/features/service/components/LiveStatusPanel";
import UpcomingSchedulePanel from "@/features/service/components/UpcomingSchedulePanel";

export const metadata = {
  title: "DriveOS — Service Management",
  description: "Real-time service bay utilization, active job status, and upcoming service schedules.",
};

export default function ServicePage() {
  return (
    <div className="w-full flex flex-col">
      {/* Top Header Banner: Pure White background with horizontal divider line */}
      <div className="bg-surfaceLight-card border-b border-surfaceLight-border px-6 md:px-8 py-6 md:py-7 w-full">
        <div className="max-w-[1440px] mx-auto">
          <ServiceHeroHeader />
        </div>
      </div>

      {/* Main Service Canvas: Pearl background with metrics grid and 2-column live status & upcoming schedule panels */}
      <div className="bg-surfaceLight-pearl px-6 md:px-8 py-6 md:py-8 w-full pb-16">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-6">
          {/* 1. Top Service KPI Metrics Grid */}
          <ServiceMetricsGrid />

          {/* 2. Middle Section: Live Status & Upcoming 7 Days Schedule (Equal Height) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <LiveStatusPanel />
            <UpcomingSchedulePanel />
          </div>
        </div>
      </div>
    </div>
  );
}

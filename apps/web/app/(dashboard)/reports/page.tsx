import React from "react";
import ReportsHeroHeader from "@/features/reports/components/ReportsHeroHeader";
import ReportTemplatesGrid from "@/features/reports/components/ReportTemplatesGrid";
import ScheduledReportsPanel from "@/features/reports/components/ScheduledReportsPanel";

export const metadata = {
  title: "DriveOS — Reports Center",
  description: "Automated scheduled reports, template exports, and executive intelligence downloads.",
};

export default function ReportsPage() {
  return (
    <div className="w-full max-w-full flex flex-col min-h-screen">
      {/* Top Header Banner */}
      <div className="bg-surfaceLight-card border-b border-surfaceLight-border px-[20px] md:px-8 py-5 md:py-7 w-full">
        <div className="max-w-[1440px] mx-auto">
          <ReportsHeroHeader />
        </div>
      </div>

      {/* Main Reports Canvas */}
      <div className="bg-surfaceLight-pearl px-[20px] md:px-8 py-5 md:py-8 w-full pb-16">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-6">
          {/* 1. Top Section: 6 Report Template Cards Grid */}
          <ReportTemplatesGrid />

          {/* 2. Bottom Section: Automated Scheduled Reports Panel */}
          <ScheduledReportsPanel />
        </div>
      </div>
    </div>
  );
}

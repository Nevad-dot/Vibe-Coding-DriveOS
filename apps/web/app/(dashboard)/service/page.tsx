"use client";

import React, { useState, useEffect } from "react";
import ServiceHeroHeader from "@/features/service/components/ServiceHeroHeader";
import ServiceMetricsGrid from "@/features/service/components/ServiceMetricsGrid";
import LiveStatusPanel from "@/features/service/components/LiveStatusPanel";
import UpcomingSchedulePanel from "@/features/service/components/UpcomingSchedulePanel";
import { serviceAppointmentsService, ServiceAppointmentRecord } from "@/shared/lib/supabase/serviceAppointmentsService";

export default function ServicePage() {
  const [appointments, setAppointments] = useState<ServiceAppointmentRecord[]>([]);

  useEffect(() => {
    serviceAppointmentsService.getAll().then((data) => setAppointments(data));
  }, []);

  const handleAddService = async (data: { vehicle: string; customer: string; serviceType: string; bay: string; date: string; time: string }) => {
    const created = await serviceAppointmentsService.create({
      vehiclePlate: data.vehicle,
      customerName: data.customer,
      serviceType: data.serviceType,
      bay: data.bay,
      date: data.date || "Hari ini",
      time: data.time || "09:00",
      status: "Scheduled",
    });
    setAppointments((prev) => [created, ...prev]);
  };

  return (
    <div className="w-full max-w-full flex flex-col min-h-screen">
      {/* Top Header Banner */}
      <div className="bg-surfaceLight-card border-b border-surfaceLight-border px-[20px] md:px-8 py-5 md:py-7 w-full">
        <div className="max-w-[1440px] mx-auto">
          <ServiceHeroHeader onAddService={handleAddService} />
        </div>
      </div>

      {/* Main Service Canvas */}
      <div className="bg-surfaceLight-pearl px-[20px] md:px-8 py-5 md:py-8 w-full pb-16">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-6">
          {/* 1. Service KPI Metrics Grid */}
          <ServiceMetricsGrid />

          {/* 2. Middle Section: Live Status & Persistent Upcoming Schedule Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <LiveStatusPanel />
            <UpcomingSchedulePanel appointments={appointments} />
          </div>
        </div>
      </div>
    </div>
  );
}

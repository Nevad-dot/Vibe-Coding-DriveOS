"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Wrench, Phone, Eye } from "lucide-react";
import { ContactDriverModal } from "./ContactDriverModal";
import { VehicleTelematicsModal } from "./VehicleTelematicsModal";
import { ScheduleServiceModal } from "@/features/service/components/ScheduleServiceModal";

const FLEET_UNITS = [
  {
    plate: "B 1088 RFS",
    model: "BMW X7 xDrive40i M Sport",
    branch: "Jakarta Pusat",
    status: "On-Route",
    statusColor: "bg-emerald-500/15 text-emerald-600 border border-emerald-500/30",
    odo: "12.450 km",
    nextService: "15 Okt 2026",
    driver: "Driver Arif",
  },
  {
    plate: "B 2291 TNG",
    model: "Mercedes-Benz S 450 4MATIC",
    branch: "Jakarta Selatan",
    status: "In Service",
    statusColor: "bg-blue-500/15 text-blue-600 border border-blue-500/30",
    odo: "28.900 km",
    nextService: "Hari ini (Servis)",
    driver: "Bengkel Resmi",
  },
  {
    plate: "D 1402 ABD",
    model: "Porsche Cayenne Coupe 2024",
    branch: "Bandung",
    status: "Ready",
    statusColor: "bg-emerald-500/15 text-emerald-600 border border-emerald-500/30",
    odo: "6.120 km",
    nextService: "20 Nov 2026",
    driver: "PIC Doni",
  },
  {
    plate: "L 8812 SB",
    model: "Audi RS e-tron GT 2024",
    branch: "Surabaya",
    status: "On-Route",
    statusColor: "bg-emerald-500/15 text-emerald-600 border border-emerald-500/30",
    odo: "8.340 km",
    nextService: "05 Des 2026",
    driver: "Driver Ilham",
  },
  {
    plate: "DK 9912 AB",
    model: "Ferrari 296 GTB 2024",
    branch: "Bali",
    status: "Standby",
    statusColor: "bg-amber-500/15 text-amber-600 border border-amber-500/30",
    odo: "1.850 km",
    nextService: "10 Jan 2027",
    driver: "Showroom Bali",
  },
];

export const FleetTablePanel: React.FC = () => {
  const [selectedDriverUnit, setSelectedDriverUnit] = useState<typeof FLEET_UNITS[0] | null>(null);
  const [selectedTelematicsUnit, setSelectedTelematicsUnit] = useState<typeof FLEET_UNITS[0] | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 22 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 26, delay: 0.25 }}
        className="bg-surfaceLight-card border border-surfaceLight-border dark:border-[#222F43] p-4 sm:p-6 rounded-2xl flex flex-col shadow-xs min-w-0"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-4 border-b border-surfaceLight-border dark:border-[#222F43] pb-3">
          <div className="min-w-0">
            <span className="text-[10px] sm:text-[11px] font-semibold text-textGray-muted uppercase tracking-[0.08em] block mb-0.5">
              ARMADA KENDARAAN
            </span>
            <h3 className="text-[16px] sm:text-[18px] font-display font-bold text-textGray-display leading-tight break-words">
              Daftar Unit Fleet & Status Servis
            </h3>
          </div>

          <span className="text-[11.5px] font-medium text-textGray-tertiary self-start sm:self-auto shrink-0">
            Showing 5 of 126 active vehicles
          </span>
        </div>

        {/* 1. Mobile Card List View (sm:hidden - Ultra-polished responsive layout) */}
        <div className="flex flex-col gap-3 sm:hidden">
          {FLEET_UNITS.map((unit, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border dark:border-[#222F43] flex flex-col gap-3 shadow-2xs overflow-hidden"
            >
              {/* Top Row: Plate & Status */}
              <div className="flex items-center justify-between gap-2 border-b border-surfaceLight-border dark:border-[#222F43] pb-2.5">
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-textGray-display text-[15px]">
                    {unit.plate}
                  </span>
                  <span className="text-[12px] text-textGray-tertiary font-normal truncate">
                    {unit.model}
                  </span>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap shrink-0 ${unit.statusColor}`}>
                  {unit.status}
                </span>
              </div>

              {/* Sleek 3-Column Info Grid */}
              <div className="grid grid-cols-3 gap-2 text-[12px]">
                <div className="min-w-0">
                  <span className="text-[9.5px] uppercase text-textGray-muted block font-semibold tracking-wider">Cabang</span>
                  <span className="font-bold text-textGray-display truncate block">{unit.branch}</span>
                </div>
                <div className="min-w-0 border-x border-surfaceLight-border dark:border-[#222F43] px-1 text-center">
                  <span className="text-[9.5px] uppercase text-textGray-muted block font-semibold tracking-wider">Odometer</span>
                  <span className="font-bold text-brand truncate block">{unit.odo}</span>
                </div>
                <div className="min-w-0 text-right">
                  <span className="text-[9.5px] uppercase text-textGray-muted block font-semibold tracking-wider">Jadwal Servis</span>
                  <span className="font-medium text-textGray-tertiary truncate block">{unit.nextService}</span>
                </div>
              </div>

              {/* Quick Actions 3-Column Equal Grid - Fits 100% inside card bounds */}
              <div className="grid grid-cols-3 gap-1.5 pt-2.5 border-t border-surfaceLight-border dark:border-[#222F43] w-full">
                <button
                  type="button"
                  onClick={() => setSelectedDriverUnit(unit)}
                  className="py-1.5 px-1 rounded-xl border border-surfaceLight-border dark:border-[#222F43] bg-surfaceLight-card text-textGray-display text-[11px] font-semibold flex items-center justify-center gap-1 shadow-2xs hover:bg-surfaceLight-pearl transition-colors whitespace-nowrap min-w-0"
                >
                  <Phone className="w-3.5 h-3.5 text-[#4B8E55] shrink-0" />
                  <span className="truncate">Driver</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(true)}
                  className="py-1.5 px-1 rounded-xl border border-surfaceLight-border dark:border-[#222F43] bg-surfaceLight-card text-textGray-display text-[11px] font-semibold flex items-center justify-center gap-1 shadow-2xs hover:bg-surfaceLight-pearl transition-colors whitespace-nowrap min-w-0"
                >
                  <Wrench className="w-3.5 h-3.5 text-[#4B8E55] shrink-0" />
                  <span className="truncate">Servis</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedTelematicsUnit(unit)}
                  className="py-1.5 px-1 rounded-xl border border-surfaceLight-border dark:border-[#222F43] bg-surfaceLight-card text-textGray-display text-[11px] font-semibold flex items-center justify-center gap-1 shadow-2xs hover:bg-surfaceLight-pearl transition-colors whitespace-nowrap min-w-0"
                  title="Lihat Detail Telematika"
                >
                  <Eye className="w-3.5 h-3.5 text-[#4B8E55] shrink-0" />
                  <span className="truncate">Detail</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Desktop Table View (hidden sm:block) */}
        <div className="hidden sm:block w-full overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-[13.5px]">
            <thead>
              <tr className="border-b border-surfaceLight-border dark:border-[#222F43] text-[11px] font-semibold text-textGray-muted uppercase tracking-wider">
                <th className="pb-3 font-semibold whitespace-nowrap">Kendaraan & Plat</th>
                <th className="pb-3 font-semibold whitespace-nowrap">Cabang</th>
                <th className="pb-3 font-semibold whitespace-nowrap">Status Operasional</th>
                <th className="pb-3 font-semibold whitespace-nowrap">Odometer</th>
                <th className="pb-3 font-semibold whitespace-nowrap">Jadwal Servis</th>
                <th className="pb-3 font-semibold text-right whitespace-nowrap">Aksi Cepat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surfaceLight-border dark:divide-[#222F43]">
              {FLEET_UNITS.map((unit, idx) => (
                <tr key={idx} className="group hover:bg-surfaceLight-pearl/60 transition-colors">
                  <td className="py-3.5 pr-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-textGray-display leading-snug whitespace-nowrap">
                        {unit.plate}
                      </span>
                      <span className="text-[12px] text-textGray-tertiary font-normal whitespace-nowrap">
                        {unit.model}
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-2 text-textGray-primary font-normal whitespace-nowrap">
                    {unit.branch}
                  </td>

                  <td className="py-3.5 px-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap shrink-0 ${unit.statusColor}`}>
                      {unit.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-2 font-bold text-textGray-display whitespace-nowrap">
                    {unit.odo}
                  </td>

                  <td className="py-3.5 px-2 text-textGray-tertiary font-normal whitespace-nowrap">
                    {unit.nextService}
                  </td>

                  <td className="py-3.5 pl-4 text-right">
                    <div className="flex items-center justify-end gap-1.5 whitespace-nowrap">
                      {/* Phone Icon -> Contact Driver */}
                      <button
                        type="button"
                        onClick={() => setSelectedDriverUnit(unit)}
                        className="p-1.5 rounded-lg border border-surfaceLight-border dark:border-[#222F43] text-textGray-secondary hover:text-[#4B8E55] hover:border-[#4B8E55] hover:bg-surfaceLight-pearl transition-colors cursor-pointer"
                        title="Hubungi Pengemudi"
                      >
                        <Phone className="w-4 h-4" strokeWidth={1.5} />
                      </button>

                      {/* Wrench Icon -> Schedule Maintenance */}
                      <button
                        type="button"
                        onClick={() => setIsServiceModalOpen(true)}
                        className="p-1.5 rounded-lg border border-surfaceLight-border dark:border-[#222F43] text-textGray-secondary hover:text-[#4B8E55] hover:border-[#4B8E55] hover:bg-surfaceLight-pearl transition-colors cursor-pointer"
                        title="Jadwalkan Servis"
                      >
                        <Wrench className="w-4 h-4" strokeWidth={1.5} />
                      </button>

                      {/* Eye Icon -> View Telematics */}
                      <button
                        type="button"
                        onClick={() => setSelectedTelematicsUnit(unit)}
                        className="p-1.5 rounded-lg border border-surfaceLight-border dark:border-[#222F43] text-textGray-secondary hover:text-[#4B8E55] hover:border-[#4B8E55] hover:bg-surfaceLight-pearl transition-colors cursor-pointer"
                        title="Lihat Telematika"
                      >
                        <Eye className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Driver Contact Modal */}
      <ContactDriverModal
        isOpen={selectedDriverUnit !== null}
        onClose={() => setSelectedDriverUnit(null)}
        unit={selectedDriverUnit}
      />

      {/* Telematics Modal */}
      <VehicleTelematicsModal
        isOpen={selectedTelematicsUnit !== null}
        onClose={() => setSelectedTelematicsUnit(null)}
        unit={selectedTelematicsUnit}
      />

      {/* Schedule Service Maintenance Modal */}
      <ScheduleServiceModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
      />
    </>
  );
};

export default FleetTablePanel;

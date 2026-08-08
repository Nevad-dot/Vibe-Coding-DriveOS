"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wrench, Phone, Eye } from "lucide-react";

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
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 22 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 26, delay: 0.25 }}
      className="bg-surfaceLight-card border border-surfaceLight-border p-6 rounded-2xl flex flex-col shadow-xs"
    >
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-medium text-textGray-muted uppercase tracking-[0.08em] block mb-1">
            ARMADA KENDARAAN
          </span>
          <h3 className="text-[18px] font-display font-semibold text-textGray-display">
            Daftar Unit Fleet & Status Servis
          </h3>
        </div>

        <span className="text-[13px] text-textGray-tertiary font-normal">
          Showing 5 of 126 active vehicles
        </span>
      </div>

      {/* Fleet Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[13.5px]">
          <thead>
            <tr className="border-b border-surfaceLight-border text-[11px] font-semibold text-textGray-muted uppercase tracking-wider">
              <th className="pb-3 font-medium">Kendaraan & Plat</th>
              <th className="pb-3 font-medium">Cabang</th>
              <th className="pb-3 font-medium">Status Operasional</th>
              <th className="pb-3 font-medium">Odometer</th>
              <th className="pb-3 font-medium">Jadwal Servis</th>
              <th className="pb-3 font-medium text-right">Aksi Cepat</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surfaceLight-border">
            {FLEET_UNITS.map((unit, idx) => (
              <tr key={idx} className="group hover:bg-surfaceLight-pearl/60 transition-colors">
                <td className="py-3.5 pr-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-textGray-display leading-snug">
                      {unit.plate}
                    </span>
                    <span className="text-[12px] text-textGray-tertiary font-normal">
                      {unit.model}
                    </span>
                  </div>
                </td>

                <td className="py-3.5 px-2 text-textGray-primary font-normal">
                  {unit.branch}
                </td>

                <td className="py-3.5 px-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${unit.statusColor}`}>
                    {unit.status}
                  </span>
                </td>

                <td className="py-3.5 px-2 font-semibold text-textGray-display">
                  {unit.odo}
                </td>

                <td className="py-3.5 px-2 text-textGray-tertiary font-normal">
                  {unit.nextService}
                </td>

                <td className="py-3.5 pl-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button className="p-1.5 rounded-lg border border-surfaceLight-border text-textGray-secondary hover:text-brand hover:border-brand transition-colors" title="Contact Driver">
                      <Phone className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                    <button className="p-1.5 rounded-lg border border-surfaceLight-border text-textGray-secondary hover:text-brand hover:border-brand transition-colors" title="Schedule Maintenance">
                      <Wrench className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                    <button className="p-1.5 rounded-lg border border-surfaceLight-border text-textGray-secondary hover:text-brand hover:border-brand transition-colors" title="View Telematics">
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
  );
};

export default FleetTablePanel;

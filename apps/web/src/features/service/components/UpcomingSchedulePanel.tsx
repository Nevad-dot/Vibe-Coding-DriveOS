"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ServiceAppointmentRecord } from "@/shared/lib/supabase/serviceAppointmentsService";

interface UpcomingSchedulePanelProps {
  appointments?: ServiceAppointmentRecord[];
}

export const UpcomingSchedulePanel: React.FC<UpcomingSchedulePanelProps> = ({ appointments = [] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 22 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 26, delay: 0.18 }}
      className="bg-surfaceLight-card border border-surfaceLight-border dark:border-[#222F43] p-4 sm:p-6 rounded-2xl flex flex-col h-full shadow-xs min-w-0"
    >
      {/* Panel Header */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surfaceLight-border dark:border-[#222F43] pb-3">
        <div className="min-w-0 flex-1">
          <span className="text-[10px] sm:text-[11px] font-semibold text-textGray-muted uppercase tracking-[0.08em] block mb-0.5">
            DATABASE WORKSHOP SCHEDULE
          </span>
          <h3 className="text-[16px] sm:text-[18px] font-display font-bold text-textGray-display leading-tight break-words">
            Jadwal Servis Active ({appointments.length})
          </h3>
        </div>
        <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full whitespace-nowrap shrink-0 self-start sm:self-auto shadow-2xs">
          Live Database
        </span>
      </div>

      {/* Schedule Items List */}
      <div className="flex flex-col divide-y divide-surfaceLight-border dark:divide-[#222F43]">
        <AnimatePresence initial={false}>
          {appointments.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-3 flex items-start justify-between gap-3 first:pt-1 last:pb-0"
            >
              <div className="flex items-start gap-2.5 min-w-0 flex-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                <div className="flex flex-col min-w-0 flex-1">
                  <h4 className="text-[13.5px] sm:text-[14px] font-bold text-textGray-display leading-snug break-words">
                    {item.customerName} · {item.vehiclePlate}
                  </h4>
                  <span className="text-[11.5px] text-textGray-tertiary font-normal leading-normal break-words mt-0.5">
                    {item.bay} · {item.serviceType} ({item.time})
                  </span>
                </div>
              </div>

              <div className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-surfaceLight-pearl border border-surfaceLight-border dark:border-[#222F43] text-textGray-display whitespace-nowrap shrink-0 self-start mt-0.5">
                {item.date || "Scheduled"}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default UpcomingSchedulePanel;

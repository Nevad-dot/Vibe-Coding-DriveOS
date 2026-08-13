"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, CheckCircle2 } from "lucide-react";

export const FinancialHeroHeader: React.FC = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleExportCSV = () => {
    const csvHeader = "Bulan,Cabang,Revenue (Rp),Margin (%),Cash Flow (Rp),Invoice Overdue\n";
    const csvRows = [
      "Mei 2026,Jakarta Pusat,12.800.000.000,19.2%,+4.200.000.000,1",
      "Mei 2026,Jakarta Selatan,14.500.000.000,18.8%,+5.100.000.000,0",
      "Mei 2026,Surabaya,8.400.000.000,17.5%,+2.800.000.000,1",
      "Mei 2026,Bandung,4.200.000.000,16.9%,+1.100.000.000,1",
      "Mei 2026,Bali,2.900.000.000,19.5%,+950.000.000,0",
    ].join("\n");

    const blob = new Blob([csvHeader + csvRows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "DriveOS_Financial_Report_Q3_2026.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage("Laporan Keuangan DriveOS (Q3 2026) berhasil diunduh!");
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 360, damping: 26 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-1"
      >
        {/* Title & Subtitle */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-medium text-textGray-muted uppercase tracking-[0.08em]">
            FINANCIAL DASHBOARD
          </span>

          <h1 className="text-[28px] md:text-[34px] font-display tracking-tight leading-snug">
            <span className="font-semibold text-textGray-display">Rp 42,8 M revenue — </span>
            <span className="font-bold text-green-gradient">margin 18,4%.</span>
          </h1>

          <p className="text-[14px] md:text-[15px] text-textGray-tertiary font-normal">
            Cash flow positif · 6 approval financial menunggu · 3 invoice overdue.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-1 md:pt-0 shrink-0">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={handleExportCSV}
            type="button"
            className="px-6 py-2.5 rounded-full bg-green-gradient-pill text-white font-medium text-[13.5px] inline-flex items-center justify-center gap-2 transition-colors shadow-xs whitespace-nowrap cursor-pointer select-none"
          >
            <Download className="w-4 h-4 shrink-0" strokeWidth={1.5} />
            <span>Export Laporan</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Toast Alert Notification - Centered Dead Center on Screen */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[110] max-w-[92vw] sm:max-w-[420px] bg-surfaceLight-card border border-surfaceLight-border dark:border-[#222F43] shadow-2xl rounded-2xl p-3.5 flex items-center gap-3 text-[13px] sm:text-[13.5px] font-semibold text-textGray-display backdrop-blur-xs"
          >
            <div className="w-8 h-8 rounded-full bg-[#4B8E55]/15 text-[#4B8E55] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" strokeWidth={2} />
            </div>
            <span className="break-words leading-tight">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FinancialHeroHeader;

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Plus, Download, CheckCircle2 } from "lucide-react";
import { NewDealModal } from "./NewDealModal";

export const SalesHeroHeader: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleExportCsv = () => {
    // Generate CSV Content
    const csvRows = [
      ["Deal ID", "Pelanggan", "Model Kendaraan", "Nilai Deal", "Stage", "Sales Consultant"],
      ["DEAL-1092", "PT Anugerah Trans", "Fleet Porsche 911 (5 Unit)", "Rp 18.200.000.000", "SPK Signed", "Rendra Prasetya"],
      ["DEAL-1091", "Bapak Handoko S.", "Porsche Cayenne Turbo GT", "Rp 12.400.000.000", "Hot Lead", "Diva Anindya"],
      ["DEAL-1090", "PT Kirana Logistik", "Fleet BMW M-Series (12 Unit)", "Rp 8.600.000.000", "Test Drive", "Ilham Ramadhan"],
      ["DEAL-1089", "Ibu Amelia W.", "Ferrari 296 GTB", "Rp 9.600.000.000", "Negosiasi", "Nadia Utami"],
      ["DEAL-1088", "Bapak Rizky P.", "BMW M4 Competition (3 Unit)", "Rp 6.800.000.000", "Hot Lead", "Rendra Prasetya"],
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "DriveOS_Sales_Pipeline_Report_2026.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show Toast Feedback
    setToastMessage("Report Sales Pipeline (.CSV) berhasil di-download!");
    setTimeout(() => setToastMessage(null), 3200);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 360, damping: 26 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-1"
      >
        {/* Title & Subtitle Stack */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-medium text-textGray-muted uppercase tracking-[0.08em]">
            SALES INTELLIGENCE
          </span>

          <h1 className="text-[28px] md:text-[34px] font-display tracking-tight leading-snug">
            <span className="font-semibold text-textGray-display">Pipeline yang </span>
            <span className="font-bold text-green-gradient">bergerak.</span>
          </h1>

          <p className="text-[14px] md:text-[15px] text-textGray-tertiary font-normal">
            128 unit closed month-to-date · 214 lead aktif · 38 hot lead siap closing.
          </p>
        </div>

        {/* Action Buttons Stack */}
        <div className="flex items-center gap-3 shrink-0 pt-1 md:pt-0">
          {/* Export CSV Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={handleExportCsv}
            type="button"
            className="px-4 py-2.5 rounded-full border border-surfaceLight-border bg-surfaceLight-card text-textGray-display font-medium text-[13.5px] inline-flex items-center gap-1.5 hover:bg-surfaceLight-pearl transition-colors shadow-xs cursor-pointer select-none"
          >
            <Download className="w-3.5 h-3.5 text-textGray-tertiary" strokeWidth={1.5} />
            <span>Export CSV</span>
            <ChevronRight className="w-4 h-4 text-textGray-tertiary" strokeWidth={1.5} />
          </motion.button>

          {/* New Deal Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={() => setIsModalOpen(true)}
            type="button"
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#33613A] via-[#4B8E55] to-[#6BA374] text-white font-medium text-[13.5px] inline-flex items-center justify-center gap-2 transition-all hover:opacity-95 shadow-sm whitespace-nowrap cursor-pointer select-none"
          >
            <Plus className="w-4 h-4 shrink-0" strokeWidth={1.5} />
            <span>New Deal</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Interactive New Deal Modal */}
      <NewDealModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setToastMessage("Deal baru berhasil ditambahkan ke pipeline!");
          setTimeout(() => setToastMessage(null), 3200);
        }}
      />

      {/* Toast Notification Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-surfaceLight-card border border-surfaceLight-border shadow-xl rounded-2xl px-4 py-3 flex items-center gap-3 text-[13.5px] font-medium text-textGray-display"
          >
            <div className="w-7 h-7 rounded-full bg-[#4B8E55]/15 text-[#4B8E55] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" strokeWidth={1.5} />
            </div>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SalesHeroHeader;

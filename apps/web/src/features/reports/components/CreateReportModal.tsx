"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, FileText, Download, CheckCircle2, ChevronDown, Calendar, FileSpreadsheet } from "lucide-react";

interface CreateReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (reportName: string, format: string) => void;
}

const REPORT_TYPES = [
  "Executive Summary (Ringkasan Direksi)",
  "Sales Performance & Pipeline",
  "Inventory Report & Aging Stok",
  "Fleet Utilization & Operasional",
  "Financial Statement & Cash Flow",
  "Customer Intelligence & Retention",
];

const DATE_RANGES = [
  "Bulan Ini (Agustus 2026)",
  "Kuartal Ini (Q3 2026)",
  "7 Hari Terakhir",
  "Tahun Berjalan (YTD 2026)",
];

export const CreateReportModal: React.FC<CreateReportModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [mounted, setMounted] = useState(false);
  const [reportType, setReportType] = useState(REPORT_TYPES[0]);
  const [dateRange, setDateRange] = useState(DATE_RANGES[0]);
  const [format, setFormat] = useState<"PDF" | "Excel" | "CSV">("CSV");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      // Direct CSV download
      const cleanTitle = reportType.split(" (")[0].replace(/\s+/g, "_");
      const csvHeader = "Laporan,Periode,Tanggal Generate,Status,Total Metric\n";
      const csvRow = `"${reportType}","${dateRange}","${new Date().toLocaleDateString("id-ID")}","Final Confirmed","Rp 42.800.000.000"\n`;

      const blob = new Blob([csvHeader + csvRow], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `DriveOS_${cleanTitle}_2026.${format.toLowerCase()}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsGenerating(false);
      if (onSuccess) {
        onSuccess(reportType.split(" (")[0], format);
      }
      onClose();
    }, 1000);
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Full Screen Dark Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative w-full max-w-[520px] max-h-[90vh] overflow-y-auto bg-surfaceLight-card border border-surfaceLight-border rounded-3xl shadow-2xl z-10 p-6 md:p-8 flex flex-col gap-5"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-brand uppercase tracking-wider block mb-1">
                  DRIVEOS REPORT BUILDER
                </span>
                <h3 className="text-[22px] font-display font-bold text-textGray-display leading-tight">
                  Buat Laporan Baru
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full flex items-center justify-center text-textGray-tertiary hover:text-textGray-display hover:bg-surfaceLight-pearl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleGenerate} className="flex flex-col gap-4">
              {/* Report Type */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium text-textGray-primary flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-[#4B8E55]" />
                  Jenis Laporan <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    className="w-full appearance-none px-3.5 py-2.5 pr-9 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border text-textGray-display text-[13.5px] focus:outline-none focus:border-[#4B8E55] transition-colors cursor-pointer"
                  >
                    {REPORT_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textGray-tertiary pointer-events-none" strokeWidth={1.5} />
                </div>
              </div>

              {/* Date Range */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium text-textGray-primary flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#4B8E55]" />
                  Rentang Waktu
                </label>
                <div className="relative">
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="w-full appearance-none px-3.5 py-2.5 pr-9 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border text-textGray-display text-[13.5px] focus:outline-none focus:border-[#4B8E55] transition-colors cursor-pointer"
                  >
                    {DATE_RANGES.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textGray-tertiary pointer-events-none" strokeWidth={1.5} />
                </div>
              </div>

              {/* Export Format Selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium text-textGray-primary flex items-center gap-1">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-[#4B8E55]" />
                  Format Export
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {(["PDF", "Excel", "CSV"] as const).map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setFormat(fmt)}
                      className={`py-2.5 rounded-xl text-[13px] font-semibold border transition-all cursor-pointer ${
                        format === fmt
                          ? "bg-green-gradient-pill text-white border-transparent shadow-xs"
                          : "bg-surfaceLight-pearl border-surfaceLight-border text-textGray-display hover:border-[#4B8E55]"
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2 border-t border-surfaceLight-border mt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-full border border-surfaceLight-border bg-surfaceLight-card text-textGray-display hover:bg-surfaceLight-pearl text-[13px] font-medium transition-colors cursor-pointer shadow-xs"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="px-6 py-2.5 rounded-full bg-green-gradient-pill text-white text-[13px] font-semibold hover:opacity-95 transition-opacity shadow-sm cursor-pointer inline-flex items-center gap-1.5 select-none"
                >
                  <Download className={`w-4 h-4 ${isGenerating ? "animate-bounce" : ""}`} strokeWidth={1.5} />
                  <span>{isGenerating ? "Memproses..." : "Generate & Unduh"}</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CreateReportModal;

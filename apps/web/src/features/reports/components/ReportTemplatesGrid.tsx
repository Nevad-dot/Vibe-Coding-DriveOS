"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, CheckCircle2 } from "lucide-react";

const REPORT_TEMPLATES = [
  {
    id: "1",
    tag: "BULANAN",
    title: "Executive Summary",
    desc: "Ringkasan bulanan untuk board",
  },
  {
    id: "2",
    tag: "MINGGUAN",
    title: "Sales Performance",
    desc: "Per consultant & per brand",
  },
  {
    id: "3",
    tag: "HARIAN",
    title: "Inventory Report",
    desc: "Stok, aging, turnover",
  },
  {
    id: "4",
    tag: "MINGGUAN",
    title: "Fleet Utilization",
    desc: "Cabang, kendaraan, delivery",
  },
  {
    id: "5",
    tag: "BULANAN",
    title: "Financial Statement",
    desc: "P&L, cash flow, AR/AP",
  },
  {
    id: "6",
    tag: "BULANAN",
    title: "Customer Insights",
    desc: "Segmentasi & retensi",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 360, damping: 26 },
  },
};

export const ReportTemplatesGrid: React.FC = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleDownload = (title: string, format: string) => {
    const cleanTitle = title.replace(/\s+/g, "_");
    const csvHeader = "Nama Laporan,Kategori,Tanggal Download,Status Export\n";
    const csvRow = `"${title}","Automated Export","${new Date().toLocaleDateString("id-ID")}","Final Streamed"\n`;

    const blob = new Blob([csvHeader + csvRow], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `DriveOS_${cleanTitle}_2026.${format.toLowerCase()}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage(`Laporan ${title} (${format}) berhasil diunduh!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {REPORT_TEMPLATES.map((item) => (
          <motion.div
            key={item.id}
            variants={cardVariants}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="bg-surfaceLight-card border border-surfaceLight-border p-6 rounded-2xl flex flex-col justify-between shadow-xs hover:border-brand/40 transition-colors"
          >
            {/* Card Content Top */}
            <div>
              {/* Document Icon Box */}
              <div className="w-8 h-8 rounded-lg bg-surfaceLight-pearl border border-surfaceLight-border flex items-center justify-center text-textGray-secondary mb-4">
                <FileText className="w-4 h-4" strokeWidth={1.5} />
              </div>

              {/* Category Tag */}
              <span className="text-[11px] font-medium text-textGray-muted uppercase tracking-[0.08em] block mb-1">
                {item.tag}
              </span>

              {/* Title */}
              <h3 className="text-[18px] font-display font-semibold text-textGray-display mb-1">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[13px] text-textGray-tertiary font-normal mb-5">
                {item.desc}
              </p>
            </div>

            {/* Export Action Badges */}
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => handleDownload(item.title, "PDF")}
                className="px-3.5 py-1 text-[11.5px] font-medium rounded-full bg-surfaceLight-pearl border border-surfaceLight-border text-textGray-primary hover:text-brand hover:border-brand transition-colors inline-flex items-center gap-1 cursor-pointer select-none"
              >
                <Download className="w-3 h-3 text-brand" strokeWidth={1.5} />
                <span>PDF</span>
              </button>

              <button
                type="button"
                onClick={() => handleDownload(item.title, "Excel")}
                className="px-3.5 py-1 text-[11.5px] font-medium rounded-full bg-surfaceLight-pearl border border-surfaceLight-border text-textGray-primary hover:text-brand hover:border-brand transition-colors cursor-pointer select-none"
              >
                Excel
              </button>

              <button
                type="button"
                onClick={() => handleDownload(item.title, "CSV")}
                className="px-3.5 py-1 text-[11.5px] font-medium rounded-full bg-surfaceLight-pearl border border-surfaceLight-border text-textGray-primary hover:text-brand hover:border-brand transition-colors cursor-pointer select-none"
              >
                CSV
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Toast Alert Notification */}
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

export default ReportTemplatesGrid;

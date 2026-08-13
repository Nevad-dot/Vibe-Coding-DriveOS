"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, CheckCircle2 } from "lucide-react";

interface ReportTemplate {
  id: string;
  title: string;
  tag: string;
  desc: string;
  lastGenerated: string;
}

const REPORT_TEMPLATES: ReportTemplate[] = [
  {
    id: "rep-1",
    title: "Laporan Performa Penjualan Sales",
    tag: "SALES & REVENUE",
    desc: "Rincian SPK, konversi prospect, dan pencapaian target insentif tiap sales consultant.",
    lastGenerated: "Hari ini, 08:30",
  },
  {
    id: "rep-2",
    title: "Laporan Inventaris & Nilai Stok",
    tag: "INVENTORY & LOGISTICS",
    desc: "Evaluasi aging stok unit showroom, histori restock, dan total asset valuation.",
    lastGenerated: "Kemarin, 17:45",
  },
  {
    id: "rep-3",
    title: "Laporan Produktivitas Workshop Servis",
    tag: "AFTER-SALES & SERVICE",
    desc: "Utilisasi bay workshop, rata-rata durasi perbaikan, dan revenue garansi sparepart.",
    lastGenerated: "12 Mei 2026",
  },
  {
    id: "rep-4",
    title: "Laporan Telematika & Utilisasi Armada",
    tag: "FLEET & TELEMATICS",
    desc: "Monitoring jarak tempuh odometer, riwayat status GPS, dan konsumsi BBM armada.",
    lastGenerated: "10 Mei 2026",
  },
  {
    id: "rep-5",
    title: "Laporan Audit Finansial & Invoicing",
    tag: "FINANCIAL & AUDIT",
    desc: "Ringkasan cash flow, margin keuntungan per unit, dan status overdue invoice.",
    lastGenerated: "08 Mei 2026",
  },
  {
    id: "rep-6",
    title: "Laporan Retensi & Kampanye Customer CRM",
    tag: "CRM & MARKETING",
    desc: "Metrik open rate blast WhatsApp, konversi repeat order, dan segmentasi usia pelanggan.",
    lastGenerated: "05 Mei 2026",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 350, damping: 25 },
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
            className="bg-surfaceLight-card border border-surfaceLight-border dark:border-[#222F43] p-6 rounded-2xl flex flex-col justify-between shadow-xs hover:border-brand/40 transition-colors"
          >
            {/* Card Content Top */}
            <div>
              {/* Document Icon Box */}
              <div className="w-8 h-8 rounded-lg bg-surfaceLight-pearl border border-surfaceLight-border dark:border-[#222F43] flex items-center justify-center text-textGray-secondary mb-4">
                <FileText className="w-4 h-4" strokeWidth={1.5} />
              </div>

              {/* Category Tag */}
              <span className="text-[11px] font-medium text-textGray-muted uppercase tracking-[0.08em] block mb-1">
                {item.tag}
              </span>

              {/* Report Title */}
              <h3 className="text-[16.5px] font-display font-semibold text-textGray-display mb-2 leading-snug">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[13px] text-textGray-tertiary font-normal leading-relaxed mb-4">
                {item.desc}
              </p>
            </div>

            {/* Card Footer & Export Action */}
            <div className="pt-4 border-t border-surfaceLight-border dark:border-[#222F43] flex items-center justify-between gap-2">
              <span className="text-[11.5px] text-textGray-muted font-normal truncate">
                Generated: {item.lastGenerated}
              </span>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => handleDownload(item.title, "PDF")}
                  className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-surfaceLight-pearl border border-surfaceLight-border dark:border-[#222F43] text-textGray-display hover:text-brand hover:border-brand transition-colors cursor-pointer select-none"
                >
                  PDF
                </button>

                <button
                  type="button"
                  onClick={() => handleDownload(item.title, "Excel")}
                  className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-surfaceLight-pearl border border-surfaceLight-border dark:border-[#222F43] text-textGray-display hover:text-brand hover:border-brand transition-colors cursor-pointer select-none"
                >
                  Excel
                </button>

                <button
                  type="button"
                  onClick={() => handleDownload(item.title, "CSV")}
                  className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-surfaceLight-pearl border border-surfaceLight-border dark:border-[#222F43] text-textGray-display hover:text-brand hover:border-brand transition-colors cursor-pointer select-none"
                >
                  CSV
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Dead Center Toast Alert Notification */}
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

export default ReportTemplatesGrid;

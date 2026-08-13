"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { ApprovalsReviewModal } from "./ApprovalsReviewModal";
import { approvalsService, ApprovalRecord } from "@/shared/lib/supabase/approvalsService";

const INITIAL_APPROVALS: ApprovalRecord[] = [
  { id: "app-1", title: "Diskon Khusus SPK Porsche GT3 RS", meta: "Pemohon: Rendra · Jakarta Pusat", amount: "Rp 150 Jt", status: "Pending" },
  { id: "app-2", title: "Pengajuan Restock 5 Unit Taycan Turbo S", meta: "Pemohon: Budi · Surabaya Main", amount: "Rp 14,2 M", status: "Pending" },
  { id: "app-3", title: "Klaim Garansi Workshop & Overhaul Mesin", meta: "Pemohon: Servis Divisi · Bandung", amount: "Rp 85 Jt", status: "Pending" },
  { id: "app-4", title: "Insentif Penjualan Q3 Konsultan Top", meta: "Pemohon: HRD & Commercial", amount: "Rp 45 Jt", status: "Pending" },
];

export const ApprovalsList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [approvals, setApprovals] = useState<ApprovalRecord[]>(INITIAL_APPROVALS);
  const [pendingCount, setPendingCount] = useState(4);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    approvalsService.getAll().then((data) => {
      if (data && data.length > 0) {
        setApprovals(data);
        const pending = data.filter((item) => item.status === "Pending").length;
        setPendingCount(pending);
      }
    });
  }, []);

  const handleApproveAllSuccess = async () => {
    await approvalsService.approveAll();
    setPendingCount(0);
    setApprovals((prev) => prev.map((item) => ({ ...item, status: "Approved" as const })));
    setToastMessage("Seluruh pengajuan approval telah berhasil disetujui di database!");
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 22 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 26, delay: 0.15 }}
        className="bg-surfaceLight-card border border-surfaceLight-border dark:border-[#222F43] p-4 sm:p-6 rounded-2xl flex flex-col h-full shadow-xs min-w-0"
      >
        {/* Header & CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-surfaceLight-border dark:border-[#222F43] pb-3">
          <div className="min-w-0 flex-1">
            <span className="text-[10px] sm:text-[11px] font-semibold text-textGray-muted uppercase tracking-[0.08em] block mb-0.5">
              MENUNGGU PERSETUJUAN
            </span>
            <h3 className="text-[16px] sm:text-[18px] font-display font-bold text-textGray-display leading-tight break-words">
              {pendingCount > 0 ? `${pendingCount} approval siap ditinjau` : "Semua approval telah disetujui"}
            </h3>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={() => setIsModalOpen(true)}
            type="button"
            className="bg-green-gradient-pill text-white text-[12px] font-semibold px-3.5 py-1.5 rounded-full transition-all shadow-2xs shrink-0 cursor-pointer select-none whitespace-nowrap self-start sm:self-auto"
          >
            Review semua
          </motion.button>
        </div>

        {/* Approvals Items List */}
        <div className="flex flex-col divide-y divide-surfaceLight-border dark:divide-[#222F43]">
          {approvals.map((item) => (
            <div key={item.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3 first:pt-1 last:pb-0">
              <div className="flex flex-col min-w-0 flex-1">
                <h4 className="text-[13.5px] font-bold text-textGray-display leading-snug break-words">
                  {item.title}
                </h4>
                <span className="text-[11.5px] text-textGray-tertiary font-normal break-words mt-0.5">{item.meta}</span>
              </div>
              <div className="text-[12.5px] font-bold text-brand whitespace-nowrap shrink-0 self-start sm:self-auto">
                {item.amount}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Approvals Review Modal */}
      <ApprovalsReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApproveAllSuccess={handleApproveAllSuccess}
      />

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

export default ApprovalsList;

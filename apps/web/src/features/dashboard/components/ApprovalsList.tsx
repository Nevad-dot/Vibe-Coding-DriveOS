"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { ApprovalsReviewModal } from "./ApprovalsReviewModal";
import { approvalsService, ApprovalRecord } from "@/shared/lib/supabase/approvalsService";

export const ApprovalsList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [approvals, setApprovals] = useState<ApprovalRecord[]>([]);
  const [pendingCount, setPendingCount] = useState(4);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    approvalsService.getAll().then((data) => {
      setApprovals(data);
      const pending = data.filter((item) => item.status === "Pending").length;
      setPendingCount(pending);
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
        transition={{ type: "spring", stiffness: 350, damping: 26, delay: 0.25 }}
        className="bg-surfaceLight-card border border-surfaceLight-border p-6 rounded-2xl flex flex-col h-full shadow-xs"
      >
        {/* Header & CTA */}
        <div className="flex items-center justify-between gap-4 mb-5">
          <div>
            <span className="text-[11px] font-medium text-textGray-muted uppercase tracking-[0.08em] block mb-1">
              MENUNGGU PERSETUJUAN
            </span>
            <h3 className="text-[18px] font-display font-semibold text-textGray-display">
              {pendingCount > 0 ? `${pendingCount} approval siap ditinjau` : "Semua approval telah disetujui"}
            </h3>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={() => setIsModalOpen(true)}
            type="button"
            className="bg-green-gradient-pill text-white text-[13px] font-semibold px-4 py-2 rounded-full transition-all shadow-sm shrink-0 border border-white/20 cursor-pointer select-none"
          >
            Review semua
          </motion.button>
        </div>

        {/* Approvals Items */}
        <div className="flex flex-col divide-y divide-surfaceLight-border">
          {approvals.map((item) => (
            <div key={item.id} className="py-3.5 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
              <div>
                <h4 className="text-[14px] font-semibold text-textGray-display mb-0.5">
                  {item.title}
                </h4>
                <span className="text-[12px] text-textGray-tertiary font-normal">{item.meta}</span>
              </div>
              <div className="text-[14px] font-semibold text-textGray-display shrink-0">
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

export default ApprovalsList;

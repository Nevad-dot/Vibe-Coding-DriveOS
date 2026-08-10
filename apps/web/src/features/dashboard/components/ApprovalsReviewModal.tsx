"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ShieldCheck, Check, ThumbsUp } from "lucide-react";

interface ApprovalsReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApproveAllSuccess?: () => void;
}

const INITIAL_PENDING = [
  { id: "a1", title: "Diskon 8% · Mercedes S-Class 450", requester: "Rendra (Sales)", branch: "Jakarta Pusat", time: "12m lalu", amount: "Rp 2,4 M (Diskon Rp 192 jt)" },
  { id: "a2", title: "Fleet Contract · Kirana Logistik", requester: "Diva (Corporate)", branch: "Corporate HQ", time: "1h lalu", amount: "18 Unit Armada" },
  { id: "a3", title: "Trade-in · BMW X5 2022", requester: "Ilham (Showroom)", branch: "Bandung", time: "2h lalu", amount: "Nilai Tukar Rp 890 jt" },
  { id: "a4", title: "Waive Service Fee · Ferrari 296", requester: "Nadia (Workshop)", branch: "Service Center", time: "3h lalu", amount: "Waive Fee Rp 12 jt" },
  { id: "a5", title: "Kredit Uang Muka 10% · Porsche GT3", requester: "Arif (Sales)", branch: "Jakarta Selatan", time: "4h lalu", amount: "DP Rp 580 jt" },
  { id: "a6", title: "Garansi Perpanjangan 2 Tahun", requester: "Budi (Aftersales)", branch: "Surabaya", time: "5h lalu", amount: "Garansi Rp 45 jt" },
];

export const ApprovalsReviewModal: React.FC<ApprovalsReviewModalProps> = ({
  isOpen,
  onClose,
  onApproveAllSuccess,
}) => {
  const [mounted, setMounted] = useState(false);
  const [items, setItems] = useState(INITIAL_PENDING);
  const [approvedIds, setApprovedIds] = useState<string[]>([]);
  const [allApprovedToast, setAllApprovedToast] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleApproveItem = (id: string) => {
    setApprovedIds((prev) => [...prev, id]);
  };

  const handleApproveAll = () => {
    const allIds = items.map((i) => i.id);
    setApprovedIds(allIds);
    setAllApprovedToast(true);

    setTimeout(() => {
      setAllApprovedToast(false);
      if (onApproveAllSuccess) {
        onApproveAllSuccess();
      }
      onClose();
    }, 1800);
  };

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
            className="relative w-full max-w-[620px] max-h-[90vh] overflow-y-auto bg-surfaceLight-card border border-surfaceLight-border rounded-3xl shadow-2xl z-10 p-6 md:p-8 flex flex-col gap-5"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-brand uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#4B8E55]" />
                  EXECUTIVE APPROVAL CENTER
                </span>
                <h3 className="text-[22px] font-display font-bold text-textGray-display leading-tight">
                  Tinjau Pengajuan Persetujuan
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

            {/* Success State or Approvals List */}
            {allApprovedToast ? (
              <div className="py-10 flex flex-col items-center justify-center text-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#4B8E55]/15 text-[#4B8E55] flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h4 className="text-[18.5px] font-bold text-textGray-display">
                  Semua Pengajuan Berhasil Disetujui!
                </h4>
                <p className="text-[13px] text-textGray-tertiary max-w-[360px]">
                  6 transaksi & pengajuan diskon telah dikonfirmasi dan langsung diteruskan ke sistem transaksi.
                </p>
              </div>
            ) : (
              <>
                {/* List Items */}
                <div className="flex flex-col gap-2.5 max-h-[360px] overflow-y-auto pr-1">
                  {items.map((item) => {
                    const isApproved = approvedIds.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                          isApproved
                            ? "bg-[#4B8E55]/10 border-[#4B8E55]/30 opacity-80"
                            : "bg-surfaceLight-pearl border-surfaceLight-border shadow-2xs"
                        }`}
                      >
                        <div className="flex flex-col gap-0.5 min-w-0">
                          <span className="text-[14px] font-bold text-textGray-display truncate leading-snug">
                            {item.title}
                          </span>
                          <span className="text-[12px] text-textGray-tertiary">
                            {item.requester} · {item.branch} · {item.time}
                          </span>
                          <span className="text-[12.5px] font-semibold text-brand mt-0.5">
                            {item.amount}
                          </span>
                        </div>

                        <div className="shrink-0">
                          {isApproved ? (
                            <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/15 text-emerald-600 text-[12px] font-semibold inline-flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" strokeWidth={2.5} /> Disetujui
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleApproveItem(item.id)}
                              className="px-4 py-1.5 rounded-full bg-surfaceLight-card border border-surfaceLight-border hover:border-[#4B8E55] text-textGray-display text-[12.5px] font-semibold transition-all hover:bg-surfaceLight-pearl cursor-pointer shadow-2xs inline-flex items-center gap-1.5"
                            >
                              <Check className="w-3.5 h-3.5 text-[#4B8E55]" strokeWidth={2} />
                              <span>Setujui</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer Action Buttons */}
                <div className="flex items-center justify-between gap-3 pt-3 border-t border-surfaceLight-border mt-1">
                  <span className="text-[12px] font-medium text-textGray-tertiary">
                    {approvedIds.length} dari {items.length} disetujui
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2.5 rounded-full border border-surfaceLight-border bg-surfaceLight-card text-textGray-display hover:bg-surfaceLight-pearl text-[13px] font-medium transition-colors cursor-pointer shadow-xs"
                    >
                      Tutup
                    </button>

                    <button
                      type="button"
                      onClick={handleApproveAll}
                      className="px-6 py-2.5 rounded-full bg-green-gradient-pill text-white text-[13px] font-semibold hover:opacity-95 transition-opacity shadow-sm cursor-pointer inline-flex items-center gap-1.5 select-none"
                    >
                      <ThumbsUp className="w-4 h-4" strokeWidth={1.5} />
                      <span>Setujui Semua ({items.length})</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ApprovalsReviewModal;

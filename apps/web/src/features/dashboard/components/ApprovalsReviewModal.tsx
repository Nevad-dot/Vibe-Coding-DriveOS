"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ShieldCheck, CheckCircle2, ThumbsUp } from "lucide-react";

interface ApprovalItem {
  id: string;
  title: string;
  applicant: string;
  branch: string;
  amount: string;
  discountNote?: string;
  timeAgo: string;
}

const INITIAL_ITEMS: ApprovalItem[] = [
  {
    id: "app-1",
    title: "Diskon 8% · Mercedes-AMG GT",
    applicant: "Rendra (Sales)",
    branch: "Jakarta Pusat",
    amount: "Rp 2,4 M (Diskon Rp 192 jt)",
    timeAgo: "12m lalu",
  },
  {
    id: "app-2",
    title: "Fleet Contract · Kirana Logistik",
    applicant: "Diva (Corporate)",
    branch: "Corporate HQ",
    amount: "18 Unit Armada",
    timeAgo: "1h lalu",
  },
  {
    id: "app-3",
    title: "Trade-in · BMW X5 2022",
    applicant: "Ilham (Showroom)",
    branch: "Bandung",
    amount: "Nilai Tukar Rp 890 jt",
    timeAgo: "2h lalu",
  },
  {
    id: "app-4",
    title: "Klaim Garansi Engine Overhaul",
    applicant: "Budi (Service)",
    branch: "Surabaya",
    amount: "Rp 85 Jt",
    timeAgo: "3h lalu",
  },
  {
    id: "app-5",
    title: "SPK Diskon Khusus Porsche GT3",
    applicant: "Sinta (Consultant)",
    branch: "Jakarta Selatan",
    amount: "Rp 150 Jt",
    timeAgo: "4h lalu",
  },
  {
    id: "app-6",
    title: "Pengajuan Restock 5 Unit Taycan",
    applicant: "Budi (Procurement)",
    branch: "Surabaya Main",
    amount: "Rp 14,2 M",
    timeAgo: "5h lalu",
  },
];

interface ApprovalsReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApproveAllSuccess?: () => void;
}

export const ApprovalsReviewModal: React.FC<ApprovalsReviewModalProps> = ({
  isOpen,
  onClose,
  onApproveAllSuccess,
}) => {
  const [mounted, setMounted] = useState(false);
  const [items] = useState<ApprovalItem[]>(INITIAL_ITEMS);
  const [approvedIds, setApprovedIds] = useState<string[]>([]);
  const [isApprovingAll, setIsApprovingAll] = useState(false);
  const [allApprovedToast, setAllApprovedToast] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleToggleApprove = (id: string) => {
    if (approvedIds.includes(id)) {
      setApprovedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setApprovedIds((prev) => [...prev, id]);
    }
  };

  const handleApproveAll = () => {
    setIsApprovingAll(true);
    setTimeout(() => {
      setApprovedIds(items.map((i) => i.id));
      setIsApprovingAll(false);
      setAllApprovedToast(true);
      if (onApproveAllSuccess) onApproveAllSuccess();
      setTimeout(() => {
        setAllApprovedToast(false);
        onClose();
      }, 1800);
    }, 600);
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="approvals-review-modal-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Full Screen Dark Backdrop Overlay */}
          <div
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            key="approvals-review-modal-card"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative w-full max-w-[560px] max-h-[85vh] overflow-y-auto bg-surfaceLight-card border border-surfaceLight-border rounded-3xl shadow-2xl z-10 p-5 sm:p-7 flex flex-col gap-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-brand uppercase tracking-wider block mb-0.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#4B8E55]" />
                  EXECUTIVE APPROVAL CENTER
                </span>
                <h3 className="text-[18px] font-display font-semibold text-textGray-display leading-tight">
                  Tinjau Pengajuan Persetujuan
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-textGray-tertiary hover:text-textGray-display hover:bg-surfaceLight-pearl transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Success State or Approvals List */}
            {allApprovedToast ? (
              <div className="py-8 flex flex-col items-center justify-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#4B8E55]/15 text-[#4B8E55] flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <h4 className="text-[17px] font-bold text-textGray-display">
                  Semua Pengajuan Berhasil Disetujui!
                </h4>
                <p className="text-[12.5px] text-textGray-tertiary max-w-[360px]">
                  Seluruh transaksi & pengajuan diskon telah dikonfirmasi dan disinkronkan ke database.
                </p>
              </div>
            ) : (
              <>
                {/* List Items */}
                <div className="flex flex-col gap-2.5 max-h-[340px] overflow-y-auto pr-1">
                  {items.map((item) => {
                    const isApproved = approvedIds.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                          isApproved
                            ? "bg-[#4B8E55]/10 border-[#4B8E55]/30 opacity-80"
                            : "bg-surfaceLight-pearl border-surfaceLight-border shadow-2xs"
                        }`}
                      >
                        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                          <span className="text-[13.5px] font-bold text-textGray-display truncate leading-snug">
                            {item.title}
                          </span>
                          <span className="text-[11.5px] text-textGray-tertiary font-normal truncate">
                            {item.applicant} · {item.branch} · {item.timeAgo}
                          </span>
                          <span className="text-[12px] font-semibold text-brand mt-0.5 truncate">
                            {item.amount}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleToggleApprove(item.id)}
                          className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all shrink-0 cursor-pointer flex items-center gap-1 ${
                            isApproved
                              ? "bg-brand text-white shadow-2xs"
                              : "bg-surfaceLight-card border border-surfaceLight-border text-textGray-display hover:border-brand"
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" strokeWidth={1.5} />
                          <span>{isApproved ? "Disetujui" : "Setujui"}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Footer Action Bar */}
                <div className="pt-4 border-t border-surfaceLight-border flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-[12px] text-textGray-tertiary font-medium">
                    {approvedIds.length} dari {items.length} disetujui
                  </span>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 sm:flex-none px-4 py-2 rounded-full border border-surfaceLight-border text-[13px] font-medium text-textGray-primary hover:bg-surfaceLight-pearl transition-colors cursor-pointer text-center"
                    >
                      Tutup
                    </button>

                    <button
                      type="button"
                      onClick={handleApproveAll}
                      disabled={isApprovingAll}
                      className="flex-1 sm:flex-none px-5 py-2 rounded-full bg-green-gradient-pill text-white text-[13px] font-semibold shadow-sm hover:opacity-95 transition-opacity cursor-pointer inline-flex items-center justify-center gap-2"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>{isApprovingAll ? "Memproses..." : `Setujui Semua (${items.length})`}</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ApprovalsReviewModal;

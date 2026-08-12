"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp } from "lucide-react";

interface VehiclePipelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicleName: string;
  price?: string;
}

const MODEL_PIPELINES: Record<string, { totalValue: string; activeLeads: number; spkCount: number; deals: Array<{ id: string; customer: string; stage: string; value: string; consultant: string }> }> = {
  "Porsche 911 GT3": {
    totalValue: "Rp 17,4 M",
    activeLeads: 24,
    spkCount: 3,
    deals: [
      { id: "d-911-1", customer: "PT Trans Logistik", stage: "Negosiasi SPK", value: "Rp 5,8 M", consultant: "Rendra (Sales)" },
      { id: "d-911-2", customer: "Bpk. Handoko S.", stage: "SPK Signed", value: "Rp 5,8 M", consultant: "Diva (Corporate)" },
      { id: "d-911-3", customer: "Bpk. Kenneth H.", stage: "Test Drive Scheduled", value: "Rp 5,8 M", consultant: "Ilham (Showroom)" },
    ],
  },
  "BMW M5 Competition": {
    totalValue: "Rp 10,2 M",
    activeLeads: 18,
    spkCount: 2,
    deals: [
      { id: "d-m5-1", customer: "Bpk. David Kurniawan", stage: "SPK Diterbitkan", value: "Rp 3,4 M", consultant: "Diva (Corporate)" },
      { id: "d-m5-2", customer: "PT Kirana Logistik", stage: "Negosiasi Fleet", value: "Rp 6,8 M", consultant: "Rendra (Sales)" },
    ],
  },
  "Mercedes-AMG GT": {
    totalValue: "Rp 9,8 M",
    activeLeads: 14,
    spkCount: 2,
    deals: [
      { id: "d-amg-1", customer: "Ibu Sinta Pramudita", stage: "Proposal Sent", value: "Rp 4,9 M", consultant: "Ilham (Showroom)" },
      { id: "d-amg-2", customer: "Bpk. Rizky P.", stage: "SPK Signed", value: "Rp 4,9 M", consultant: "Nadia (Service)" },
    ],
  },
  "Audi RS e-tron GT": {
    totalValue: "Rp 8,2 M",
    activeLeads: 12,
    spkCount: 1,
    deals: [
      { id: "d-audi-1", customer: "PT Astra Logistik", stage: "Test Drive Completed", value: "Rp 4,1 M", consultant: "Rendra (Sales)" },
      { id: "d-audi-2", customer: "Ibu Amelia W.", stage: "Proposal Sent", value: "Rp 4,1 M", consultant: "Diva (Corporate)" },
    ],
  },
  "Ferrari 296 GTB": {
    totalValue: "Rp 19,2 M",
    activeLeads: 29,
    spkCount: 2,
    deals: [
      { id: "d-fer-1", customer: "Bpk. Hendra Wijaya", stage: "Negosiasi SPK", value: "Rp 9,6 M", consultant: "Rendra (Sales)" },
      { id: "d-fer-2", customer: "Ibu Amelia W.", stage: "SPK Signed", value: "Rp 9,6 M", consultant: "Nadia (Service)" },
    ],
  },
  "Tesla Model S Plaid": {
    totalValue: "Rp 8,4 M",
    activeLeads: 16,
    spkCount: 3,
    deals: [
      { id: "d-tes-1", customer: "Bpk. Kenzo T.", stage: "SPK Diterbitkan", value: "Rp 2,8 M", consultant: "Ilham (Showroom)" },
      { id: "d-tes-2", customer: "PT Anugerah Tech", stage: "Test Drive", value: "Rp 5,6 M", consultant: "Diva (Corporate)" },
    ],
  },
};

export const VehiclePipelineModal: React.FC<VehiclePipelineModalProps> = ({
  isOpen,
  onClose,
  vehicleName,
}) => {
  const [mounted, setMounted] = useState(false);

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

  if (!mounted) return null;

  const pipelineInfo = MODEL_PIPELINES[vehicleName] || {
    totalValue: "Rp 12,5 M",
    activeLeads: 15,
    spkCount: 2,
    deals: [
      { id: "d-gen-1", customer: "PT Trans Logistik", stage: "Negosiasi SPK", value: "Rp 6,2 M", consultant: "Rendra (Sales)" },
      { id: "d-gen-2", customer: "Bpk. Handoko S.", stage: "SPK Signed", value: "Rp 6,3 M", consultant: "Diva (Corporate)" },
    ],
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="vehicle-pipeline-modal-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4"
        >
          {/* Full Screen Dark Backdrop Overlay */}
          <div
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            key="vehicle-pipeline-modal-card"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative w-full max-w-[620px] max-h-[88vh] overflow-y-auto bg-surfaceLight-card border border-surfaceLight-border rounded-3xl shadow-2xl z-10 p-5 sm:p-7 flex flex-col gap-5"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 pb-2 border-b border-surfaceLight-border">
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-semibold text-brand uppercase tracking-wider block mb-0.5 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-[#4B8E55]" />
                  PIPELINE & SALES INTELLIGENCE
                </span>
                <h3 className="text-[18px] sm:text-[20px] font-display font-bold text-textGray-display leading-tight truncate">
                  Pipeline {vehicleName}
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

            {/* Metrics Header Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 text-center">
              <div className="bg-surfaceLight-pearl border border-surfaceLight-border p-3 sm:p-3.5 rounded-2xl flex flex-col gap-0.5 items-center justify-center">
                <span className="text-[10px] text-textGray-tertiary font-semibold uppercase tracking-wider">TOTAL PIPELINE</span>
                <span className="text-[15px] sm:text-[16px] font-bold text-brand">{pipelineInfo.totalValue}</span>
              </div>
              <div className="bg-surfaceLight-pearl border border-surfaceLight-border p-3 sm:p-3.5 rounded-2xl flex flex-col gap-0.5 items-center justify-center">
                <span className="text-[10px] text-textGray-tertiary font-semibold uppercase tracking-wider">PROSPEK AKTIF</span>
                <span className="text-[15px] sm:text-[16px] font-bold text-textGray-display">{pipelineInfo.activeLeads} Lead</span>
              </div>
              <div className="bg-surfaceLight-pearl border border-surfaceLight-border p-3 sm:p-3.5 rounded-2xl flex flex-col gap-0.5 items-center justify-center">
                <span className="text-[10px] text-textGray-tertiary font-semibold uppercase tracking-wider">DEAL SPK</span>
                <span className="text-[15px] sm:text-[16px] font-bold text-emerald-600">{pipelineInfo.spkCount} Unit</span>
              </div>
            </div>

            {/* Deals Breakdown List */}
            <div className="flex flex-col gap-2.5">
              <span className="text-[11px] font-semibold text-textGray-muted uppercase tracking-wider block">
                ACTIVE DEALS & PROSPECTS FOR THIS MODEL ({pipelineInfo.deals.length})
              </span>

              <div className="flex flex-col gap-2.5 max-h-[300px] overflow-y-auto pr-1">
                {pipelineInfo.deals.map((deal) => (
                  <div
                    key={deal.id}
                    className="p-3.5 sm:p-4 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 shadow-2xs hover:border-[#4B8E55]/40 transition-all"
                  >
                    <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                      <span className="text-[13.5px] sm:text-[14px] font-bold text-textGray-display leading-snug break-words">
                        {deal.customer}
                      </span>
                      <span className="text-[12px] text-textGray-tertiary font-normal">
                        {deal.stage} · {deal.consultant}
                      </span>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0">
                      <span className="text-[13.5px] font-bold text-textGray-display whitespace-nowrap">
                        {deal.value}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Close Button */}
            <div className="pt-3 border-t border-surfaceLight-border flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-surfaceLight-card border border-surfaceLight-border text-textGray-display hover:bg-surfaceLight-pearl text-[13px] font-semibold transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
              >
                Tutup Pipeline
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default VehiclePipelineModal;

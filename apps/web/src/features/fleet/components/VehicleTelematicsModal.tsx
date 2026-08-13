"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gauge, Battery, Flame, ShieldCheck, Cpu, CheckCircle2 } from "lucide-react";

interface VehicleTelematicsModalProps {
  isOpen: boolean;
  onClose: () => void;
  unit: {
    plate: string;
    model: string;
    odo: string;
    nextService: string;
    status: string;
  } | null;
}

export const VehicleTelematicsModal: React.FC<VehicleTelematicsModalProps> = ({ isOpen, onClose, unit }) => {
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

  if (!mounted || !unit) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="vehicle-telematics-modal-root"
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
            key="vehicle-telematics-modal-card"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative w-full max-w-[540px] max-h-[88vh] overflow-y-auto bg-surfaceLight-card border border-surfaceLight-border dark:border-[#222F43] rounded-3xl shadow-2xl z-10 p-4 sm:p-7 flex flex-col gap-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-surfaceLight-border dark:border-[#222F43]">
              <div className="min-w-0 flex-1">
                <span className="text-[10px] sm:text-[11px] font-semibold text-brand uppercase tracking-wider block mb-0.5 flex items-center gap-1.5 truncate">
                  <Cpu className="w-3.5 h-3.5 text-brand shrink-0" />
                  TELEMATICS DIAGNOSTICS
                </span>
                <h3 className="text-[16px] sm:text-[19px] font-display font-bold text-textGray-display leading-tight truncate">
                  {unit.plate} — {unit.model}
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

            {/* Diagnostic Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 sm:p-3.5 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border dark:border-[#222F43] flex flex-col gap-1">
                <span className="text-[10px] sm:text-[10.5px] font-semibold text-textGray-tertiary uppercase tracking-wide flex items-center gap-1.5 truncate">
                  <Gauge className="w-3.5 h-3.5 text-brand shrink-0" /> ODOMETER SAAT INI
                </span>
                <span className="text-[15px] sm:text-[17px] font-bold text-textGray-display">{unit.odo}</span>
              </div>

              <div className="p-3 sm:p-3.5 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border dark:border-[#222F43] flex flex-col gap-1">
                <span className="text-[10px] sm:text-[10.5px] font-semibold text-textGray-tertiary uppercase tracking-wide flex items-center gap-1.5 truncate">
                  <Battery className="w-3.5 h-3.5 text-brand shrink-0" /> BATERAI / AKI
                </span>
                <span className="text-[15px] sm:text-[17px] font-bold text-brand">98% Optimal</span>
              </div>

              <div className="p-3 sm:p-3.5 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border dark:border-[#222F43] flex flex-col gap-1">
                <span className="text-[10px] sm:text-[10.5px] font-semibold text-textGray-tertiary uppercase tracking-wide flex items-center gap-1.5 truncate">
                  <Flame className="w-3.5 h-3.5 text-brand shrink-0" /> BAHAN BAKAR
                </span>
                <span className="text-[15px] sm:text-[17px] font-bold text-textGray-display">74% (~480km)</span>
              </div>

              <div className="p-3 sm:p-3.5 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border dark:border-[#222F43] flex flex-col gap-1">
                <span className="text-[10px] sm:text-[10.5px] font-semibold text-textGray-tertiary uppercase tracking-wide flex items-center gap-1.5 truncate">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand shrink-0" /> JADWAL SERVIS NEXT
                </span>
                <span className="text-[15px] sm:text-[17px] font-bold text-brand leading-snug break-words">{unit.nextService}</span>
              </div>
            </div>

            {/* Health Checklist */}
            <div className="p-3.5 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border dark:border-[#222F43] flex flex-col gap-2.5">
              <span className="text-[10.5px] font-semibold text-textGray-tertiary uppercase tracking-wider block">
                STATUS KESEHATAN MESIN & BAN
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12.5px] sm:text-[13px]">
                <span className="text-textGray-display font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand shrink-0" strokeWidth={2} />
                  Tekanan Ban: 33 PSI
                </span>
                <span className="text-textGray-display font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand shrink-0" strokeWidth={2} />
                  Kampas Rem: 86% Baik
                </span>
                <span className="text-textGray-display font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand shrink-0" strokeWidth={2} />
                  Oli Mesin: Normal
                </span>
                <span className="text-textGray-display font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand shrink-0" strokeWidth={2} />
                  ECU Diagnostic: OK
                </span>
              </div>
            </div>

            {/* Footer Action */}
            <div className="flex items-center justify-center sm:justify-end pt-2.5 border-t border-surfaceLight-border dark:border-[#222F43] w-full">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-green-gradient-pill text-white text-[13px] font-semibold hover:opacity-95 transition-opacity shadow-sm cursor-pointer select-none whitespace-nowrap text-center"
              >
                Tutup Telematika
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default VehicleTelematicsModal;

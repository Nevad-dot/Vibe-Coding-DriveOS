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

  if (!mounted || !unit) return null;

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
            className="relative w-full max-w-[540px] bg-surfaceLight-card border border-surfaceLight-border rounded-3xl shadow-2xl z-10 p-6 md:p-8 flex flex-col gap-5"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-brand uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-brand" />
                  TELEMATICS DIAGNOSTICS
                </span>
                <h3 className="text-[20px] font-display font-bold text-textGray-display leading-tight">
                  {unit.plate} — {unit.model}
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

            {/* Diagnostic Indicators (Unified Brand Green Tokens) */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border flex flex-col gap-1.5">
                <span className="text-[11px] font-medium text-textGray-tertiary uppercase tracking-wide flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5 text-brand" /> ODOMETER SAAT INI
                </span>
                <span className="text-[19px] font-bold text-textGray-display">{unit.odo}</span>
              </div>

              <div className="p-4 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border flex flex-col gap-1.5">
                <span className="text-[11px] font-medium text-textGray-tertiary uppercase tracking-wide flex items-center gap-1.5">
                  <Battery className="w-3.5 h-3.5 text-brand" /> BATERAI / AKI
                </span>
                <span className="text-[19px] font-bold text-brand">98% Optimal</span>
              </div>

              <div className="p-4 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border flex flex-col gap-1.5">
                <span className="text-[11px] font-medium text-textGray-tertiary uppercase tracking-wide flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-brand" /> BAHAN BAKAR
                </span>
                <span className="text-[19px] font-bold text-textGray-display">74% (~480km)</span>
              </div>

              <div className="p-4 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border flex flex-col gap-1.5">
                <span className="text-[11px] font-medium text-textGray-tertiary uppercase tracking-wide flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand" /> JADWAL SERVIS NEXT
                </span>
                <span className="text-[19px] font-bold text-brand">{unit.nextService}</span>
              </div>
            </div>

            {/* Health Checklist (Unified Icons & Styling) */}
            <div className="p-4 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border flex flex-col gap-3">
              <span className="text-[11px] font-semibold text-textGray-tertiary uppercase tracking-wider block">
                STATUS KESEHATAN MESIN & BAN
              </span>
              <div className="grid grid-cols-2 gap-2.5 text-[13px]">
                <span className="text-textGray-display font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand shrink-0" strokeWidth={2} />
                  Tekanan Ban: 33 PSI
                </span>
                <span className="text-textGray-display font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand shrink-0" strokeWidth={2} />
                  Kampas Rem: 86% Baik
                </span>
                <span className="text-textGray-display font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand shrink-0" strokeWidth={2} />
                  Oli Mesin: Normal
                </span>
                <span className="text-textGray-display font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand shrink-0" strokeWidth={2} />
                  ECU Diagnostic: OK
                </span>
              </div>
            </div>

            {/* Footer Action */}
            <div className="flex items-center justify-end pt-2 border-t border-surfaceLight-border mt-1">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-green-gradient-pill text-white text-[13.5px] font-semibold hover:opacity-95 transition-opacity shadow-sm cursor-pointer select-none whitespace-nowrap"
              >
                Tutup Telematika
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default VehicleTelematicsModal;

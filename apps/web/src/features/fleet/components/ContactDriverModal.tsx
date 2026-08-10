"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, MessageSquare, CheckCircle2, UserCheck, Shield } from "lucide-react";

interface ContactDriverModalProps {
  isOpen: boolean;
  onClose: () => void;
  unit: {
    plate: string;
    model: string;
    driver: string;
    branch: string;
  } | null;
}

export const ContactDriverModal: React.FC<ContactDriverModalProps> = ({ isOpen, onClose, unit }) => {
  const [mounted, setMounted] = useState(false);
  const [isCalling, setIsCalling] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !unit) return null;

  const handleCall = () => {
    setIsCalling(true);
    setTimeout(() => {
      setIsCalling(false);
      onClose();
    }, 2000);
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
            className="relative w-full max-w-[480px] bg-surfaceLight-card border border-surfaceLight-border rounded-3xl shadow-2xl z-10 p-6 md:p-8 flex flex-col gap-5"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-brand uppercase tracking-wider block mb-1">
                  FLEET DRIVER CONTACT
                </span>
                <h3 className="text-[20px] font-display font-bold text-textGray-display leading-tight">
                  Hubungi Pengemudi
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

            {/* Driver Profile Card */}
            <div className="p-4 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#4B8E55]/15 text-[#4B8E55] font-bold text-[18px] flex items-center justify-center shrink-0">
                {unit.driver.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="text-[16px] font-bold text-textGray-display flex items-center gap-1.5">
                  {unit.driver}
                  <UserCheck className="w-4 h-4 text-[#4B8E55]" />
                </span>
                <span className="text-[12.5px] text-textGray-tertiary">
                  Plat: <span className="font-semibold text-textGray-display">{unit.plate}</span> · {unit.model}
                </span>
              </div>
            </div>

            {/* Calling Animation State */}
            {isCalling ? (
              <div className="py-6 flex flex-col items-center justify-center text-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#4B8E55]/15 text-[#4B8E55] flex items-center justify-center animate-bounce">
                  <Phone className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h4 className="text-[17px] font-bold text-textGray-display">
                  Menghubungi {unit.driver}...
                </h4>
                <p className="text-[12.5px] text-textGray-tertiary">
                  Panggilan terenkripsi sedang disambungkan ke nomor +62 812-9842-109X.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border flex flex-col gap-0.5">
                    <span className="text-[11px] text-textGray-tertiary font-medium">LOKASI CABANG</span>
                    <span className="text-[13px] font-semibold text-textGray-display">{unit.branch}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border flex flex-col gap-0.5">
                    <span className="text-[11px] text-textGray-tertiary font-medium">STATUS DRIVER</span>
                    <span className="text-[13px] font-semibold text-emerald-600">On Duty Active</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between gap-3 pt-2 border-t border-surfaceLight-border mt-1">
                  <button
                    type="button"
                    onClick={handleCall}
                    className="flex-1 py-2.5 rounded-full border border-surfaceLight-border bg-surfaceLight-card text-textGray-display hover:bg-surfaceLight-pearl text-[13px] font-medium transition-colors cursor-pointer inline-flex items-center justify-center gap-2 shadow-xs"
                  >
                    <MessageSquare className="w-4 h-4 text-[#4B8E55]" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCall}
                    className="flex-1 py-2.5 rounded-full bg-green-gradient-pill text-white text-[13px] font-semibold hover:opacity-95 transition-opacity shadow-sm cursor-pointer inline-flex items-center justify-center gap-2 select-none"
                  >
                    <Phone className="w-4 h-4" strokeWidth={1.5} />
                    <span>Panggil Panggilan</span>
                  </button>
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

export default ContactDriverModal;

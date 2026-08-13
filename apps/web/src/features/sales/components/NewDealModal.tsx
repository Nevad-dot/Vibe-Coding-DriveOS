"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, CheckCircle2, Sparkles, ChevronDown } from "lucide-react";

interface NewDealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (dealData: any) => void;
}

export const NewDealModal: React.FC<NewDealModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [mounted, setMounted] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [vehicleModel, setVehicleModel] = useState("Porsche 911 GT3 RS");
  const [dealValue, setDealValue] = useState("");
  const [stage, setStage] = useState("Hot Lead");
  const [consultant, setConsultant] = useState("Rendra Prasetya");
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !dealValue) return;

    setIsSubmitted(true);
    setTimeout(() => {
      if (onSuccess) {
        onSuccess({
          customerName,
          vehicleModel,
          dealValue,
          stage,
          consultant,
        });
      }
      setIsSubmitted(false);
      setCustomerName("");
      setDealValue("");
      onClose();
    }, 1200);
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="new-deal-modal-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4"
        >
          {/* Full Screen Backdrop Overlay (Covers Sidebar & Header) */}
          <div
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
          />

          {/* Modal Card Container */}
          <motion.div
            key="new-deal-modal-card"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative w-full max-w-[500px] max-h-[90vh] overflow-y-auto bg-surfaceLight-card border border-surfaceLight-border dark:border-[#222F43] rounded-3xl shadow-2xl p-4 sm:p-7 flex flex-col gap-4 z-10"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-surfaceLight-border dark:border-[#222F43]">
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className="w-8 h-8 rounded-full bg-[#4B8E55]/15 flex items-center justify-center text-[#4B8E55] shrink-0">
                  <Plus className="w-4 h-4" strokeWidth={2} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[16px] sm:text-[18px] font-display font-bold text-textGray-display leading-tight truncate">
                    Tambah Deal Baru
                  </h3>
                  <p className="text-[11.5px] text-textGray-tertiary font-normal truncate">
                    Masukkan rincian prospek penjualan ke pipeline
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-textGray-tertiary hover:text-textGray-display hover:bg-surfaceLight-pearl transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>

            {/* Success State */}
            {isSubmitted ? (
              <div className="py-8 flex flex-col items-center justify-center text-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#4B8E55]/15 text-[#4B8E55] flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h4 className="text-[18px] font-bold text-textGray-display">
                  Deal Berhasil Ditambahkan!
                </h4>
                <p className="text-[13px] text-textGray-tertiary max-w-[320px]">
                  Prospek <span className="font-semibold text-textGray-display">{customerName}</span> telah didaftarkan ke pipeline sales.
                </p>
              </div>
            ) : (
              /* Form Fields - 2 Column Side-by-Side Layout */
              <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                {/* Customer Name */}
                <div className="flex flex-col gap-1 min-w-0">
                  <label className="text-[11.5px] font-semibold text-textGray-primary truncate">
                    Nama Pelanggan / Perusahaan <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Bapak Hendra Wijaya"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border dark:border-[#222F43] text-textGray-display text-[13px] placeholder:text-textGray-tertiary/60 focus:outline-none focus:border-[#4B8E55] transition-colors truncate"
                  />
                </div>

                {/* Vehicle Model & Value */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1 min-w-0">
                    <label className="text-[11.5px] font-semibold text-textGray-primary truncate">
                      Model Kendaraan
                    </label>
                    <div className="relative">
                      <select
                        value={vehicleModel}
                        onChange={(e) => setVehicleModel(e.target.value)}
                        className="w-full appearance-none px-3 py-2 pr-7 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border dark:border-[#222F43] text-textGray-display text-[13px] focus:outline-none focus:border-[#4B8E55] transition-colors cursor-pointer truncate"
                      >
                        <option value="Porsche 911 GT3 RS">Porsche 911 GT3 RS</option>
                        <option value="BMW M4 Competition">BMW M4 Competition</option>
                        <option value="Mercedes-AMG GT">Mercedes-AMG GT</option>
                        <option value="Ferrari 296 GTB">Ferrari 296 GTB</option>
                        <option value="Audi RS6 Avant">Audi RS6 Avant</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-textGray-tertiary pointer-events-none" strokeWidth={1.5} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 min-w-0">
                    <label className="text-[11.5px] font-semibold text-textGray-primary truncate">
                      Nilai Deal (Rp) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: 4.800.000.000"
                      value={dealValue}
                      onChange={(e) => setDealValue(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border dark:border-[#222F43] text-textGray-display text-[13px] placeholder:text-textGray-tertiary/60 focus:outline-none focus:border-[#4B8E55] transition-colors truncate"
                    />
                  </div>
                </div>

                {/* Stage & Consultant */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1 min-w-0">
                    <label className="text-[11.5px] font-semibold text-textGray-primary truncate">
                      Stage Prospek
                    </label>
                    <div className="relative">
                      <select
                        value={stage}
                        onChange={(e) => setStage(e.target.value)}
                        className="w-full appearance-none px-3 py-2 pr-7 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border dark:border-[#222F43] text-textGray-display text-[13px] focus:outline-none focus:border-[#4B8E55] transition-colors cursor-pointer truncate"
                      >
                        <option value="Hot Lead">Hot Lead</option>
                        <option value="Negosiasi">Negosiasi</option>
                        <option value="Test Drive">Test Drive</option>
                        <option value="SPK Signed">SPK Signed</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-textGray-tertiary pointer-events-none" strokeWidth={1.5} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 min-w-0">
                    <label className="text-[11.5px] font-semibold text-textGray-primary truncate">
                      Sales Consultant
                    </label>
                    <div className="relative">
                      <select
                        value={consultant}
                        onChange={(e) => setConsultant(e.target.value)}
                        className="w-full appearance-none px-3 py-2 pr-7 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border dark:border-[#222F43] text-textGray-display text-[13px] focus:outline-none focus:border-[#4B8E55] transition-colors cursor-pointer truncate"
                      >
                        <option value="Rendra Prasetya">Rendra Prasetya</option>
                        <option value="Diva Anindya">Diva Anindya</option>
                        <option value="Ilham Ramadhan">Ilham Ramadhan</option>
                        <option value="Nadia Utami">Nadia Utami</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-textGray-tertiary pointer-events-none" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>

                {/* Action Buttons - Side-by-side on the right */}
                <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-surfaceLight-border dark:border-[#222F43] mt-1">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-full border border-surfaceLight-border dark:border-[#222F43] bg-surfaceLight-card text-textGray-display hover:bg-surfaceLight-pearl text-[12.5px] font-semibold transition-colors cursor-pointer shadow-2xs text-center whitespace-nowrap"
                  >
                    Batal
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-green-gradient-pill text-white text-[12.5px] font-semibold hover:opacity-95 transition-opacity shadow-sm cursor-pointer inline-flex items-center justify-center gap-1.5 select-none whitespace-nowrap"
                  >
                    <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>Buat Deal Baru</span>
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default NewDealModal;

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, CheckCircle2, Sparkles } from "lucide-react";

interface NewDealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (dealData: any) => void;
}

export const NewDealModal: React.FC<NewDealModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [customerName, setCustomerName] = useState("");
  const [vehicleModel, setVehicleModel] = useState("Porsche 911 GT3 RS");
  const [dealValue, setDealValue] = useState("");
  const [stage, setStage] = useState("Hot Lead");
  const [consultant, setConsultant] = useState("Rendra Prasetya");
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative w-full max-w-[500px] bg-surfaceLight-card border border-surfaceLight-border rounded-2xl shadow-xl p-6 overflow-hidden z-10"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-surfaceLight-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#4B8E55]/15 flex items-center justify-center text-[#4B8E55]">
                  <Plus className="w-4 h-4" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-[17px] font-display font-bold text-textGray-display leading-tight">
                    Tambah Deal Baru
                  </h3>
                  <p className="text-[12px] text-textGray-tertiary font-normal">
                    Masukkan rincian prospek penjualan ke pipeline
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-textGray-tertiary hover:text-textGray-display hover:bg-surfaceLight-pearl transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>

            {/* Success State */}
            {isSubmitted ? (
              <div className="py-8 flex flex-col items-center justify-center text-center gap-3">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-14 h-14 rounded-full bg-[#4B8E55]/15 text-[#4B8E55] flex items-center justify-center"
                >
                  <CheckCircle2 className="w-8 h-8" strokeWidth={1.5} />
                </motion.div>
                <h4 className="text-[18px] font-bold text-textGray-display">
                  Deal Berhasil Ditambahkan!
                </h4>
                <p className="text-[13px] text-textGray-tertiary max-w-[320px]">
                  Prospek <span className="font-semibold text-textGray-display">{customerName}</span> telah didaftarkan ke pipeline sales.
                </p>
              </div>
            ) : (
              /* Form Fields */
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Customer Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-medium text-textGray-primary">
                    Nama Pelanggan / Perusahaan <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Bapak Hendra Wijaya"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border text-textGray-display text-[13.5px] placeholder:text-textGray-tertiary/60 focus:outline-none focus:border-[#4B8E55] transition-colors"
                  />
                </div>

                {/* Vehicle Model & Value */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-textGray-primary">
                      Model Kendaraan
                    </label>
                    <select
                      value={vehicleModel}
                      onChange={(e) => setVehicleModel(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border text-textGray-display text-[13.5px] focus:outline-none focus:border-[#4B8E55] transition-colors cursor-pointer"
                    >
                      <option value="Porsche 911 GT3 RS">Porsche 911 GT3 RS</option>
                      <option value="BMW M4 Competition">BMW M4 Competition</option>
                      <option value="Mercedes-AMG GT">Mercedes-AMG GT</option>
                      <option value="Ferrari 296 GTB">Ferrari 296 GTB</option>
                      <option value="Audi RS6 Avant">Audi RS6 Avant</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-textGray-primary">
                      Nilai Deal (Rp) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: 4.800.000.000"
                      value={dealValue}
                      onChange={(e) => setDealValue(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border text-textGray-display text-[13.5px] placeholder:text-textGray-tertiary/60 focus:outline-none focus:border-[#4B8E55] transition-colors"
                    />
                  </div>
                </div>

                {/* Stage & Consultant */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-textGray-primary">
                      Stage Prospek
                    </label>
                    <select
                      value={stage}
                      onChange={(e) => setStage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border text-textGray-display text-[13.5px] focus:outline-none focus:border-[#4B8E55] transition-colors cursor-pointer"
                    >
                      <option value="Hot Lead">Hot Lead</option>
                      <option value="Negosiasi">Negosiasi</option>
                      <option value="Test Drive">Test Drive</option>
                      <option value="SPK Signed">SPK Signed</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-textGray-primary">
                      Sales Consultant
                    </label>
                    <select
                      value={consultant}
                      onChange={(e) => setConsultant(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border text-textGray-display text-[13.5px] focus:outline-none focus:border-[#4B8E55] transition-colors cursor-pointer"
                    >
                      <option value="Rendra Prasetya">Rendra Prasetya</option>
                      <option value="Diva Anindya">Diva Anindya</option>
                      <option value="Ilham Ramadhan">Ilham Ramadhan</option>
                      <option value="Nadia Utami">Nadia Utami</option>
                    </select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-surfaceLight-border mt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl border border-surfaceLight-border text-textGray-secondary hover:text-textGray-display hover:bg-surfaceLight-pearl text-[13px] font-medium transition-colors cursor-pointer"
                  >
                    Batal
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#33613A] via-[#4B8E55] to-[#6BA374] text-white text-[13px] font-semibold hover:opacity-90 transition-opacity shadow-sm cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4" strokeWidth={1.5} />
                    <span>Buat Deal Baru</span>
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NewDealModal;

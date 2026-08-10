"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, CheckCircle2, Sparkles, ChevronDown, Car } from "lucide-react";

interface AddVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (vehicleData: any) => void;
}

export const AddVehicleModal: React.FC<AddVehicleModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [mounted, setMounted] = useState(false);
  const [vehicleName, setVehicleName] = useState("");
  const [brand, setBrand] = useState("Porsche");
  const [price, setPrice] = useState("");
  const [units, setUnits] = useState("3");
  const [branch, setBranch] = useState("Jakarta Pusat");
  const [has360, setHas360] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicleName || !price) return;

    setIsSubmitted(true);
    setTimeout(() => {
      if (onSuccess) {
        onSuccess({
          vehicleName,
          brand,
          price,
          units,
          branch,
          has360,
        });
      }
      setIsSubmitted(false);
      setVehicleName("");
      setPrice("");
      onClose();
    }, 1200);
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Full Screen Backdrop Overlay (Covers Sidebar & Header) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Modal Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative w-full max-w-[500px] bg-surfaceLight-card border border-surfaceLight-border rounded-2xl shadow-2xl p-6 overflow-hidden z-10"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-surfaceLight-border">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#4B8E55]/15 flex items-center justify-center text-[#4B8E55]">
                  <Car className="w-4 h-4" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-[17px] font-display font-bold text-textGray-display leading-tight">
                    Tambah Unit Kendaraan
                  </h3>
                  <p className="text-[12px] text-textGray-tertiary font-normal">
                    Daftarkan model baru ke galeri show-room DriveOS
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
                  Kendaraan Berhasil Ditambahkan!
                </h4>
                <p className="text-[13px] text-textGray-tertiary max-w-[320px]">
                  Unit <span className="font-semibold text-textGray-display">{vehicleName}</span> ({units} unit) telah terdaftar di galeri {branch}.
                </p>
              </div>
            ) : (
              /* Form Fields */
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Vehicle Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-medium text-textGray-primary">
                    Nama Model & Varian <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Porsche Taycan Turbo S"
                    value={vehicleName}
                    onChange={(e) => setVehicleName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border text-textGray-display text-[13.5px] placeholder:text-textGray-tertiary/60 focus:outline-none focus:border-[#4B8E55] transition-colors"
                  />
                </div>

                {/* Brand & Price */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-textGray-primary">
                      Brand Utama
                    </label>
                    <div className="relative">
                      <select
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="w-full appearance-none px-3.5 py-2.5 pr-9 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border text-textGray-display text-[13.5px] focus:outline-none focus:border-[#4B8E55] transition-colors cursor-pointer"
                      >
                        <option value="Porsche">Porsche</option>
                        <option value="BMW">BMW</option>
                        <option value="Mercedes-Benz">Mercedes-Benz</option>
                        <option value="Ferrari">Ferrari</option>
                        <option value="Audi">Audi</option>
                        <option value="Tesla">Tesla</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textGray-tertiary pointer-events-none" strokeWidth={1.5} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-textGray-primary">
                      Harga OTR (Rp) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: 5,4 M"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border text-textGray-display text-[13.5px] placeholder:text-textGray-tertiary/60 focus:outline-none focus:border-[#4B8E55] transition-colors"
                    />
                  </div>
                </div>

                {/* Units Available & Branch */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-textGray-primary">
                      Jumlah Unit Tersedia
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={units}
                      onChange={(e) => setUnits(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border text-textGray-display text-[13.5px] focus:outline-none focus:border-[#4B8E55] transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-textGray-primary">
                      Lokasi Showroom
                    </label>
                    <div className="relative">
                      <select
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        className="w-full appearance-none px-3.5 py-2.5 pr-9 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border text-textGray-display text-[13.5px] focus:outline-none focus:border-[#4B8E55] transition-colors cursor-pointer"
                      >
                        <option value="Jakarta Pusat">Jakarta Pusat</option>
                        <option value="Jakarta Selatan">Jakarta Selatan</option>
                        <option value="Surabaya">Surabaya</option>
                        <option value="Bandung">Bandung</option>
                        <option value="Bali">Bali</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textGray-tertiary pointer-events-none" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>

                {/* Checkbox 360 viewer */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="has360"
                    checked={has360}
                    onChange={(e) => setHas360(e.target.checked)}
                    className="w-4 h-4 rounded text-[#4B8E55] focus:ring-[#4B8E55] cursor-pointer"
                  />
                  <label htmlFor="has360" className="text-[13px] text-textGray-primary cursor-pointer">
                    Aktifkan Fitur 360° Studio Interactive Viewer
                  </label>
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
                    <span>Simpan Unit Baru</span>
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default AddVehicleModal;

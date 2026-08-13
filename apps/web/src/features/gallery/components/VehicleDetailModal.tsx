"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, CheckCircle2, Sparkles, MapPin, Gauge, ShieldCheck, TrendingUp } from "lucide-react";

interface VehicleDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: {
    name: string;
    price: string;
    units: string;
    image: string;
    brand?: string;
  } | null;
}

export const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({ isOpen, onClose, vehicle }) => {
  const [mounted, setMounted] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);

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

  if (!mounted || !vehicle) return null;

  const handleOrderUnit = () => {
    setIsOrdered(true);
    setTimeout(() => {
      setIsOrdered(false);
      onClose();
    }, 1800);
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="vehicle-detail-modal-root"
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
            key="vehicle-detail-modal-card"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative w-full max-w-[540px] max-h-[90vh] overflow-y-auto bg-surfaceLight-card border border-surfaceLight-border rounded-3xl shadow-2xl z-10 p-4 sm:p-7 flex flex-col gap-3.5"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-3 pb-2 border-b border-surfaceLight-border">
              <div className="min-w-0 flex-1">
                <span className="text-[10px] sm:text-[11px] font-semibold text-brand uppercase tracking-wider block mb-0.5">
                  SPESIFIKASI SHOWROOM
                </span>
                <h3 className="text-[17px] sm:text-[20px] font-display font-bold text-textGray-display leading-tight truncate">
                  {vehicle.name}
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

            {/* Vehicle Studio Image */}
            <div className="relative w-full aspect-[16/10] max-h-[210px] rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border overflow-hidden flex items-center justify-center p-2.5">
              <Image
                src={vehicle.image}
                alt={vehicle.name}
                fill
                className="object-contain p-2"
                priority
              />
              <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-surfaceLight-card border border-surfaceLight-border text-[11px] sm:text-[11.5px] font-semibold text-textGray-display shadow-xs z-10 whitespace-nowrap">
                {vehicle.units} Tersedia
              </span>
            </div>

            {/* Success Feedback or Details Stack */}
            {isOrdered ? (
              <div className="py-6 flex flex-col items-center justify-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#4B8E55]/15 text-[#4B8E55] flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <h4 className="text-[17px] font-bold text-textGray-display">
                  Pemesanan Unit Berhasil!
                </h4>
                <p className="text-[12.5px] text-textGray-tertiary max-w-[340px]">
                  Permintaan reservasi unit <span className="font-semibold text-textGray-display">{vehicle.name}</span> ({vehicle.price}) telah dikirim ke tim sales consultant.
                </p>
              </div>
            ) : (
              <>
                {/* Price & Location Metadata Box */}
                <div className="flex items-center justify-between gap-2 p-3 sm:p-4 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border">
                  <div>
                    <span className="text-[10px] text-textGray-tertiary font-semibold block uppercase tracking-wide">HARGA OTR SHOWROOM</span>
                    <span className="text-[18px] sm:text-[22px] font-bold text-brand">{vehicle.price}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-textGray-tertiary font-semibold block uppercase tracking-wide flex items-center justify-end gap-1">
                      <MapPin className="w-3 h-3 text-brand" /> CABANG LOKASI
                    </span>
                    <span className="text-[12.5px] sm:text-[13.5px] font-semibold text-textGray-display">Jakarta Pusat & Selatan</span>
                  </div>
                </div>

                {/* Specs Highlights Compact 3-Column Horizontal Grid */}
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 text-center bg-surfaceLight-pearl border border-surfaceLight-border p-2 sm:p-2.5 rounded-2xl">
                  <div className="flex flex-col gap-0.5 items-center justify-center min-w-0">
                    <div className="flex items-center gap-1 text-textGray-tertiary text-[9px] sm:text-[10px] font-semibold uppercase tracking-wide truncate">
                      <Gauge className="w-3 h-3 text-brand shrink-0" />
                      <span>PERFORMA</span>
                    </div>
                    <span className="text-[12px] sm:text-[13.5px] font-bold text-textGray-display truncate w-full">High Output</span>
                  </div>

                  <div className="flex flex-col gap-0.5 items-center justify-center min-w-0 border-x border-surfaceLight-border px-1">
                    <div className="flex items-center gap-1 text-textGray-tertiary text-[9px] sm:text-[10px] font-semibold uppercase tracking-wide truncate">
                      <ShieldCheck className="w-3 h-3 text-brand shrink-0" />
                      <span>GARANSI</span>
                    </div>
                    <span className="text-[12px] sm:text-[13.5px] font-bold text-textGray-display truncate w-full">3 Thn Resmi</span>
                  </div>

                  <div className="flex flex-col gap-0.5 items-center justify-center min-w-0">
                    <div className="flex items-center gap-1 text-textGray-tertiary text-[9px] sm:text-[10px] font-semibold uppercase tracking-wide truncate">
                      <TrendingUp className="w-3 h-3 text-brand shrink-0" />
                      <span>MINAT LEAD</span>
                    </div>
                    <span className="text-[12px] sm:text-[13.5px] font-bold text-brand truncate w-full">18 Hot Lead</span>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-2 border-t border-surfaceLight-border">
                  <Link
                    href="/sales"
                    onClick={onClose}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-full border border-surfaceLight-border bg-surfaceLight-card text-textGray-display hover:bg-surfaceLight-pearl text-[12.5px] sm:text-[13px] font-semibold transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5 shadow-2xs whitespace-nowrap"
                  >
                    <TrendingUp className="w-4 h-4 text-[#4B8E55] shrink-0" />
                    <span>Lihat Sales Pipeline</span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleOrderUnit}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-green-gradient-pill text-white text-[12.5px] sm:text-[13px] font-semibold hover:opacity-95 transition-opacity shadow-sm cursor-pointer inline-flex items-center justify-center gap-1.5 select-none whitespace-nowrap"
                  >
                    <Sparkles className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                    <span>Pesan Unit Ini</span>
                  </button>
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

export default VehicleDetailModal;

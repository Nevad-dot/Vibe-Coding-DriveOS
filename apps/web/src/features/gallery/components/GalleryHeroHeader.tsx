"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, CheckCircle2 } from "lucide-react";
import { AddVehicleModal } from "./AddVehicleModal";

export const GalleryHeroHeader: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 360, damping: 26 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-1"
      >
        {/* Title & Subtitle */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-medium text-textGray-muted uppercase tracking-[0.08em]">
            PREMIUM VEHICLE GALLERY
          </span>

          <h1 className="text-[28px] md:text-[34px] font-display tracking-tight leading-snug">
            <span className="font-semibold text-textGray-display">Setiap unit, dalam </span>
            <span className="font-bold text-green-gradient">detail penuh.</span>
          </h1>

          <p className="text-[14px] md:text-[15px] text-textGray-tertiary font-normal">
            22 unit unggulan · 360° viewer · siap dipresentasikan ke calon pembeli.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-1 md:pt-0 shrink-0">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={() => setIsModalOpen(true)}
            type="button"
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#33613A] via-[#4B8E55] to-[#6BA374] text-white font-medium text-[13.5px] inline-flex items-center justify-center gap-2 transition-all hover:opacity-95 shadow-sm whitespace-nowrap cursor-pointer select-none"
          >
            <Plus className="w-4 h-4 shrink-0" strokeWidth={1.5} />
            <span>Tambah Kendaraan</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Interactive Add Vehicle Modal */}
      <AddVehicleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={(data) => {
          setToastMessage(`Unit ${data.vehicleName} (${data.price}) berhasil ditambahkan ke galeri!`);
          setTimeout(() => setToastMessage(null), 3500);
        }}
      />

      {/* Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-surfaceLight-card border border-surfaceLight-border shadow-xl rounded-2xl px-4 py-3 flex items-center gap-3 text-[13.5px] font-medium text-textGray-display"
          >
            <div className="w-7 h-7 rounded-full bg-[#4B8E55]/15 text-[#4B8E55] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" strokeWidth={1.5} />
            </div>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryHeroHeader;

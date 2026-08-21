"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, Trash2 } from "lucide-react";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  itemName?: string;
  description?: string;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Konfirmasi Hapus Data",
  itemName = "Item",
  description = "Tindakan ini akan menghapus data dari database DriveOS secara permanen.",
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
            className="relative w-full max-w-[460px] bg-surfaceLight-card dark:bg-[#16181F] border border-surfaceLight-border dark:border-[#222F43] rounded-3xl shadow-2xl z-10 p-6 md:p-7 flex flex-col gap-5"
          >
            {/* Top Warning Badge Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" strokeWidth={1.75} />
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-textGray-tertiary hover:text-textGray-display hover:bg-surfaceLight-pearl dark:hover:bg-[#222F43] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>

            {/* Modal Body Info */}
            <div className="flex flex-col gap-1.5">
              <h3 className="text-[19px] font-display font-bold text-textGray-display leading-tight">
                {title}
              </h3>
              <p className="text-[13.5px] text-textGray-tertiary font-normal leading-relaxed">
                Apakah Anda yakin ingin menghapus <strong className="text-textGray-display font-semibold">&quot;{itemName}&quot;</strong>? {description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-surfaceLight-border dark:border-[#222F43]">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-full border border-surfaceLight-border dark:border-[#222F43] bg-surfaceLight-card dark:bg-[#16181F] text-textGray-display hover:bg-surfaceLight-pearl dark:hover:bg-[#222F43] text-[13px] font-semibold transition-colors cursor-pointer"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-[13px] font-semibold transition-all shadow-sm cursor-pointer inline-flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Ya, Hapus Data</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ConfirmDeleteModal;

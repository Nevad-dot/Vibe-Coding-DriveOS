"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Settings, Bell, Globe, Lock, Moon, Sun, CheckCircle2, Shield } from "lucide-react";

interface UserSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserSettingsModal: React.FC<UserSettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [mounted, setMounted] = useState(false);
  const [currency, setCurrency] = useState("IDR (Rupiah Rp)");
  const [language, setLanguage] = useState("Bahasa Indonesia");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [serviceReminders, setServiceReminders] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

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

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1500);
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

          {/* Settings Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative w-full max-w-[640px] max-h-[92vh] overflow-y-auto bg-surfaceLight-card border border-surfaceLight-border rounded-3xl shadow-2xl z-10 p-6 md:p-8 flex flex-col gap-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-brand uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                  <Settings className="w-3.5 h-3.5 text-[#4B8E55]" />
                  SYSTEM PREFERENCES
                </span>
                <h3 className="text-[22px] font-display font-bold text-textGray-display leading-tight">
                  Pengaturan Sistem & Notifikasi
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

            <form onSubmit={handleSaveSettings} className="flex flex-col gap-6">
              {/* 1. Regional & General Settings */}
              <div className="flex flex-col gap-3">
                <span className="text-[11px] font-semibold text-textGray-muted uppercase tracking-wider block">
                  REGIONAL & FORMAT HARGA
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12.5px] font-medium text-textGray-secondary flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-brand" />
                      Bahasa Sistem
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border text-[13.5px] text-textGray-display focus:outline-none focus:border-[#4B8E55] transition-colors"
                    >
                      <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                      <option value="English (US)">English (US)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12.5px] font-medium text-textGray-secondary flex items-center gap-1.5">
                      <Settings className="w-3.5 h-3.5 text-brand" />
                      Format Mata Uang
                    </label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border text-[13.5px] text-textGray-display focus:outline-none focus:border-[#4B8E55] transition-colors"
                    >
                      <option value="IDR (Rupiah Rp)">IDR (Rupiah Rp)</option>
                      <option value="USD (Dollar $)">USD (Dollar $)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 2. Notification Preferences */}
              <div className="flex flex-col gap-3 pt-4 border-t border-surfaceLight-border">
                <span className="text-[11px] font-semibold text-textGray-muted uppercase tracking-wider block">
                  PREFERENSI NOTIFIKASI LIVE
                </span>

                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border">
                    <div className="flex items-center gap-3">
                      <Bell className="w-4 h-4 text-brand shrink-0" />
                      <div className="flex flex-col">
                        <span className="text-[13.5px] font-bold text-textGray-display">Email Alert Deal & Restock</span>
                        <span className="text-[12px] text-textGray-tertiary">Kirim email otomatis saat ada pengajuan restock baru</span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={emailAlerts}
                      onChange={(e) => setEmailAlerts(e.target.checked)}
                      className="w-4 h-4 accent-[#4B8E55] cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border">
                    <div className="flex items-center gap-3">
                      <Bell className="w-4 h-4 text-brand shrink-0" />
                      <div className="flex flex-col">
                        <span className="text-[13.5px] font-bold text-textGray-display">Push Notification Browser</span>
                        <span className="text-[12px] text-textGray-tertiary">Notifikasi popup saat ada customer lead masuk</span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={pushAlerts}
                      onChange={(e) => setPushAlerts(e.target.checked)}
                      className="w-4 h-4 accent-[#4B8E55] cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Security Settings */}
              <div className="flex flex-col gap-3 pt-4 border-t border-surfaceLight-border">
                <span className="text-[11px] font-semibold text-textGray-muted uppercase tracking-wider block">
                  KEAMANAN & AUTENTIKASI
                </span>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border">
                  <div className="flex items-center gap-3">
                    <Shield className="w-4 h-4 text-brand shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-[13.5px] font-bold text-textGray-display">Two-Factor Authentication (2FA)</span>
                      <span className="text-[12px] text-textGray-tertiary">Amankan akun direksi dengan verifikasi OTP</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={twoFactor}
                    onChange={(e) => setTwoFactor(e.target.checked)}
                    className="w-4 h-4 accent-[#4B8E55] cursor-pointer"
                  />
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-surfaceLight-border">
                <span className="text-[12px] text-textGray-tertiary">
                  DriveOS Version 1.0.0
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-full border border-surfaceLight-border bg-surfaceLight-card text-textGray-display hover:bg-surfaceLight-pearl text-[13px] font-semibold transition-colors cursor-pointer"
                  >
                    Tutup
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-green-gradient-pill text-white text-[13px] font-semibold hover:opacity-95 transition-opacity shadow-sm cursor-pointer inline-flex items-center gap-2"
                  >
                    {isSaved ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Tersimpan!</span>
                      </>
                    ) : (
                      <>
                        <span>Simpan Pengaturan</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default UserSettingsModal;

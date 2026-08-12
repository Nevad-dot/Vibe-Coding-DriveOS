"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Settings,
  Globe,
  Bell,
  Shield,
  Save,
  CheckCircle2,
  Database,
  Sliders,
} from "lucide-react";
import {
  getStoredSettings,
  saveStoredSettings,
  CurrencyType,
  LanguageType,
} from "@/shared/lib/settingsStore";
import { GradientToggleSwitch } from "@/shared/components/GradientToggleSwitch";

interface UserSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserSettingsModal: React.FC<UserSettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [mounted, setMounted] = useState(false);
  const [currency, setCurrency] = useState<CurrencyType>("IDR");
  const [language, setLanguage] = useState<LanguageType>("id");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setMounted(true);
    const current = getStoredSettings();
    setCurrency(current.currency);
    setLanguage(current.language);
    setEmailAlerts(current.emailAlerts);
    setPushAlerts(current.pushAlerts);
    setTwoFactor(current.twoFactor);
  }, []);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredSettings({
      currency,
      language,
      emailAlerts,
      pushAlerts,
      twoFactor,
    });
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1800);
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="user-settings-modal-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Full Screen Dark Backdrop Overlay */}
          <div
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
          />

          {/* Settings Modal Container */}
          <motion.div
            key="user-settings-modal-card"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative w-full max-w-[620px] bg-surfaceLight-card border border-surfaceLight-border rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh]"
          >
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-surfaceLight-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand/15 text-brand flex items-center justify-center">
                  <Settings className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-[17px] font-display font-bold text-textGray-display leading-tight">
                    Pengaturan Sistem
                  </h3>
                  <span className="text-[12px] text-textGray-tertiary font-normal">
                    Konfigurasi preferensi tampilan & notifikasi DriveOS
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full text-textGray-tertiary hover:text-textGray-display hover:bg-surfaceLight-pearl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Settings Form */}
            <form onSubmit={handleSaveSettings} className="p-6 flex flex-col gap-6 overflow-y-auto">
              {/* 1. Regional & Currency Formats */}
              <div className="flex flex-col gap-3">
                <span className="text-[11px] font-semibold text-textGray-muted uppercase tracking-wider block">
                  REGIONAL & TAMPILAN
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12.5px] font-medium text-textGray-secondary flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-brand" />
                      Bahasa Sistem
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value as LanguageType)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border text-[13.5px] text-textGray-display focus:outline-none focus:border-[#4B8E55] transition-colors"
                    >
                      <option value="id">Bahasa Indonesia</option>
                      <option value="en">English (US)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12.5px] font-medium text-textGray-secondary flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-brand" />
                      Format Mata Uang Live
                    </label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value as CurrencyType)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border text-[13.5px] text-textGray-display focus:outline-none focus:border-[#4B8E55] transition-colors font-semibold"
                    >
                      <option value="IDR">IDR (Rupiah Rp)</option>
                      <option value="USD">USD (Dollar $)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 2. Notifications & Security Toggles */}
              <div className="flex flex-col gap-3">
                <span className="text-[11px] font-semibold text-textGray-muted uppercase tracking-wider block">
                  NOTIFIKASI & KEAMANAN
                </span>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border">
                    <div className="flex items-center gap-3">
                      <Bell className="w-4 h-4 text-brand shrink-0" />
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-textGray-display">Email Alert Transaction</span>
                        <span className="text-[11.5px] text-textGray-tertiary">Pemberitahuan email saat ada SPK baru</span>
                      </div>
                    </div>
                    <GradientToggleSwitch
                      checked={emailAlerts}
                      onChange={setEmailAlerts}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border">
                    <div className="flex items-center gap-3">
                      <Bell className="w-4 h-4 text-brand shrink-0" />
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-textGray-display">Push Notification Browser</span>
                        <span className="text-[11.5px] text-textGray-tertiary">Notifikasi browser prospek lead</span>
                      </div>
                    </div>
                    <GradientToggleSwitch
                      checked={pushAlerts}
                      onChange={setPushAlerts}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border">
                    <div className="flex items-center gap-3">
                      <Shield className="w-4 h-4 text-brand shrink-0" />
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-textGray-display">Two-Factor Authentication</span>
                        <span className="text-[11.5px] text-textGray-tertiary">Autentikasi dua faktor akses direksi</span>
                      </div>
                    </div>
                    <GradientToggleSwitch
                      checked={twoFactor}
                      onChange={setTwoFactor}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border">
                    <div className="flex items-center gap-3">
                      <Database className="w-4 h-4 text-[#4B8E55] shrink-0" />
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-textGray-display">Database Status</span>
                        <span className="text-[11.5px] text-emerald-600 font-medium">Supabase PostgreSQL Active</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                      Connected
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-surfaceLight-border flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-full border border-surfaceLight-border text-[13px] font-medium text-textGray-primary hover:bg-surfaceLight-pearl transition-colors cursor-pointer"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-green-gradient-pill text-white text-[13px] font-semibold hover:opacity-95 transition-opacity shadow-sm cursor-pointer inline-flex items-center gap-2"
                >
                  {isSaved ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Pengaturan Disimpan!</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Simpan Pengaturan</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default UserSettingsModal;

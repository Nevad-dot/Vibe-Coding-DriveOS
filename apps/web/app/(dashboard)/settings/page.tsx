"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
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

export default function SettingsPage() {
  const [currency, setCurrency] = useState<CurrencyType>("IDR");
  const [language, setLanguage] = useState<LanguageType>("id");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
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
    }, 2500);
  };

  return (
    <div className="w-full max-w-full flex flex-col min-h-screen">
      {/* Top Header Banner */}
      <div className="bg-surfaceLight-card border-b border-surfaceLight-border px-[20px] md:px-8 py-5 md:py-7 w-full">
        <div className="max-w-[1440px] mx-auto">
          <span className="text-[11px] font-semibold text-brand uppercase tracking-wider block mb-1 flex items-center gap-1.5">
            <Settings className="w-3.5 h-3.5 text-[#4B8E55]" />
            SYSTEM & DASHBOARD PREFERENCES
          </span>
          <h1 className="text-[24px] sm:text-[28px] md:text-[32px] font-display font-bold text-textGray-display leading-tight">
            Pengaturan Sistem
          </h1>
          <p className="text-[13px] sm:text-[14px] text-textGray-tertiary font-normal mt-1">
            Konfigurasi preferensi regional, notifikasi live, dan integrasi keamanan DriveOS.
          </p>
        </div>
      </div>

      {/* Main Content Canvas */}
      <div className="bg-surfaceLight-pearl px-[20px] md:px-8 py-5 md:py-8 w-full min-h-[calc(100vh-200px)]">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-6 md:gap-8">
          <form onSubmit={handleSaveSettings} className="flex flex-col gap-6">
            {/* 1. Regional & General Settings */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 26 }}
              className="bg-surfaceLight-card border border-surfaceLight-border p-5 md:p-8 rounded-3xl shadow-xs flex flex-col gap-5 sm:gap-6"
            >
              <div className="flex items-center gap-2 pb-3 border-b border-surfaceLight-border">
                <Globe className="w-5 h-5 text-brand shrink-0" />
                <h2 className="text-[16px] sm:text-[18px] font-display font-semibold text-textGray-display leading-tight">
                  Regional & Format Tampilan Dashboard
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-medium text-textGray-secondary flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-brand" />
                    Bahasa Sistem
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as LanguageType)}
                    className="w-full px-4 py-3 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border text-[14px] text-textGray-display focus:outline-none focus:border-[#4B8E55] transition-colors"
                  >
                    <option value="id">Bahasa Indonesia</option>
                    <option value="en">English (US)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-medium text-textGray-secondary flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-brand" />
                    Format Mata Uang Live
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as CurrencyType)}
                    className="w-full px-4 py-3 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border text-[14px] text-textGray-display focus:outline-none focus:border-[#4B8E55] transition-colors font-semibold"
                  >
                    <option value="IDR">IDR (Rupiah Rp)</option>
                    <option value="USD">USD (Dollar $)</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* 2. Live Notification Preferences */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 26, delay: 0.05 }}
              className="bg-surfaceLight-card border border-surfaceLight-border p-5 md:p-8 rounded-3xl shadow-xs flex flex-col gap-5 sm:gap-6"
            >
              <div className="flex items-center gap-2 pb-3 border-b border-surfaceLight-border">
                <Bell className="w-5 h-5 text-brand shrink-0" />
                <h2 className="text-[16px] sm:text-[18px] font-display font-semibold text-textGray-display leading-tight">
                  Preferensi Notifikasi Real-Time
                </h2>
              </div>

              <div className="flex flex-col gap-3.5 sm:gap-4">
                {/* Custom Gradient Toggle Switch 1 */}
                <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border gap-3">
                  <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                    <Bell className="w-5 h-5 text-brand shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[13.5px] sm:text-[14px] font-bold text-textGray-display truncate">Email Alert Transaction & Restock</span>
                      <span className="text-[11.5px] sm:text-[12.5px] text-textGray-tertiary line-clamp-2">Kirim pemberitahuan email otomatis saat ada pengajuan SPK atau restock baru</span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <GradientToggleSwitch
                      checked={emailAlerts}
                      onChange={setEmailAlerts}
                    />
                  </div>
                </div>

                {/* Custom Gradient Toggle Switch 2 */}
                <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border gap-3">
                  <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                    <Bell className="w-5 h-5 text-brand shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[13.5px] sm:text-[14px] font-bold text-textGray-display truncate">Push Notification Browser</span>
                      <span className="text-[11.5px] sm:text-[12.5px] text-textGray-tertiary line-clamp-2">Notifikasi popup langsung di browser saat ada prospek lead masuk</span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <GradientToggleSwitch
                      checked={pushAlerts}
                      onChange={setPushAlerts}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 3. Security & Database Connection Status */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 26, delay: 0.1 }}
              className="bg-surfaceLight-card border border-surfaceLight-border p-5 md:p-8 rounded-3xl shadow-xs flex flex-col gap-5 sm:gap-6"
            >
              <div className="flex items-center gap-2 pb-3 border-b border-surfaceLight-border">
                <Shield className="w-5 h-5 text-brand shrink-0" />
                <h2 className="text-[16px] sm:text-[18px] font-display font-semibold text-textGray-display leading-tight">
                  Keamanan & Status Database
                </h2>
              </div>

              <div className="flex flex-col gap-3.5 sm:gap-4">
                {/* Custom Gradient Toggle Switch 3 */}
                <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border gap-3">
                  <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                    <Shield className="w-5 h-5 text-brand shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[13.5px] sm:text-[14px] font-bold text-textGray-display truncate">Two-Factor Authentication (2FA)</span>
                      <span className="text-[11.5px] sm:text-[12.5px] text-textGray-tertiary line-clamp-2">Mewajibkan autentikasi dua faktor untuk akses data direksi</span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <GradientToggleSwitch
                      checked={twoFactor}
                      onChange={setTwoFactor}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border gap-3">
                  <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                    <Database className="w-5 h-5 text-[#4B8E55] shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[13.5px] sm:text-[14px] font-bold text-textGray-display truncate">Database Persistence Status</span>
                      <span className="text-[11.5px] sm:text-[12.5px] text-emerald-600 font-medium truncate">Supabase PostgreSQL + Local Storage Active</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] sm:text-[11.5px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 shrink-0">
                    Connected
                  </span>
                </div>
              </div>

              {/* Action Submit Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-surfaceLight-border mt-2">
                <span className="text-[12px] sm:text-[12.5px] text-textGray-tertiary font-normal text-center sm:text-left">
                  Semua pengaturan disimpan dan terhubung langsung ke dashboard.
                </span>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 rounded-full bg-green-gradient-pill text-white text-[13.5px] font-semibold hover:opacity-95 transition-opacity shadow-sm cursor-pointer inline-flex items-center justify-center gap-2 shrink-0"
                >
                  {isSaved ? (
                    <>
                      <CheckCircle2 className="w-4.5 h-4.5" />
                      <span>Pengaturan Disimpan!</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4.5 h-4.5" />
                      <span>Simpan Pengaturan</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </form>
        </div>
      </div>
    </div>
  );
}

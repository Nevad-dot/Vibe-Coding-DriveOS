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
  Check,
} from "lucide-react";
import {
  getStoredSettings,
  saveStoredSettings,
  CurrencyType,
  LanguageType,
} from "@/shared/lib/settingsStore";

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
    <div className="w-full flex flex-col min-h-screen">
      {/* Consistent Top Header Banner */}
      <div className="bg-surfaceLight-card border-b border-surfaceLight-border px-6 md:px-8 py-6 md:py-7 w-full">
        <div className="max-w-[1440px] mx-auto">
          <span className="text-[11px] font-semibold text-brand uppercase tracking-wider block mb-1 flex items-center gap-1.5">
            <Settings className="w-3.5 h-3.5 text-[#4B8E55]" />
            SYSTEM & DASHBOARD PREFERENCES
          </span>
          <h1 className="text-[28px] md:text-[32px] font-display font-bold text-textGray-display leading-tight">
            Pengaturan Sistem
          </h1>
          <p className="text-[14px] text-textGray-tertiary font-normal mt-1">
            Konfigurasi preferensi regional, notifikasi live, dan integrasi keamanan DriveOS.
          </p>
        </div>
      </div>

      {/* Main Content Canvas */}
      <div className="bg-surfaceLight-pearl px-6 md:px-8 py-6 md:py-8 w-full min-h-[calc(100vh-200px)]">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-8">
          <form onSubmit={handleSaveSettings} className="flex flex-col gap-6">
            {/* 1. Regional & General Settings */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 26 }}
              className="bg-surfaceLight-card border border-surfaceLight-border p-6 md:p-8 rounded-3xl shadow-xs flex flex-col gap-6"
            >
              <div className="flex items-center gap-2 pb-3 border-b border-surfaceLight-border">
                <Globe className="w-5 h-5 text-brand" />
                <h2 className="text-[18px] font-display font-semibold text-textGray-display">
                  Regional & Format Tampilan Dashboard
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
              className="bg-surfaceLight-card border border-surfaceLight-border p-6 md:p-8 rounded-3xl shadow-xs flex flex-col gap-6"
            >
              <div className="flex items-center gap-2 pb-3 border-b border-surfaceLight-border">
                <Bell className="w-5 h-5 text-brand" />
                <h2 className="text-[18px] font-display font-semibold text-textGray-display">
                  Preferensi Notifikasi Real-Time
                </h2>
              </div>

              <div className="flex flex-col gap-4">
                {/* Custom Gradient Toggle Switch 1 */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border">
                  <div className="flex items-center gap-3.5">
                    <Bell className="w-5 h-5 text-brand shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-textGray-display">Email Alert Transaction & Restock</span>
                      <span className="text-[12.5px] text-textGray-tertiary">Kirim pemberitahuan email otomatis saat ada pengajuan SPK atau restock baru</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setEmailAlerts(!emailAlerts)}
                    className={`relative w-12 h-6.5 rounded-full transition-all duration-300 p-0.5 cursor-pointer shadow-2xs shrink-0 ${
                      emailAlerts ? "bg-green-gradient-pill" : "bg-surfaceLight-card border border-surfaceLight-border"
                    }`}
                  >
                    <motion.div
                      animate={{ x: emailAlerts ? 22 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="w-5 h-5 rounded-full bg-white shadow-xs flex items-center justify-center text-[10px] font-bold"
                    >
                      {emailAlerts && <Check className="w-3 h-3 text-[#4B8E55]" strokeWidth={3} />}
                    </motion.div>
                  </button>
                </div>

                {/* Custom Gradient Toggle Switch 2 */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border">
                  <div className="flex items-center gap-3.5">
                    <Bell className="w-5 h-5 text-brand shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-textGray-display">Push Notification Browser</span>
                      <span className="text-[12.5px] text-textGray-tertiary">Notifikasi popup langsung di browser saat ada prospek lead masuk</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setPushAlerts(!pushAlerts)}
                    className={`relative w-12 h-6.5 rounded-full transition-all duration-300 p-0.5 cursor-pointer shadow-2xs shrink-0 ${
                      pushAlerts ? "bg-green-gradient-pill" : "bg-surfaceLight-card border border-surfaceLight-border"
                    }`}
                  >
                    <motion.div
                      animate={{ x: pushAlerts ? 22 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="w-5 h-5 rounded-full bg-white shadow-xs flex items-center justify-center text-[10px] font-bold"
                    >
                      {pushAlerts && <Check className="w-3 h-3 text-[#4B8E55]" strokeWidth={3} />}
                    </motion.div>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* 3. Security & Database Connection Status */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 26, delay: 0.1 }}
              className="bg-surfaceLight-card border border-surfaceLight-border p-6 md:p-8 rounded-3xl shadow-xs flex flex-col gap-6"
            >
              <div className="flex items-center gap-2 pb-3 border-b border-surfaceLight-border">
                <Shield className="w-5 h-5 text-brand" />
                <h2 className="text-[18px] font-display font-semibold text-textGray-display">
                  Keamanan & Status Database
                </h2>
              </div>

              <div className="flex flex-col gap-4">
                {/* Custom Gradient Toggle Switch 3 */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border">
                  <div className="flex items-center gap-3.5">
                    <Shield className="w-5 h-5 text-brand shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-textGray-display">Two-Factor Authentication (2FA)</span>
                      <span className="text-[12.5px] text-textGray-tertiary">Mewajibkan autentikasi dua faktor untuk akses data direksi</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setTwoFactor(!twoFactor)}
                    className={`relative w-12 h-6.5 rounded-full transition-all duration-300 p-0.5 cursor-pointer shadow-2xs shrink-0 ${
                      twoFactor ? "bg-green-gradient-pill" : "bg-surfaceLight-card border border-surfaceLight-border"
                    }`}
                  >
                    <motion.div
                      animate={{ x: twoFactor ? 22 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="w-5 h-5 rounded-full bg-white shadow-xs flex items-center justify-center text-[10px] font-bold"
                    >
                      {twoFactor && <Check className="w-3 h-3 text-[#4B8E55]" strokeWidth={3} />}
                    </motion.div>
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border">
                  <div className="flex items-center gap-3.5">
                    <Database className="w-5 h-5 text-[#4B8E55] shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-textGray-display">Database Persistence Status</span>
                      <span className="text-[12.5px] text-emerald-600 font-medium">Supabase PostgreSQL + Local Storage Active</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11.5px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                    Connected
                  </span>
                </div>
              </div>

              {/* Action Submit Bar */}
              <div className="flex items-center justify-between pt-6 border-t border-surfaceLight-border mt-2">
                <span className="text-[12.5px] text-textGray-tertiary font-normal">
                  Semua pengaturan disimpan dan terhubung langsung ke dashboard.
                </span>

                <button
                  type="submit"
                  className="px-7 py-3 rounded-full bg-green-gradient-pill text-white text-[13.5px] font-semibold hover:opacity-95 transition-opacity shadow-sm cursor-pointer inline-flex items-center gap-2"
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

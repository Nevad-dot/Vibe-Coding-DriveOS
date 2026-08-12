"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  ShieldCheck,
  MapPin,
  Phone,
  Save,
  CheckCircle2,
} from "lucide-react";

export default function ProfilePage() {
  const [name, setName] = useState("MacBook Pro");
  const [email, setEmail] = useState("macbookpro@driveos.app");
  const [phone, setPhone] = useState("+62 812-8899-1088");
  const [role, setRole] = useState("Executive Director");
  const [branch, setBranch] = useState("Jakarta Pusat (HQ)");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("user_name") || sessionStorage.getItem("user_name");
      const storedEmail = localStorage.getItem("user_email") || sessionStorage.getItem("user_email");
      if (storedName) setName(storedName);
      if (storedEmail) setEmail(storedEmail);
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.setItem("user_name", name);
      localStorage.setItem("user_email", email);
      sessionStorage.setItem("user_name", name);
      sessionStorage.setItem("user_email", email);
    }
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 2500);
  };

  const getInitials = (str: string) => {
    const parts = str.trim().split(" ");
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return str.slice(0, 2).toUpperCase();
  };

  return (
    <div className="w-full max-w-full flex flex-col min-h-screen">
      {/* Top Header Banner */}
      <div className="bg-surfaceLight-card border-b border-surfaceLight-border px-[20px] md:px-8 py-5 md:py-7 w-full">
        <div className="max-w-[1440px] mx-auto">
          <span className="text-[11px] font-semibold text-brand uppercase tracking-wider block mb-1 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#4B8E55]" />
            EXECUTIVE ACCOUNT MANAGEMENT
          </span>
          <h1 className="text-[24px] sm:text-[28px] md:text-[32px] font-display font-bold text-textGray-display leading-tight">
            Profil Pengguna
          </h1>
          <p className="text-[13px] sm:text-[14px] text-textGray-tertiary font-normal mt-1">
            Kelola informasi akun direksi, otorisasi transaksi, dan identitas DriveOS Anda.
          </p>
        </div>
      </div>

      {/* Main Content Canvas */}
      <div className="bg-surfaceLight-pearl px-[20px] md:px-8 py-5 md:py-8 w-full min-h-[calc(100vh-200px)]">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-6 md:gap-8">
          {/* Main Profile Summary Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 26 }}
            className="bg-surfaceLight-card border border-surfaceLight-border p-5 md:p-8 rounded-3xl shadow-xs flex flex-col md:flex-row items-center gap-6 justify-between"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 text-center sm:text-left min-w-0 w-full md:w-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand text-white flex items-center justify-center font-bold text-[24px] sm:text-[28px] shadow-md shrink-0">
                {getInitials(name)}
              </div>

              <div className="flex flex-col min-w-0">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-[20px] sm:text-[22px] font-bold text-textGray-display truncate">{name}</h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center gap-1 shrink-0">
                    <ShieldCheck className="w-3 h-3 text-[#4B8E55]" /> Verified Executive
                  </span>
                </div>
                <span className="text-[13px] sm:text-[14px] text-textGray-tertiary font-medium mt-0.5 truncate">
                  {role} · {branch}
                </span>
                <span className="text-[12px] sm:text-[12.5px] text-textGray-muted font-normal mt-1 truncate">
                  {email} · {phone}
                </span>
              </div>
            </div>

            {/* Quick Executive Metrics */}
            <div className="flex items-center gap-3 sm:gap-4 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-surfaceLight-border">
              <div className="bg-surfaceLight-pearl border border-surfaceLight-border px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl text-center flex-1 md:flex-none min-w-[100px]">
                <span className="text-[10px] sm:text-[10.5px] font-semibold text-textGray-tertiary block uppercase">DEALS APPROVED</span>
                <span className="text-[15px] sm:text-[17px] font-bold text-brand">128 Unit</span>
              </div>
              <div className="bg-surfaceLight-pearl border border-surfaceLight-border px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl text-center flex-1 md:flex-none min-w-[100px]">
                <span className="text-[10px] sm:text-[10.5px] font-semibold text-textGray-tertiary block uppercase">CSAT RATING</span>
                <span className="text-[15px] sm:text-[17px] font-bold text-textGray-display">4.9 / 5.0</span>
              </div>
            </div>
          </motion.div>

          {/* Profile Form Details */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 26, delay: 0.05 }}
            className="bg-surfaceLight-card border border-surfaceLight-border p-5 md:p-8 rounded-3xl shadow-xs"
          >
            <h3 className="text-[17px] sm:text-[18px] font-display font-semibold text-textGray-display mb-5 sm:mb-6">
              Informasi & Detail Akun
            </h3>

            <form onSubmit={handleSave} className="flex flex-col gap-5 sm:gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                {/* Nama Lengkap */}
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-medium text-textGray-secondary flex items-center gap-1.5">
                    <User className="w-4 h-4 text-brand" />
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border text-[14px] text-textGray-display focus:outline-none focus:border-[#4B8E55] transition-colors"
                  />
                </div>

                {/* Email Alamat */}
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-medium text-textGray-secondary flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-brand" />
                    Email Alamat
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border text-[14px] text-textGray-display focus:outline-none focus:border-[#4B8E55] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                {/* WhatsApp / Phone */}
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-medium text-textGray-secondary flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-brand" />
                    Nomor Telepon / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border text-[14px] text-textGray-display focus:outline-none focus:border-[#4B8E55] transition-colors"
                  />
                </div>

                {/* Branch */}
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-medium text-textGray-secondary flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-brand" />
                    Lokasi Cabang Utama
                  </label>
                  <input
                    type="text"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border text-[14px] text-textGray-display focus:outline-none focus:border-[#4B8E55] transition-colors"
                  />
                </div>
              </div>

              {/* Action Submit Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-surfaceLight-border mt-2">
                <span className="text-[12px] sm:text-[12.5px] text-textGray-tertiary font-normal text-center sm:text-left">
                  Perubahan profil akan langsung disinkronkan ke seluruh sistem DriveOS.
                </span>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 rounded-full bg-green-gradient-pill text-white text-[13.5px] font-semibold hover:opacity-95 transition-opacity shadow-sm cursor-pointer inline-flex items-center justify-center gap-2 shrink-0"
                >
                  {isSaved ? (
                    <>
                      <CheckCircle2 className="w-4.5 h-4.5" />
                      <span>Profil Berhasil Disimpan!</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4.5 h-4.5" />
                      <span>Simpan Perubahan</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

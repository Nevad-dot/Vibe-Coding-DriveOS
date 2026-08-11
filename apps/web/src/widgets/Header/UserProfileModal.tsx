"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, ShieldCheck, MapPin, Phone, Save, CheckCircle2 } from "lucide-react";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateProfile?: (name: string, email: string) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  onUpdateProfile,
}) => {
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("MacBook Pro");
  const [email, setEmail] = useState("macbookpro@driveos.app");
  const [phone, setPhone] = useState("+62 812-8899-1088");
  const [role, setRole] = useState("Executive Director");
  const [branch, setBranch] = useState("Jakarta Pusat (HQ)");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("user_name") || sessionStorage.getItem("user_name");
      const storedEmail = localStorage.getItem("user_email") || sessionStorage.getItem("user_email");
      if (storedName) setName(storedName);
      if (storedEmail) setEmail(storedEmail);
    }
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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.setItem("user_name", name);
      localStorage.setItem("user_email", email);
      sessionStorage.setItem("user_name", name);
      sessionStorage.setItem("user_email", email);
    }

    if (onUpdateProfile) {
      onUpdateProfile(name, email);
    }

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1500);
  };

  const getInitials = (str: string) => {
    const parts = str.trim().split(" ");
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return str.slice(0, 2).toUpperCase();
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Full Screen Solid Dark Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
          />

          {/* Profile Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative w-full max-w-[620px] max-h-[90vh] overflow-y-auto bg-surfaceLight-card border border-surfaceLight-border rounded-3xl shadow-2xl z-10 p-6 md:p-8 flex flex-col gap-6"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-brand uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#4B8E55]" />
                  EXECUTIVE USER PROFILE
                </span>
                <h3 className="text-[22px] font-display font-bold text-textGray-display leading-tight">
                  Pengaturan Profil Saya
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

            {/* Profile Avatar Card */}
            <div className="p-5 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border flex items-center gap-4 shadow-2xs">
              <div className="w-16 h-16 rounded-full bg-brand text-white flex items-center justify-center font-bold text-[22px] shadow-sm shrink-0">
                {getInitials(name)}
              </div>
              <div className="flex flex-col min-w-0">
                <h4 className="text-[18px] font-bold text-textGray-display truncate">{name}</h4>
                <span className="text-[13px] text-textGray-tertiary font-medium">{role} · {branch}</span>
                <span className="text-[12px] text-brand font-semibold mt-0.5 inline-flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#4B8E55]" /> Verified Executive Account
                </span>
              </div>
            </div>

            {/* Editable Profile Form */}
            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nama Lengkap */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-medium text-textGray-secondary flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-brand" />
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border text-[13.5px] text-textGray-display focus:outline-none focus:border-[#4B8E55] transition-colors"
                  />
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-medium text-textGray-secondary flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-brand" />
                    Email Alamat
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border text-[13.5px] text-textGray-display focus:outline-none focus:border-[#4B8E55] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nomor Telepon */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-medium text-textGray-secondary flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-brand" />
                    Nomor WhatsApp / HP
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border text-[13.5px] text-textGray-display focus:outline-none focus:border-[#4B8E55] transition-colors"
                  />
                </div>

                {/* Branch Location */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-medium text-textGray-secondary flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand" />
                    Cabang Utama
                  </label>
                  <input
                    type="text"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border text-[13.5px] text-textGray-display focus:outline-none focus:border-[#4B8E55] transition-colors"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-surfaceLight-border mt-2">
                <span className="text-[12px] text-textGray-tertiary">
                  Data tersimpan otomatis di database lokal
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-full border border-surfaceLight-border bg-surfaceLight-card text-textGray-display hover:bg-surfaceLight-pearl text-[13px] font-semibold transition-colors cursor-pointer"
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
                        <span>Tersimpan!</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Simpan Profil</span>
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

export default UserProfileModal;

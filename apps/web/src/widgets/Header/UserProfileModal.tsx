"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Mail,
  ShieldCheck,
  MapPin,
  Phone,
  Save,
  CheckCircle2,
} from "lucide-react";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateProfile?: (name: string, email: string) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
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
      onClose();
    }, 1800);
  };

  const getInitials = (str: string) => {
    const parts = str.trim().split(" ");
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return str.slice(0, 2).toUpperCase();
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="user-profile-modal-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Full Screen Solid Dark Backdrop Overlay */}
          <div
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
          />

          {/* Profile Modal Container */}
          <motion.div
            key="user-profile-modal-card"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative w-full max-w-[620px] bg-surfaceLight-card border border-surfaceLight-border rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col"
          >
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-surfaceLight-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand/15 text-brand flex items-center justify-center">
                  <User className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-[17px] font-display font-bold text-textGray-display leading-tight">
                    Profil Pengguna
                  </h3>
                  <span className="text-[12px] text-textGray-tertiary font-normal">
                    Pengaturan identitas direksi & otorisasi akun DriveOS
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

            {/* Modal Content Form */}
            <form onSubmit={handleSave} className="p-6 flex flex-col gap-6 max-h-[80vh] overflow-y-auto">
              {/* Header Profile Summary Avatar */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border">
                <div className="w-14 h-14 rounded-full bg-brand text-white flex items-center justify-center font-bold text-[20px] shadow-sm shrink-0">
                  {getInitials(name)}
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[16px] font-bold text-textGray-display truncate">{name}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#4B8E55]" /> Verified Executive
                    </span>
                  </div>
                  <span className="text-[12.5px] text-textGray-tertiary font-medium">
                    {role} · {branch}
                  </span>
                </div>
              </div>

              {/* Form Input Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nama Lengkap */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12.5px] font-medium text-textGray-secondary flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-brand" />
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border text-[13.5px] text-textGray-display focus:outline-none focus:border-[#4B8E55] transition-colors"
                  />
                </div>

                {/* Email Alamat */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12.5px] font-medium text-textGray-secondary flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-brand" />
                    Email Alamat
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border text-[13.5px] text-textGray-display focus:outline-none focus:border-[#4B8E55] transition-colors"
                  />
                </div>

                {/* WhatsApp / Phone */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12.5px] font-medium text-textGray-secondary flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-brand" />
                    Nomor Telepon / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border text-[13.5px] text-textGray-display focus:outline-none focus:border-[#4B8E55] transition-colors"
                  />
                </div>

                {/* Branch */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12.5px] font-medium text-textGray-secondary flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand" />
                    Cabang Utama
                  </label>
                  <input
                    type="text"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border text-[13.5px] text-textGray-display focus:outline-none focus:border-[#4B8E55] transition-colors"
                  />
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
                      <span>Profil Berhasil Disimpan!</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Simpan Perubahan</span>
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

export default UserProfileModal;

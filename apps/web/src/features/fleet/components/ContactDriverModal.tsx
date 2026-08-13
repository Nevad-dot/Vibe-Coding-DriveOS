"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, MessageSquare, UserCheck, PhoneOff, Send, ExternalLink, ShieldCheck } from "lucide-react";

interface ContactDriverModalProps {
  isOpen: boolean;
  onClose: () => void;
  unit: {
    plate: string;
    model: string;
    driver: string;
    branch: string;
  } | null;
}

export const ContactDriverModal: React.FC<ContactDriverModalProps> = ({ isOpen, onClose, unit }) => {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<"menu" | "call" | "whatsapp">("menu");
  const [callSeconds, setCallSeconds] = useState(0);
  const [chatText, setChatText] = useState("");
  const [waSentToast, setWaSentToast] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Timer for active call mode
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (mode === "call") {
      timer = setInterval(() => {
        setCallSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setCallSeconds(0);
    }
    return () => clearInterval(timer);
  }, [mode]);

  if (!mounted || !unit) return null;

  const handleClose = () => {
    setMode("menu");
    setCallSeconds(0);
    setWaSentToast(false);
    onClose();
  };

  const handleSendWa = (e: React.FormEvent) => {
    e.preventDefault();
    setWaSentToast(true);
    setTimeout(() => {
      setWaSentToast(false);
      handleClose();
    }, 2000);
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="contact-driver-modal-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4"
        >
          {/* Full Screen Dark Backdrop Overlay */}
          <div
            onClick={handleClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            key="contact-driver-modal-card"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative w-full max-w-[480px] max-h-[88vh] overflow-y-auto bg-surfaceLight-card border border-surfaceLight-border dark:border-[#222F43] rounded-3xl shadow-2xl z-10 p-4 sm:p-7 flex flex-col gap-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-surfaceLight-border dark:border-[#222F43]">
              <div className="min-w-0 flex-1">
                <span className="text-[10px] sm:text-[11px] font-semibold text-brand uppercase tracking-wider block mb-0.5 truncate">
                  FLEET DRIVER COMMUNICATIONS
                </span>
                <h3 className="text-[16px] sm:text-[19px] font-display font-bold text-textGray-display leading-tight truncate">
                  {mode === "call" ? "Panggilan Seluler" : mode === "whatsapp" ? "Kirim Pesan WhatsApp" : "Hubungi Pengemudi"}
                </h3>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-textGray-tertiary hover:text-textGray-display hover:bg-surfaceLight-pearl transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Mode 1: Main Menu */}
            {mode === "menu" && (
              <>
                {/* Driver Profile Card */}
                <div className="p-3.5 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border dark:border-[#222F43] flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#4B8E55]/15 text-[#4B8E55] font-bold text-[17px] flex items-center justify-center shrink-0">
                    {unit.driver.charAt(0)}
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[15px] font-bold text-textGray-display flex items-center gap-1.5 truncate">
                      {unit.driver}
                      <UserCheck className="w-4 h-4 text-[#4B8E55] shrink-0" />
                    </span>
                    <span className="text-[12px] text-textGray-tertiary truncate">
                      Plat: <span className="font-bold text-textGray-display">{unit.plate}</span> · {unit.model}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border dark:border-[#222F43] flex flex-col gap-0.5">
                    <span className="text-[10px] text-textGray-tertiary font-semibold uppercase tracking-wide">LOKASI CABANG</span>
                    <span className="text-[12.5px] sm:text-[13px] font-bold text-textGray-display truncate">{unit.branch}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border dark:border-[#222F43] flex flex-col gap-0.5">
                    <span className="text-[10px] text-textGray-tertiary font-semibold uppercase tracking-wide">STATUS DRIVER</span>
                    <span className="text-[12.5px] sm:text-[13px] font-bold text-emerald-600 truncate">On Duty Active</span>
                  </div>
                </div>

                {/* Distinct Actions: WhatsApp vs Panggil Driver */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-2.5 border-t border-surfaceLight-border dark:border-[#222F43] w-full">
                  <button
                    type="button"
                    onClick={() => setMode("whatsapp")}
                    className="w-full sm:flex-1 py-2.5 px-4 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 text-[13px] font-semibold transition-colors cursor-pointer inline-flex items-center justify-center gap-2 shadow-2xs whitespace-nowrap"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode("call")}
                    className="w-full sm:flex-1 py-2.5 px-4 rounded-full bg-green-gradient-pill text-white text-[13px] font-semibold hover:opacity-95 transition-opacity shadow-sm cursor-pointer inline-flex items-center justify-center gap-2 select-none whitespace-nowrap"
                  >
                    <Phone className="w-4 h-4 text-white shrink-0" strokeWidth={1.5} />
                    <span>Panggil Driver</span>
                  </button>
                </div>
              </>
            )}

            {/* Mode 2: Active Voice Call View */}
            {mode === "call" && (
              <div className="py-6 flex flex-col items-center justify-center text-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-[#4B8E55]/15 text-[#4B8E55] flex items-center justify-center animate-pulse">
                    <Phone className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white animate-ping" />
                </div>

                <div className="flex flex-col gap-1">
                  <h4 className="text-[17px] font-bold text-textGray-display">
                    {unit.driver}
                  </h4>
                  <span className="text-[12.5px] text-textGray-tertiary">
                    +62 812-9842-109X · {unit.plate}
                  </span>
                  <span className="text-[16px] font-bold text-[#4B8E55] mt-1 font-mono">
                    {formatTimer(callSeconds)}
                  </span>
                </div>

                <div className="flex items-center justify-center w-full pt-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-6 py-2.5 rounded-full bg-red-600 text-white text-[13px] font-semibold hover:bg-red-700 transition-colors shadow-md inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    <PhoneOff className="w-4 h-4" />
                    <span>Akhiri Panggilan</span>
                  </button>
                </div>
              </div>
            )}

            {/* Mode 3: WhatsApp Direct Message Form */}
            {mode === "whatsapp" && (
              <>
                {waSentToast ? (
                  <div className="py-8 flex flex-col items-center justify-center text-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center">
                      <ShieldCheck className="w-7 h-7" strokeWidth={1.5} />
                    </div>
                    <h4 className="text-[17px] font-bold text-textGray-display">
                      Pesan Terkirim ke WhatsApp!
                    </h4>
                    <p className="text-[12.5px] text-textGray-tertiary">
                      Pesan pengiriman armada telah dikirim ke <span className="font-bold text-textGray-display">{unit.driver}</span>.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSendWa} className="flex flex-col gap-3.5">
                    <div className="p-3 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border dark:border-[#222F43] flex items-center justify-between text-[12px]">
                      <span className="text-textGray-tertiary">Penerima:</span>
                      <span className="font-bold text-textGray-display">{unit.driver} (+62 812-9842-109X)</span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[11.5px] font-semibold text-textGray-primary">
                        Pesan WhatsApp
                      </label>
                      <textarea
                        rows={3}
                        required
                        placeholder={`Halo ${unit.driver}, tolong update posisi unit ${unit.plate} saat ini.`}
                        value={chatText}
                        onChange={(e) => setChatText(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border dark:border-[#222F43] text-textGray-display text-[13px] placeholder:text-textGray-tertiary/60 focus:outline-none focus:border-[#4B8E55] transition-colors resize-none"
                      />
                    </div>

                    {/* Action buttons: Top Row (WA Web & Kirim filling edge-to-edge), Bottom Row (Kembali filling full width) */}
                    <div className="flex flex-col gap-2 pt-2.5 border-t border-surfaceLight-border dark:border-[#222F43] w-full">
                      <div className="grid grid-cols-2 gap-2.5 w-full">
                        <a
                          href={`https://wa.me/6281298421092?text=${encodeURIComponent(chatText || `Halo ${unit.driver}, update unit ${unit.plate}`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="py-2.5 px-4 rounded-full border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 text-[12.5px] font-semibold transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5 whitespace-nowrap w-full"
                        >
                          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                          <span>WA Web</span>
                        </a>

                        <button
                          type="submit"
                          className="py-2.5 px-4 rounded-full bg-emerald-600 text-white text-[12.5px] font-semibold hover:bg-emerald-700 transition-all shadow-sm cursor-pointer inline-flex items-center justify-center gap-1.5 whitespace-nowrap w-full"
                        >
                          <Send className="w-3.5 h-3.5 shrink-0" />
                          <span>Kirim</span>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => setMode("menu")}
                        className="w-full py-2.5 rounded-full border border-surfaceLight-border dark:border-[#222F43] bg-surfaceLight-card text-textGray-display text-[12.5px] font-semibold hover:bg-surfaceLight-pearl transition-colors cursor-pointer text-center"
                      >
                        Kembali
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ContactDriverModal;

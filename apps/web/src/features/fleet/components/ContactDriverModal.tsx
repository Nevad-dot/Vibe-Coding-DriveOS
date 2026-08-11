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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Full Screen Dark Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative w-full max-w-[480px] bg-surfaceLight-card border border-surfaceLight-border rounded-3xl shadow-2xl z-10 p-6 md:p-8 flex flex-col gap-5 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-brand uppercase tracking-wider block mb-1">
                  FLEET DRIVER COMMUNICATIONS
                </span>
                <h3 className="text-[20px] font-display font-bold text-textGray-display leading-tight">
                  {mode === "call" ? "Panggilan Seluler" : mode === "whatsapp" ? "Kirim Pesan WhatsApp" : "Hubungi Pengemudi"}
                </h3>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="w-9 h-9 rounded-full flex items-center justify-center text-textGray-tertiary hover:text-textGray-display hover:bg-surfaceLight-pearl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Mode 1: Main Menu */}
            {mode === "menu" && (
              <>
                {/* Driver Profile Card */}
                <div className="p-4 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#4B8E55]/15 text-[#4B8E55] font-bold text-[18px] flex items-center justify-center shrink-0">
                    {unit.driver.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[16px] font-bold text-textGray-display flex items-center gap-1.5">
                      {unit.driver}
                      <UserCheck className="w-4 h-4 text-[#4B8E55]" />
                    </span>
                    <span className="text-[12.5px] text-textGray-tertiary">
                      Plat: <span className="font-semibold text-textGray-display">{unit.plate}</span> · {unit.model}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border flex flex-col gap-0.5">
                    <span className="text-[11px] text-textGray-tertiary font-medium">LOKASI CABANG</span>
                    <span className="text-[13px] font-semibold text-textGray-display">{unit.branch}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border flex flex-col gap-0.5">
                    <span className="text-[11px] text-textGray-tertiary font-medium">STATUS DRIVER</span>
                    <span className="text-[13px] font-semibold text-emerald-600">On Duty Active</span>
                  </div>
                </div>

                {/* Distinct Actions: WhatsApp vs Panggil Seluler */}
                <div className="flex items-center justify-between gap-3 pt-2 border-t border-surfaceLight-border mt-1">
                  <button
                    type="button"
                    onClick={() => setMode("whatsapp")}
                    className="flex-1 py-3 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 text-[13px] font-semibold transition-colors cursor-pointer inline-flex items-center justify-center gap-2 shadow-xs"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode("call")}
                    className="flex-1 py-3 rounded-full bg-green-gradient-pill text-white text-[13px] font-semibold hover:opacity-95 transition-opacity shadow-sm cursor-pointer inline-flex items-center justify-center gap-2 select-none"
                  >
                    <Phone className="w-4 h-4" strokeWidth={1.5} />
                    <span>Panggil Panggilan</span>
                  </button>
                </div>
              </>
            )}

            {/* Mode 2: Active Voice Call View */}
            {mode === "call" && (
              <div className="py-6 flex flex-col items-center justify-center text-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-[#4B8E55]/15 text-[#4B8E55] flex items-center justify-center animate-pulse">
                    <Phone className="w-10 h-10" strokeWidth={1.5} />
                  </div>
                  <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white animate-ping" />
                </div>

                <div className="flex flex-col gap-1">
                  <h4 className="text-[18px] font-bold text-textGray-display">
                    {unit.driver}
                  </h4>
                  <span className="text-[13px] text-textGray-tertiary">
                    +62 812-9842-109X · {unit.plate}
                  </span>
                  <span className="text-[16px] font-bold text-[#4B8E55] mt-1 font-mono">
                    {formatTimer(callSeconds)}
                  </span>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-6 py-2.5 rounded-full bg-red-600 text-white text-[13px] font-semibold hover:bg-red-700 transition-colors shadow-md inline-flex items-center gap-2 cursor-pointer"
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
                    <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center">
                      <ShieldCheck className="w-8 h-8" strokeWidth={1.5} />
                    </div>
                    <h4 className="text-[17.5px] font-bold text-textGray-display">
                      Pesan Terkirim ke WhatsApp!
                    </h4>
                    <p className="text-[13px] text-textGray-tertiary">
                      Pesan pengiriman armada telah dikirim ke <span className="font-semibold text-textGray-display">{unit.driver}</span>.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSendWa} className="flex flex-col gap-4">
                    <div className="p-3 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border flex items-center justify-between text-[12.5px]">
                      <span className="text-textGray-tertiary">Penerima WhatsApp:</span>
                      <span className="font-semibold text-textGray-display">{unit.driver} (+62 812-9842-109X)</span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-medium text-textGray-primary">
                        Pesan WhatsApp
                      </label>
                      <textarea
                        rows={3}
                        required
                        placeholder={`Halo ${unit.driver}, tolong update posisi unit ${unit.plate} saat ini.`}
                        value={chatText}
                        onChange={(e) => setChatText(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border text-textGray-display text-[13.5px] placeholder:text-textGray-tertiary/60 focus:outline-none focus:border-[#4B8E55] transition-colors resize-none"
                      />
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-2 border-t border-surfaceLight-border">
                      <button
                        type="button"
                        onClick={() => setMode("menu")}
                        className="px-4 py-2.5 rounded-full border border-surfaceLight-border bg-surfaceLight-card text-textGray-display text-[13px] font-medium hover:bg-surfaceLight-pearl transition-colors cursor-pointer"
                      >
                        Kembali
                      </button>

                      <div className="flex items-center gap-2">
                        <a
                          href={`https://wa.me/6281298421092?text=${encodeURIComponent(chatText || `Halo ${unit.driver}, update unit ${unit.plate}`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2.5 rounded-full border border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/10 text-[13px] font-medium transition-colors cursor-pointer inline-flex items-center gap-1.5"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>WA Web</span>
                        </a>

                        <button
                          type="submit"
                          className="px-5 py-2.5 rounded-full bg-emerald-600 text-white text-[13px] font-semibold hover:bg-emerald-700 transition-all shadow-sm cursor-pointer inline-flex items-center gap-1.5"
                        >
                          <Send className="w-4 h-4" />
                          <span>Kirim</span>
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ContactDriverModal;

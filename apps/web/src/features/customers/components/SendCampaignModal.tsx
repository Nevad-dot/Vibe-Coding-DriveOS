"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  CheckCircle2,
  ChevronDown,
  Users,
  Target,
  Megaphone,
} from "lucide-react";

interface SendCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SEGMENTS = [
  { label: "Semua Pelanggan (214)", value: "all" },
  { label: "Hot Lead — Siap Beli (38)", value: "hot" },
  { label: "Segmen 35–44 Tahun (101)", value: "35-44" },
  { label: "Pelanggan VIP (27)", value: "vip" },
  { label: "Pelanggan Baru (< 30 hari)", value: "new" },
];

const CHANNELS = [
  { label: "Email Marketing", value: "email" },
  { label: "WhatsApp Blast", value: "whatsapp" },
  { label: "SMS Gateway", value: "sms" },
  { label: "Push Notification", value: "push" },
];

export const SendCampaignModal: React.FC<SendCampaignModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [mounted, setMounted] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [segment, setSegment] = useState("all");
  const [channel, setChannel] = useState("email");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);

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

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setCampaignName("");
      setSubject("");
      setMessage("");
      onClose();
    }, 2200);
  };

  if (!mounted) return null;

  const selectedSegmentLabel =
    SEGMENTS.find((s) => s.value === segment)?.label || "";

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
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative w-full max-w-[540px] max-h-[90vh] overflow-y-auto bg-surfaceLight-card border border-surfaceLight-border rounded-3xl shadow-2xl z-10 p-6 md:p-8 flex flex-col gap-5"
          >
            {/* Success Confirmation */}
            {isSent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 flex flex-col items-center justify-center text-center gap-3"
              >
                <div className="w-14 h-14 rounded-full bg-[#4B8E55]/15 text-[#4B8E55] flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h4 className="text-[18px] font-bold text-textGray-display">
                  Kampanye Terkirim!
                </h4>
                <p className="text-[13px] text-textGray-tertiary max-w-[340px]">
                  Kampanye{" "}
                  <span className="font-semibold text-textGray-display">
                    &quot;{campaignName || "Untitled"}&quot;
                  </span>{" "}
                  berhasil dikirim ke {selectedSegmentLabel}.
                </p>
              </motion.div>
            ) : (
              <>
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-medium text-textGray-muted uppercase tracking-[0.08em] block mb-1">
                      CUSTOMER MARKETING
                    </span>
                    <h3 className="text-[22px] font-display font-bold text-textGray-display leading-tight">
                      Kirim Kampanye
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

                {/* Form */}
                <form onSubmit={handleSend} className="flex flex-col gap-4">
                  {/* Campaign Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-textGray-primary flex items-center gap-1">
                      <Megaphone
                        className="w-3.5 h-3.5 text-[#4B8E55]"
                        strokeWidth={1.5}
                      />
                      Nama Kampanye <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Promo Akhir Tahun 2026"
                      value={campaignName}
                      onChange={(e) => setCampaignName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border text-textGray-display text-[13.5px] placeholder:text-textGray-tertiary/60 focus:outline-none focus:border-[#4B8E55] transition-colors"
                    />
                  </div>

                  {/* Target Segment & Channel */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-medium text-textGray-primary flex items-center gap-1">
                        <Users
                          className="w-3.5 h-3.5 text-[#4B8E55]"
                          strokeWidth={1.5}
                        />
                        Segmen Target
                      </label>
                      <div className="relative">
                        <select
                          value={segment}
                          onChange={(e) => setSegment(e.target.value)}
                          className="w-full appearance-none px-3.5 py-2.5 pr-9 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border text-textGray-display text-[13.5px] focus:outline-none focus:border-[#4B8E55] transition-colors cursor-pointer"
                        >
                          {SEGMENTS.map((s) => (
                            <option key={s.value} value={s.value}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textGray-tertiary pointer-events-none"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-medium text-textGray-primary flex items-center gap-1">
                        <Target
                          className="w-3.5 h-3.5 text-[#4B8E55]"
                          strokeWidth={1.5}
                        />
                        Channel Pengiriman
                      </label>
                      <div className="relative">
                        <select
                          value={channel}
                          onChange={(e) => setChannel(e.target.value)}
                          className="w-full appearance-none px-3.5 py-2.5 pr-9 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border text-textGray-display text-[13.5px] focus:outline-none focus:border-[#4B8E55] transition-colors cursor-pointer"
                        >
                          {CHANNELS.map((c) => (
                            <option key={c.value} value={c.value}>
                              {c.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textGray-tertiary pointer-events-none"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Subject Line */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-textGray-primary">
                      Subject / Judul <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Diskon Spesial Porsche 911 GT3!"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border text-textGray-display text-[13.5px] placeholder:text-textGray-tertiary/60 focus:outline-none focus:border-[#4B8E55] transition-colors"
                    />
                  </div>

                  {/* Message Body */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-textGray-primary">
                      Isi Pesan
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tulis pesan kampanye Anda di sini..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border text-textGray-display text-[13.5px] placeholder:text-textGray-tertiary/60 focus:outline-none focus:border-[#4B8E55] transition-colors resize-none"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-3 pt-2 border-t border-surfaceLight-border mt-1">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-5 py-2.5 rounded-full border border-surfaceLight-border bg-surfaceLight-card text-textGray-display hover:bg-surfaceLight-pearl text-[13px] font-medium transition-colors cursor-pointer shadow-xs"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-full bg-green-gradient-pill text-white text-[13px] font-semibold hover:opacity-95 transition-opacity shadow-sm cursor-pointer inline-flex items-center gap-1.5 select-none"
                    >
                      <Send className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                      <span>Kirim Kampanye</span>
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default SendCampaignModal;

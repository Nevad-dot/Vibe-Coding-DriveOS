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
  onSuccess?: (camp: { name: string; segment: string; channel: string; subject: string }) => void;
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
  onSuccess,
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

    const selectedSegmentLabel = SEGMENTS.find((s) => s.value === segment)?.label || "Semua Pelanggan";
    const selectedChannelLabel = CHANNELS.find((c) => c.value === channel)?.label || "Email Marketing";

    if (onSuccess) {
      onSuccess({
        name: campaignName || "Kampanye Pemasaran Baru",
        segment: selectedSegmentLabel,
        channel: selectedChannelLabel,
        subject: subject || campaignName || "Promo Baru",
      });
    }

    setTimeout(() => {
      setIsSent(false);
      setCampaignName("");
      setSubject("");
      setMessage("");
      onClose();
    }, 1800);
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
            className="relative w-full max-w-[560px] bg-surfaceLight-card border border-surfaceLight-border rounded-3xl shadow-2xl overflow-hidden z-10 p-6 md:p-8 flex flex-col gap-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-brand uppercase tracking-wider block mb-1">
                  KAMPANYE PEMASARAN CRM
                </span>
                <h3 className="text-[20px] font-display font-bold text-textGray-display leading-tight">
                  Kirim Kampanye Baru
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

            {/* Success State */}
            {isSent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="flex flex-col gap-1">
                  <h4 className="text-[18px] font-bold text-textGray-display">
                    Kampanye Berhasil Terkirim!
                  </h4>
                  <p className="text-[13px] text-textGray-tertiary">
                    Pesan telah diproses dan disebarkan ke segmen {selectedSegmentLabel}. Data tersimpan ke database.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSend} className="flex flex-col gap-4">
                {/* Campaign Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-medium text-textGray-primary flex items-center gap-1.5">
                    <Megaphone className="w-3.5 h-3.5 text-brand" />
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

                {/* Segment & Channel Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Target Segment */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-textGray-primary flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-brand" />
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

                  {/* Channel */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-textGray-primary flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-brand" />
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
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default SendCampaignModal;

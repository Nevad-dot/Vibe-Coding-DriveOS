"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Wrench, Calendar, Clock, Car, User, CheckCircle2, ChevronDown } from "lucide-react";

interface ScheduleServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (newBooking: any) => void;
}

export const ScheduleServiceModal: React.FC<ScheduleServiceModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [mounted, setMounted] = useState(false);
  const [vehicle, setVehicle] = useState("");
  const [customer, setCustomer] = useState("");
  const [serviceType, setServiceType] = useState("Servis Berkala");
  const [bay, setBay] = useState("Bay 01");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("09:00");
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicle || !customer) return;

    setSubmitted(true);
    setTimeout(() => {
      if (onSuccess) {
        onSuccess({
          vehicle,
          customer,
          serviceType,
          bay,
          date: date || "Besok",
          time,
        });
      }
      setSubmitted(false);
      setVehicle("");
      setCustomer("");
      onClose();
    }, 1200);
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="schedule-service-modal-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4"
        >
          {/* Full Screen Dark Backdrop Overlay */}
          <div
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            key="schedule-service-modal-card"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative w-full max-w-[520px] max-h-[90vh] overflow-y-auto bg-surfaceLight-card border border-surfaceLight-border dark:border-[#222F43] rounded-3xl shadow-2xl z-10 p-4 sm:p-7 flex flex-col gap-4"
          >
            {/* Success State */}
            {submitted ? (
              <div className="py-8 flex flex-col items-center justify-center text-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#4B8E55]/15 text-[#4B8E55] flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h4 className="text-[18px] font-bold text-textGray-display">
                  Jadwal Servis Berhasil Dibuat!
                </h4>
                <p className="text-[13px] text-textGray-tertiary max-w-[340px]">
                  Booking servis untuk unit <span className="font-semibold text-textGray-display">{vehicle}</span> telah dikonfirmasi di {bay}.
                </p>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-surfaceLight-border dark:border-[#222F43]">
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] sm:text-[11px] font-semibold text-brand uppercase tracking-wider block mb-0.5 truncate">
                      WORKSHOP & SERVICE APPOINTMENT
                    </span>
                    <h3 className="text-[16px] sm:text-[19px] font-display font-bold text-textGray-display leading-tight truncate">
                      Buat Jadwal Servis
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-textGray-tertiary hover:text-textGray-display hover:bg-surfaceLight-pearl transition-colors cursor-pointer shrink-0"
                  >
                    <X className="w-5 h-5" strokeWidth={1.5} />
                  </button>
                </div>

                {/* Form - Side-by-side 2-column grid layout */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                  {/* Vehicle & Customer */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1 min-w-0">
                      <label className="text-[11.5px] font-semibold text-textGray-primary flex items-center gap-1 truncate">
                        <Car className="w-3.5 h-3.5 text-[#4B8E55] shrink-0" />
                        <span className="truncate">Kendaraan / Plat</span> <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: B 2291 TNG"
                        value={vehicle}
                        onChange={(e) => setVehicle(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border dark:border-[#222F43] text-textGray-display text-[13px] placeholder:text-textGray-tertiary/60 focus:outline-none focus:border-[#4B8E55] transition-colors truncate"
                      />
                    </div>

                    <div className="flex flex-col gap-1 min-w-0">
                      <label className="text-[11.5px] font-semibold text-textGray-primary flex items-center gap-1 truncate">
                        <User className="w-3.5 h-3.5 text-[#4B8E55] shrink-0" />
                        <span className="truncate">Nama Pemilik</span> <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Bpk. Hendra"
                        value={customer}
                        onChange={(e) => setCustomer(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border dark:border-[#222F43] text-textGray-display text-[13px] placeholder:text-textGray-tertiary/60 focus:outline-none focus:border-[#4B8E55] transition-colors truncate"
                      />
                    </div>
                  </div>

                  {/* Service Type & Bay */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1 min-w-0">
                      <label className="text-[11.5px] font-semibold text-textGray-primary flex items-center gap-1 truncate">
                        <Wrench className="w-3.5 h-3.5 text-[#4B8E55] shrink-0" />
                        <span className="truncate">Jenis Servis</span>
                      </label>
                      <div className="relative">
                        <select
                          value={serviceType}
                          onChange={(e) => setServiceType(e.target.value)}
                          className="w-full appearance-none px-3 py-2 pr-7 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border dark:border-[#222F43] text-textGray-display text-[13px] focus:outline-none focus:border-[#4B8E55] transition-colors cursor-pointer truncate"
                        >
                          <option value="Servis Berkala">Servis Berkala</option>
                          <option value="Perbaikan Mesin">Perbaikan Mesin</option>
                          <option value="Ganti Kampas Rem">Ganti Kampas Rem</option>
                          <option value="Spooring & Balancing">Spooring & Balancing</option>
                          <option value="Inspeksi Umum">Inspeksi Umum</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-textGray-tertiary pointer-events-none" strokeWidth={1.5} />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 min-w-0">
                      <label className="text-[11.5px] font-semibold text-textGray-primary flex items-center gap-1 truncate">
                        <Wrench className="w-3.5 h-3.5 text-[#4B8E55] shrink-0" />
                        <span className="truncate">Lokasi Bay Workshop</span>
                      </label>
                      <div className="relative">
                        <select
                          value={bay}
                          onChange={(e) => setBay(e.target.value)}
                          className="w-full appearance-none px-3 py-2 pr-7 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border dark:border-[#222F43] text-textGray-display text-[13px] focus:outline-none focus:border-[#4B8E55] transition-colors cursor-pointer truncate"
                        >
                          <option value="Bay 01 — Express">Bay 01 — Express</option>
                          <option value="Bay 02 — Heavy Repair">Bay 02 — Heavy Repair</option>
                          <option value="Bay 03 — Inspection">Bay 03 — Inspection</option>
                          <option value="Bay 04 — General">Bay 04 — General</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-textGray-tertiary pointer-events-none" strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>

                  {/* Date & Time with Inverted Icons in Dark Mode */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1 min-w-0">
                      <label className="text-[11.5px] font-semibold text-textGray-primary flex items-center gap-1 truncate">
                        <Calendar className="w-3.5 h-3.5 text-[#4B8E55] shrink-0" />
                        <span className="truncate">Tanggal Booking</span>
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border dark:border-[#222F43] text-textGray-display text-[13px] focus:outline-none focus:border-[#4B8E55] transition-colors cursor-pointer dark:[color-scheme:dark]"
                      />
                    </div>

                    <div className="flex flex-col gap-1 min-w-0">
                      <label className="text-[11.5px] font-semibold text-textGray-primary flex items-center gap-1 truncate">
                        <Clock className="w-3.5 h-3.5 text-[#4B8E55] shrink-0" />
                        <span className="truncate">Jam Pengerjaan</span>
                      </label>
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border dark:border-[#222F43] text-textGray-display text-[13px] focus:outline-none focus:border-[#4B8E55] transition-colors cursor-pointer dark:[color-scheme:dark]"
                      />
                    </div>
                  </div>

                  {/* Action Buttons - Side-by-side on the right */}
                  <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-surfaceLight-border dark:border-[#222F43] mt-1">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 rounded-full border border-surfaceLight-border dark:border-[#222F43] bg-surfaceLight-card text-textGray-display hover:bg-surfaceLight-pearl text-[12.5px] font-semibold transition-colors cursor-pointer shadow-2xs text-center whitespace-nowrap"
                    >
                      Batal
                    </button>

                    <button
                      type="submit"
                      className="px-5 py-2 rounded-full bg-green-gradient-pill text-white text-[12.5px] font-semibold hover:opacity-95 transition-opacity shadow-sm cursor-pointer inline-flex items-center justify-center gap-1.5 select-none whitespace-nowrap"
                    >
                      <Wrench className="w-3.5 h-3.5" strokeWidth={1.5} />
                      <span>Simpan Jadwal Servis</span>
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ScheduleServiceModal;

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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Full Screen Dark Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative w-full max-w-[520px] max-h-[90vh] overflow-y-auto bg-surfaceLight-card border border-surfaceLight-border rounded-3xl shadow-2xl z-10 p-6 md:p-8 flex flex-col gap-5"
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
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-brand uppercase tracking-wider block mb-1">
                      WORKSHOP & SERVICE APPOINTMENT
                    </span>
                    <h3 className="text-[22px] font-display font-bold text-textGray-display leading-tight">
                      Buat Jadwal Servis
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
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Vehicle & Customer */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-medium text-textGray-primary flex items-center gap-1">
                        <Car className="w-3.5 h-3.5 text-[#4B8E55]" />
                        Kendaraan / Plat <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: B 2291 TNG"
                        value={vehicle}
                        onChange={(e) => setVehicle(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border text-textGray-display text-[13.5px] placeholder:text-textGray-tertiary/60 focus:outline-none focus:border-[#4B8E55] transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-medium text-textGray-primary flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-[#4B8E55]" />
                        Nama Pemilik <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Bpk. Hendra"
                        value={customer}
                        onChange={(e) => setCustomer(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border text-textGray-display text-[13.5px] placeholder:text-textGray-tertiary/60 focus:outline-none focus:border-[#4B8E55] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Service Type & Bay */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-medium text-textGray-primary flex items-center gap-1">
                        <Wrench className="w-3.5 h-3.5 text-[#4B8E55]" />
                        Jenis Servis
                      </label>
                      <div className="relative">
                        <select
                          value={serviceType}
                          onChange={(e) => setServiceType(e.target.value)}
                          className="w-full appearance-none px-3.5 py-2.5 pr-9 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border text-textGray-display text-[13.5px] focus:outline-none focus:border-[#4B8E55] transition-colors cursor-pointer"
                        >
                          <option value="Servis Berkala">Servis Berkala</option>
                          <option value="Perbaikan Mesin">Perbaikan Mesin</option>
                          <option value="Ganti Kampas Rem">Ganti Kampas Rem</option>
                          <option value="Spooring & Balancing">Spooring & Balancing</option>
                          <option value="Inspeksi Umum">Inspeksi Umum</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textGray-tertiary pointer-events-none" strokeWidth={1.5} />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-medium text-textGray-primary flex items-center gap-1">
                        <Wrench className="w-3.5 h-3.5 text-[#4B8E55]" />
                        Lokasi Bay Workshop
                      </label>
                      <div className="relative">
                        <select
                          value={bay}
                          onChange={(e) => setBay(e.target.value)}
                          className="w-full appearance-none px-3.5 py-2.5 pr-9 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border text-textGray-display text-[13.5px] focus:outline-none focus:border-[#4B8E55] transition-colors cursor-pointer"
                        >
                          <option value="Bay 01 — Express">Bay 01 — Express</option>
                          <option value="Bay 02 — Heavy Repair">Bay 02 — Heavy Repair</option>
                          <option value="Bay 03 — Inspection">Bay 03 — Inspection</option>
                          <option value="Bay 04 — General">Bay 04 — General</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textGray-tertiary pointer-events-none" strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-medium text-textGray-primary flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#4B8E55]" />
                        Tanggal Booking
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border text-textGray-display text-[13.5px] focus:outline-none focus:border-[#4B8E55] transition-colors cursor-pointer"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-medium text-textGray-primary flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#4B8E55]" />
                        Jam Pengerjaan
                      </label>
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceLight-pearl border border-surfaceLight-border text-textGray-display text-[13.5px] focus:outline-none focus:border-[#4B8E55] transition-colors cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-3 pt-2 border-t border-surfaceLight-border mt-1">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2.5 rounded-full border border-surfaceLight-border bg-surfaceLight-card text-textGray-display hover:bg-surfaceLight-pearl text-[13px] font-medium transition-colors cursor-pointer shadow-xs"
                    >
                      Batal
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-full bg-green-gradient-pill text-white text-[13px] font-semibold hover:opacity-95 transition-opacity shadow-sm cursor-pointer inline-flex items-center gap-1.5 select-none"
                    >
                      <Wrench className="w-4 h-4" strokeWidth={1.5} />
                      <span>Simpan Jadwal Servis</span>
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ScheduleServiceModal;

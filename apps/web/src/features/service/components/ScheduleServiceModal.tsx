"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Wrench, Calendar, Clock, Car, User, CheckCircle2 } from "lucide-react";

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
  const [vehicle, setVehicle] = useState("");
  const [customer, setCustomer] = useState("");
  const [serviceType, setServiceType] = useState("Servis Berkala");
  const [bay, setBay] = useState("Bay 01");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("09:00");
  const [submitted, setSubmitted] = useState(false);

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
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
            className="bg-surfaceLight-card border border-surfaceLight-border rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-surfaceLight-border bg-surfaceLight-pearl/40">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-brand/10 flex items-center justify-center text-brand">
                  <Wrench className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-[17px] font-display font-semibold text-textGray-display leading-tight">
                    Jadwalkan Service Baru
                  </h3>
                  <p className="text-[12px] text-textGray-tertiary">
                    Masukan rincian kendaraan dan jadwal service
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-textGray-tertiary hover:text-textGray-primary hover:bg-surfaceLight-pearl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Modal Content */}
            {submitted ? (
              <div className="p-8 flex flex-col items-center justify-center text-center gap-3">
                <CheckCircle2 className="w-12 h-12 text-brand animate-bounce" />
                <h4 className="text-[18px] font-display font-semibold text-textGray-display">
                  Jadwal Service Berhasil Dibuat!
                </h4>
                <p className="text-[13px] text-textGray-tertiary max-w-xs">
                  Sistem telah mengalokasikan {bay} untuk {vehicle} ({customer}).
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
                {/* Customer & Vehicle */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-medium text-textGray-secondary mb-1.5">
                      Nama Pelanggan / Unit
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-textGray-tertiary absolute left-3 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Bapak Ridwan"
                        value={customer}
                        onChange={(e) => setCustomer(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-[13.5px] rounded-xl border border-surfaceLight-border bg-surfaceLight-pearl/30 text-textGray-display focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] font-medium text-textGray-secondary mb-1.5">
                      Model Kendaraan
                    </label>
                    <div className="relative">
                      <Car className="w-4 h-4 text-textGray-tertiary absolute left-3 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Porsche Cayenne"
                        value={vehicle}
                        onChange={(e) => setVehicle(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-[13.5px] rounded-xl border border-surfaceLight-border bg-surfaceLight-pearl/30 text-textGray-display focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Service Type & Bay Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-medium text-textGray-secondary mb-1.5">
                      Jenis Layanan
                    </label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full px-3 py-2 text-[13.5px] rounded-xl border border-surfaceLight-border bg-surfaceLight-card text-textGray-display focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all cursor-pointer"
                    >
                      <option value="Servis Berkala 40k km">Servis Berkala 40k km</option>
                      <option value="Rutin Bulanan">Rutin Bulanan</option>
                      <option value="Detailing & Coating">Detailing & Coating</option>
                      <option value="Diagnostic & Software">Diagnostic & Software</option>
                      <option value="Perbaikan Rem & Mesin">Perbaikan Rem & Mesin</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[12px] font-medium text-textGray-secondary mb-1.5">
                      Alokasi Bay
                    </label>
                    <select
                      value={bay}
                      onChange={(e) => setBay(e.target.value)}
                      className="w-full px-3 py-2 text-[13.5px] rounded-xl border border-surfaceLight-border bg-surfaceLight-card text-textGray-display focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all cursor-pointer"
                    >
                      <option value="Bay 01">Bay 01 (Regular)</option>
                      <option value="Bay 02">Bay 02 (Regular)</option>
                      <option value="Bay 05">Bay 05 (Fast Track)</option>
                      <option value="Bay 09">Bay 09 (Supercar Pit)</option>
                      <option value="Bay 14">Bay 14 (Detailing)</option>
                    </select>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-medium text-textGray-secondary mb-1.5">
                      Tanggal
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-textGray-tertiary absolute left-3 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-[13.5px] rounded-xl border border-surfaceLight-border bg-surfaceLight-pearl/30 text-textGray-display focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] font-medium text-textGray-secondary mb-1.5">
                      Waktu
                    </label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-textGray-tertiary absolute left-3 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-[13.5px] rounded-xl border border-surfaceLight-border bg-surfaceLight-pearl/30 text-textGray-display focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 mt-4 pt-3 border-t border-surfaceLight-border">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-full border border-surfaceLight-border text-[13.5px] font-medium text-textGray-primary hover:bg-surfaceLight-pearl transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-5 py-2.5 rounded-full bg-green-gradient-pill text-white text-[13.5px] font-medium shadow-xs transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <Wrench className="w-4 h-4" strokeWidth={1.5} />
                    <span>Simpan Jadwal</span>
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScheduleServiceModal;

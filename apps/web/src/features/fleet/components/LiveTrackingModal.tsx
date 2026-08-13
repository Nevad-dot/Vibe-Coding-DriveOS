"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Navigation, Radio, MapPin, Gauge, ShieldCheck, RefreshCw } from "lucide-react";

interface LiveTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ACTIVE_TRACKING_UNITS = [
  { plate: "B 1088 RFS", model: "BMW X7 xDrive40i M Sport", driver: "Driver Arif", speed: "78 km/h", location: "Tol Dalam Kota KM 14.2", status: "Moving South" },
  { plate: "L 8812 SB", model: "Audi RS e-tron GT 2024", driver: "Driver Ilham", speed: "64 km/h", location: "Jl. Mayjen Sungkono Surabaya", status: "Approaching Hub" },
  { plate: "D 1402 ABD", model: "Porsche Cayenne Coupe 2024", driver: "PIC Doni", speed: "0 km/h", location: "Showroom Bandung Pasteur", status: "Parked / Standby" },
];

export const LiveTrackingModal: React.FC<LiveTrackingModalProps> = ({ isOpen, onClose }) => {
  const [mounted, setMounted] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(ACTIVE_TRACKING_UNITS[0]);
  const [isRefreshing, setIsRefreshing] = useState(false);

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

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="live-tracking-modal-root"
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
            key="live-tracking-modal-card"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative w-full max-w-[800px] max-h-[90vh] overflow-y-auto bg-surfaceLight-card border border-surfaceLight-border rounded-3xl shadow-2xl z-10 p-4 sm:p-7 flex flex-col gap-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 pb-2 border-b border-surfaceLight-border">
              <div className="min-w-0 flex-1">
                <span className="text-[10px] sm:text-[11px] font-semibold text-brand uppercase tracking-wider block mb-0.5 flex items-center gap-1.5 truncate">
                  <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse shrink-0" />
                  REAL-TIME FLEET TELEMATICS
                </span>
                <h3 className="text-[17px] sm:text-[20px] font-display font-bold text-textGray-display leading-tight truncate">
                  Live GPS Tracking & Diagnostic
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleRefresh}
                  className="w-8 h-8 rounded-full border border-surfaceLight-border flex items-center justify-center text-textGray-tertiary hover:text-textGray-display hover:bg-surfaceLight-pearl transition-colors cursor-pointer"
                  title="Refresh GPS Feed"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-brand" : ""}`} strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-textGray-tertiary hover:text-textGray-display hover:bg-surfaceLight-pearl transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Simulated Live GPS Map View */}
            <div className="relative w-full h-[280px] sm:h-[320px] rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border overflow-hidden flex flex-col justify-between p-3 sm:p-4 shadow-inner">
              {/* Top Bar inside Map */}
              <div className="flex flex-wrap items-center justify-between gap-2 z-10">
                <div className="px-2.5 py-1 rounded-full bg-surfaceLight-card/90 border border-surfaceLight-border text-[11px] font-semibold text-textGray-display backdrop-blur-xs shadow-xs flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>GPS Active (126 Vehicles)</span>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-surfaceLight-card/90 border border-surfaceLight-border text-[11px] font-medium text-textGray-primary backdrop-blur-xs whitespace-nowrap">
                  Updated: Live 1s ago
                </div>
              </div>

              {/* Map Visual Simulation Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                <div className="w-[360px] h-[360px] rounded-full border border-brand/20 animate-ping" />
                <div className="absolute w-[220px] h-[220px] rounded-full border border-brand/40" />
              </div>

              {/* Center Vehicle Location Badge */}
              <div className="relative z-10 self-center max-w-[95%] bg-surfaceLight-card/95 border border-[#4B8E55] px-3.5 py-2 rounded-2xl shadow-lg flex items-center gap-2.5 backdrop-blur-xs text-left">
                <Navigation className="w-4 h-4 text-brand transform rotate-45 animate-bounce shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="text-[12.5px] sm:text-[13.5px] font-bold text-textGray-display block truncate">
                    {selectedUnit.plate} — {selectedUnit.model}
                  </span>
                  <span className="text-[11px] text-textGray-tertiary block truncate">
                    {selectedUnit.location} ({selectedUnit.speed})
                  </span>
                </div>
              </div>

              {/* Bottom Unit Switcher Bar */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar z-10 pt-2 pb-1 max-w-full">
                {ACTIVE_TRACKING_UNITS.map((unit) => (
                  <button
                    key={unit.plate}
                    type="button"
                    onClick={() => setSelectedUnit(unit)}
                    className={`px-3 py-1 rounded-full text-[11.5px] font-semibold transition-all cursor-pointer whitespace-nowrap border shrink-0 ${
                      selectedUnit.plate === unit.plate
                        ? "bg-green-gradient-pill text-white shadow-xs"
                        : "bg-surfaceLight-card border-surfaceLight-border text-textGray-display hover:border-brand"
                    }`}
                  >
                    {unit.plate} ({unit.driver})
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Unit Telematics Details Compact 3-Column Horizontal Grid */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 text-center bg-surfaceLight-pearl border border-surfaceLight-border p-2 sm:p-3 rounded-2xl">
              <div className="flex flex-col gap-0.5 items-center justify-center min-w-0">
                <span className="text-[9px] sm:text-[10px] text-textGray-tertiary font-semibold uppercase tracking-wider flex items-center gap-1 truncate">
                  <Gauge className="w-3 h-3 text-brand shrink-0" /> KECEPATAN
                </span>
                <span className="text-[13px] sm:text-[16px] font-bold text-brand truncate w-full">{selectedUnit.speed}</span>
              </div>

              <div className="flex flex-col gap-0.5 items-center justify-center min-w-0 border-x border-surfaceLight-border px-1">
                <span className="text-[9px] sm:text-[10px] text-textGray-tertiary font-semibold uppercase tracking-wider flex items-center gap-1 truncate">
                  <MapPin className="w-3 h-3 text-brand shrink-0" /> LOKASI
                </span>
                <span className="text-[12px] sm:text-[13.5px] font-bold text-textGray-display truncate w-full">{selectedUnit.location}</span>
              </div>

              <div className="flex flex-col gap-0.5 items-center justify-center min-w-0">
                <span className="text-[9px] sm:text-[10px] text-textGray-tertiary font-semibold uppercase tracking-wider flex items-center gap-1 truncate">
                  <ShieldCheck className="w-3 h-3 text-brand shrink-0" /> TELEMATIKA
                </span>
                <span className="text-[12px] sm:text-[13.5px] font-bold text-emerald-600 truncate w-full">Normal / Safe</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default LiveTrackingModal;

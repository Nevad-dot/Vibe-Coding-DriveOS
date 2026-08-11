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
            className="relative w-full max-w-[840px] max-h-[92vh] overflow-y-auto bg-surfaceLight-card border border-surfaceLight-border rounded-3xl shadow-2xl z-10 p-6 md:p-8 flex flex-col gap-5"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-brand uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                  REAL-TIME FLEET TELEMATICS
                </span>
                <h3 className="text-[22px] font-display font-bold text-textGray-display leading-tight">
                  Live GPS Tracking & Diagnostic
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRefresh}
                  className="w-9 h-9 rounded-full border border-surfaceLight-border flex items-center justify-center text-textGray-tertiary hover:text-textGray-display hover:bg-surfaceLight-pearl transition-colors cursor-pointer"
                  title="Refresh GPS Feed"
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-brand" : ""}`} strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-textGray-tertiary hover:text-textGray-display hover:bg-surfaceLight-pearl transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Simulated Live GPS Map View */}
            <div className="relative w-full h-[320px] rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border overflow-hidden flex flex-col justify-between p-4 shadow-inner">
              {/* Top Bar inside Map */}
              <div className="flex items-center justify-between z-10">
                <div className="px-3 py-1.5 rounded-full bg-surfaceLight-card/90 border border-surfaceLight-border text-[12px] font-semibold text-textGray-display backdrop-blur-xs shadow-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>GPS Signals Active (126 Vehicles)</span>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-surfaceLight-card/90 border border-surfaceLight-border text-[12px] font-medium text-textGray-primary backdrop-blur-xs">
                  Updated: Live 1s ago
                </div>
              </div>

              {/* Map Visual Simulation Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                <div className="w-[420px] h-[420px] rounded-full border border-brand/20 animate-ping" />
                <div className="absolute w-[260px] h-[260px] rounded-full border border-brand/40" />
              </div>

              {/* Center Vehicle Location Badge */}
              <div className="relative z-10 self-center bg-surfaceLight-card/95 border border-[#4B8E55] px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-3 backdrop-blur-xs">
                <Navigation className="w-5 h-5 text-brand transform rotate-45 animate-bounce" />
                <div>
                  <span className="text-[13.5px] font-bold text-textGray-display block">
                    {selectedUnit.plate} — {selectedUnit.model}
                  </span>
                  <span className="text-[11.5px] text-textGray-tertiary">
                    {selectedUnit.location} ({selectedUnit.speed})
                  </span>
                </div>
              </div>

              {/* Bottom Unit Switcher Bar */}
              <div className="flex items-center gap-2 overflow-x-auto z-10 pt-2">
                {ACTIVE_TRACKING_UNITS.map((unit) => (
                  <button
                    key={unit.plate}
                    type="button"
                    onClick={() => setSelectedUnit(unit)}
                    className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer whitespace-nowrap border ${
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

            {/* Selected Unit Telematics Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border flex flex-col gap-1">
                <span className="text-[11px] font-medium text-textGray-tertiary uppercase flex items-center gap-1">
                  <Gauge className="w-3.5 h-3.5 text-brand" /> KECEPATAN SAAT INI
                </span>
                <span className="text-[18px] font-bold text-brand">{selectedUnit.speed}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border flex flex-col gap-1">
                <span className="text-[11px] font-medium text-textGray-tertiary uppercase flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-brand" /> LOKASI TERAKHIR
                </span>
                <span className="text-[13.5px] font-semibold text-textGray-display truncate">{selectedUnit.location}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border flex flex-col gap-1">
                <span className="text-[11px] font-medium text-textGray-tertiary uppercase flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand" /> STATUS TELEMATIKA
                </span>
                <span className="text-[13.5px] font-semibold text-emerald-600">Normal / Safe Zone</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default LiveTrackingModal;

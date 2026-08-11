"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, RotateCw, Sun, DoorClosed, Check } from "lucide-react";

interface Viewer360ModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicleName?: string;
  brand?: string;
  imageUrl?: string;
}

const COLORS = [
  { name: "Carrera White", hex: "#F5F5F7", border: "#D1D5DB" },
  { name: "Guards Red", hex: "#DC2626", border: "#B91C1C" },
  { name: "Racing Yellow", hex: "#EAB308", border: "#CA8A04" },
  { name: "Jet Black Metallic", hex: "#18181B", border: "#3F3F46" },
];

const VEHICLE_SPECS: Record<string, { engine: string; hp: string; accel: string; image: string }> = {
  "Porsche 911 GT3": { engine: "4.0L Flat-6", hp: "510 HP", accel: "3.4 Detik", image: "/images/gallery/porsche_gt3.png" },
  "BMW M5 Competition": { engine: "4.4L V8 Turbo", hp: "625 HP", accel: "3.3 Detik", image: "/images/gallery/bmw_m5.png" },
  "Mercedes-AMG GT": { engine: "4.0L V8 Turbo", hp: "585 HP", accel: "3.2 Detik", image: "/images/gallery/mercedes_amg_gt.png" },
  "Audi RS e-tron GT": { engine: "Dual Motor EV", hp: "646 HP", accel: "3.3 Detik", image: "/images/gallery/audi_etron.png" },
  "Ferrari 296 GTB": { engine: "3.0L V6 Hybrid", hp: "830 HP", accel: "2.9 Detik", image: "/images/gallery/ferrari_296.png" },
  "Tesla Model S Plaid": { engine: "Tri-Motor EV", hp: "1,020 HP", accel: "2.1 Detik", image: "/images/gallery/tesla_model_s.png" },
};

export const Viewer360Modal: React.FC<Viewer360ModalProps> = ({
  isOpen,
  onClose,
  vehicleName = "Porsche 911 GT3",
  imageUrl,
}) => {
  const [mounted, setMounted] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [headlightsOn, setHeadlightsOn] = useState(false);
  const [doorsOpen, setDoorsOpen] = useState(false);

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

  const handleRotate = () => {
    setRotationAngle((prev) => (prev + 90) % 360);
  };

  if (!mounted) return null;

  const spec = VEHICLE_SPECS[vehicleName] || {
    engine: "4.0L High-Performance",
    hp: "520 HP",
    accel: "3.2 Detik",
    image: imageUrl || "/images/gallery/porsche_gt3.png",
  };

  const activeImage = imageUrl || spec.image;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Full Screen Solid Dark Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80"
          />

          {/* Modal Container: SOLID OPAQUE SURFACE (No glass transparency) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative w-full max-w-[820px] max-h-[92vh] overflow-y-auto bg-surfaceLight-card border border-surfaceLight-border rounded-3xl shadow-2xl overflow-hidden z-10 p-6 md:p-8 flex flex-col gap-6"
          >
            {/* Header Controls */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-brand uppercase tracking-wider block mb-1">
                  INTERACTIVE 360° SHOWROOM VIEWER
                </span>
                <h3 className="text-[22px] font-display font-bold text-textGray-display leading-none">
                  {vehicleName}
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

            {/* 360 View Stage */}
            <div className="relative w-full h-[300px] md:h-[380px] rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border overflow-hidden flex items-center justify-center p-4">
              {/* Headlights Beam Animation */}
              <AnimatePresence>
                {headlightsOn && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-r from-[#4B8E55]/20 via-[#6BA374]/25 to-transparent pointer-events-none z-10"
                  />
                )}
              </AnimatePresence>

              {/* Dynamic Rotatable Vehicle Image */}
              <motion.div
                animate={{
                  rotateY: rotationAngle,
                  scale: doorsOpen ? 1.04 : 1,
                }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
                className="relative w-full h-full max-w-[640px] max-h-[340px]"
              >
                <Image
                  src={activeImage}
                  alt={vehicleName}
                  fill
                  className="object-contain transform-gpu p-2"
                  priority
                  unoptimized
                />
              </motion.div>

              {/* Angle Indicator Badge */}
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-surfaceLight-card border border-surfaceLight-border text-[12px] font-semibold text-textGray-display shadow-xs flex items-center gap-1.5 z-20">
                <RotateCw className="w-4 h-4 shrink-0 stroke-[1.75] text-[#4B8E55]" />
                <span>Angle: {rotationAngle}°</span>
              </div>

              {/* Controls Toolbar */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-surfaceLight-card border border-surfaceLight-border shadow-lg z-20">
                {/* Rotate 90° */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 450, damping: 25 }}
                  type="button"
                  onClick={handleRotate}
                  className="px-4 py-2 rounded-full bg-surfaceLight-pearl border border-surfaceLight-border text-textGray-display text-[13px] font-medium hover:border-[#4B8E55] transition-colors cursor-pointer inline-flex items-center gap-2 select-none whitespace-nowrap"
                >
                  <RotateCw className="w-4 h-4 shrink-0 stroke-[1.75] text-[#4B8E55]" />
                  <span>Putar 90°</span>
                </motion.button>

                {/* Headlights Toggle */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 450, damping: 25 }}
                  type="button"
                  onClick={() => setHeadlightsOn(!headlightsOn)}
                  className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all cursor-pointer inline-flex items-center gap-2 select-none whitespace-nowrap ${
                    headlightsOn
                      ? "bg-green-gradient-pill text-white shadow-sm"
                      : "bg-surfaceLight-pearl border border-surfaceLight-border text-textGray-display hover:border-[#4B8E55]"
                  }`}
                >
                  <Sun className={`w-4 h-4 shrink-0 stroke-[1.75] ${headlightsOn ? "text-white" : "text-[#4B8E55]"}`} />
                  <span>{headlightsOn ? "Lampu Nyala" : "Nyalakan Lampu"}</span>
                </motion.button>

                {/* Doors Toggle */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 450, damping: 25 }}
                  type="button"
                  onClick={() => setDoorsOpen(!doorsOpen)}
                  className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all cursor-pointer inline-flex items-center gap-2 select-none whitespace-nowrap ${
                    doorsOpen
                      ? "bg-green-gradient-pill text-white shadow-sm"
                      : "bg-surfaceLight-pearl border border-surfaceLight-border text-textGray-display hover:border-[#4B8E55]"
                  }`}
                >
                  <DoorClosed className={`w-4 h-4 shrink-0 stroke-[1.75] ${doorsOpen ? "text-white" : "text-[#4B8E55]"}`} />
                  <span>{doorsOpen ? "Pintu Terbuka" : "Buka Pintu"}</span>
                </motion.button>
              </div>
            </div>

            {/* Bottom Panel: Dynamic Exterior Color Picker & Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-1">
              {/* Color Selector */}
              <div className="flex flex-col gap-2">
                <span className="text-[12px] font-medium text-textGray-primary">
                  Warna Eksterior: <span className="font-semibold text-textGray-display">{selectedColor.name}</span>
                </span>
                <div className="flex items-center gap-3">
                  {COLORS.map((color) => (
                    <motion.button
                      key={color.name}
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.92 }}
                      transition={{ type: "spring", stiffness: 450, damping: 25 }}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color.hex, borderColor: color.border }}
                      className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer relative flex items-center justify-center ${
                        selectedColor.name === color.name ? "ring-2 ring-[#4B8E55] shadow-xs" : "opacity-85 hover:opacity-100"
                      }`}
                    >
                      {selectedColor.name === color.name && (
                        <Check className={`w-3.5 h-3.5 ${color.hex === "#F5F5F7" ? "text-gray-900" : "text-white"}`} strokeWidth={2.5} />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Specs Badge Grid */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-surfaceLight-pearl border border-surfaceLight-border p-2.5 rounded-xl min-w-0">
                  <span className="text-[10.5px] text-textGray-tertiary block font-medium uppercase tracking-tight truncate">MESIN</span>
                  <span className="text-[12.5px] font-bold text-textGray-display truncate block whitespace-nowrap">{spec.engine}</span>
                </div>
                <div className="bg-surfaceLight-pearl border border-surfaceLight-border p-2.5 rounded-xl min-w-0">
                  <span className="text-[10.5px] text-textGray-tertiary block font-medium uppercase tracking-tight truncate">TENAGA</span>
                  <span className="text-[12.5px] font-bold text-brand truncate block whitespace-nowrap">{spec.hp}</span>
                </div>
                <div className="bg-surfaceLight-pearl border border-surfaceLight-border p-2.5 rounded-xl min-w-0">
                  <span className="text-[10.5px] text-textGray-tertiary block font-medium uppercase tracking-tight truncate">0–100 KM/H</span>
                  <span className="text-[12.5px] font-bold text-textGray-display truncate block whitespace-nowrap">{spec.accel}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Viewer360Modal;

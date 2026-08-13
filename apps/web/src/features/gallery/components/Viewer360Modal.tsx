"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  RotateCw,
  Sun,
  DoorOpen,
  Check,
} from "lucide-react";

interface Viewer360ModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicleName: string;
  imageUrl?: string;
}

const VEHICLE_SPECS: Record<
  string,
  {
    engine: string;
    hp: string;
    accel: string;
    image: string;
  }
> = {
  "Porsche 911 GT3": {
    engine: "4.0L Flat-6",
    hp: "510 HP",
    accel: "3.4 Detik",
    image: "/images/gallery/porsche_gt3.png",
  },
  "BMW M5 Competition": {
    engine: "4.4L V8 Twin-Turbo",
    hp: "625 HP",
    accel: "3.3 Detik",
    image: "/images/gallery/bmw_m5.png",
  },
  "Mercedes-AMG GT": {
    engine: "4.0L V8 Biturbo",
    hp: "585 HP",
    accel: "3.6 Detik",
    image: "/images/gallery/mercedes_amg_gt.png",
  },
  "Audi RS e-tron GT": {
    engine: "Dual Electric Motor",
    hp: "646 HP",
    accel: "3.3 Detik",
    image: "/images/gallery/audi_etron.png",
  },
  "Ferrari 296 GTB": {
    engine: "3.0L V6 Hybrid",
    hp: "830 HP",
    accel: "2.9 Detik",
    image: "/images/gallery/ferrari_296.png",
  },
  "Tesla Model S Plaid": {
    engine: "Tri-Motor AWD",
    hp: "1,020 HP",
    accel: "2.1 Detik",
    image: "/images/gallery/tesla_model_s.png",
  },
};

const COLOR_OPTIONS = [
  { name: "Carrera White", hex: "#F8F9FA" },
  { name: "Guards Red", hex: "#E63946" },
  { name: "Racing Yellow", hex: "#FFB703" },
  { name: "Jet Black", hex: "#212529" },
];

export const Viewer360Modal: React.FC<Viewer360ModalProps> = ({
  isOpen,
  onClose,
  vehicleName,
  imageUrl,
}) => {
  const [mounted, setMounted] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [headlightsOn, setHeadlightsOn] = useState(false);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);

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
        <motion.div
          key="viewer360-modal-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4"
        >
          {/* Full Screen Backdrop */}
          <div
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            key="viewer360-modal-card"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative w-full max-w-[720px] max-h-[90vh] overflow-y-auto bg-surfaceLight-card border border-surfaceLight-border rounded-3xl shadow-2xl z-10 p-4 sm:p-7 flex flex-col gap-4"
          >
            {/* Header Controls */}
            <div className="flex items-center justify-between gap-3 pb-2 border-b border-surfaceLight-border">
              <div className="min-w-0 flex-1">
                <span className="text-[10px] sm:text-[11px] font-semibold text-brand uppercase tracking-wider block mb-0.5 truncate">
                  INTERACTIVE 360° SHOWROOM VIEWER
                </span>
                <h3 className="text-[17px] sm:text-[22px] font-display font-bold text-textGray-display leading-tight truncate">
                  {vehicleName}
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

            {/* 360° Viewer Image Showcase Stage */}
            <div className="relative w-full bg-surfaceLight-pearl border border-surfaceLight-border rounded-2xl p-3 flex flex-col items-center justify-center overflow-hidden">
              {/* Headlight Effect Glow */}
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
                className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[260px]"
              >
                <Image
                  src={activeImage}
                  alt={vehicleName}
                  fill
                  className="object-contain transform-gpu p-1"
                  priority
                  unoptimized
                />
              </motion.div>

              {/* Angle Indicator Badge */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-surfaceLight-card border border-surfaceLight-border text-[11px] font-semibold text-textGray-display shadow-xs flex items-center gap-1.5 z-20">
                <RotateCw className="w-3.5 h-3.5 shrink-0 text-[#4B8E55]" />
                <span>Angle: {rotationAngle}°</span>
              </div>
            </div>

            {/* Controls Toolbar */}
            <div className="flex flex-wrap items-center justify-center gap-2 py-0.5">
              {/* Rotate 90° */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.94 }}
                type="button"
                onClick={handleRotate}
                className="px-3.5 py-1.5 rounded-full bg-surfaceLight-pearl border border-surfaceLight-border text-textGray-display text-[12px] font-semibold hover:border-[#4B8E55] transition-colors cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap shadow-2xs"
              >
                <RotateCw className="w-3.5 h-3.5 shrink-0 text-[#4B8E55]" />
                <span>Putar 90°</span>
              </motion.button>

              {/* Headlights Toggle */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.94 }}
                type="button"
                onClick={() => setHeadlightsOn(!headlightsOn)}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap shadow-2xs ${
                  headlightsOn
                    ? "bg-[#4B8E55] text-white border border-[#4B8E55]"
                    : "bg-surfaceLight-pearl border border-surfaceLight-border text-textGray-display hover:border-[#4B8E55]"
                }`}
              >
                <Sun className={`w-3.5 h-3.5 shrink-0 ${headlightsOn ? "text-white animate-spin" : "text-[#4B8E55]"}`} />
                <span>{headlightsOn ? "Lampu Nyala" : "Nyalakan Lampu"}</span>
              </motion.button>

              {/* Doors Toggle */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.94 }}
                type="button"
                onClick={() => setDoorsOpen(!doorsOpen)}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap shadow-2xs ${
                  doorsOpen
                    ? "bg-[#4B8E55] text-white border border-[#4B8E55]"
                    : "bg-surfaceLight-pearl border border-surfaceLight-border text-textGray-display hover:border-[#4B8E55]"
                }`}
              >
                <DoorOpen className="w-3.5 h-3.5 shrink-0" />
                <span>{doorsOpen ? "Tutup Pintu" : "Buka Pintu"}</span>
              </motion.button>
            </div>

            {/* Exterior Color Selector */}
            <div className="flex items-center justify-between gap-2 px-1">
              <span className="text-[12px] font-medium text-textGray-secondary truncate">
                Warna Eksterior: <strong className="text-textGray-display font-semibold">{selectedColor.name}</strong>
              </span>

              <div className="flex items-center gap-2.5 shrink-0">
                {COLOR_OPTIONS.map((color) => {
                  const isSelected = selectedColor.name === color.name;
                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer border ${
                        isSelected
                          ? "border-[#4B8E55] scale-110 shadow-sm ring-2 ring-[#4B8E55]/30"
                          : "border-surfaceLight-border hover:scale-105"
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {isSelected && (
                        <Check
                          className={`w-3.5 h-3.5 ${color.hex === "#F8F9FA" ? "text-black" : "text-white"}`}
                          strokeWidth={2.5}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Vehicle Specs Horizontal 3-Column Grid */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 text-center bg-surfaceLight-pearl border border-surfaceLight-border p-2 sm:p-2.5 rounded-2xl">
              <div className="flex flex-col gap-0.5 items-center justify-center min-w-0">
                <span className="text-[9px] sm:text-[10px] text-textGray-tertiary font-semibold uppercase tracking-wider truncate w-full">MESIN</span>
                <span className="text-[12px] sm:text-[13.5px] font-bold text-textGray-display truncate w-full">{spec.engine}</span>
              </div>

              <div className="flex flex-col gap-0.5 items-center justify-center min-w-0 border-x border-surfaceLight-border px-1">
                <span className="text-[9px] sm:text-[10px] text-textGray-tertiary font-semibold uppercase tracking-wider truncate w-full">TENAGA</span>
                <span className="text-[12px] sm:text-[13.5px] font-bold text-brand truncate w-full">{spec.hp}</span>
              </div>

              <div className="flex flex-col gap-0.5 items-center justify-center min-w-0">
                <span className="text-[9px] sm:text-[10px] text-textGray-tertiary font-semibold uppercase tracking-wider truncate w-full">0–100 KM/H</span>
                <span className="text-[12px] sm:text-[13.5px] font-bold text-textGray-display truncate w-full">{spec.accel}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Viewer360Modal;

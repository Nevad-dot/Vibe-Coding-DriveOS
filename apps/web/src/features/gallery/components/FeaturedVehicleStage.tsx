"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCw, Car, ChevronDown, TrendingUp } from "lucide-react";
import { Viewer360Modal } from "./Viewer360Modal";
import { VehiclePipelineModal } from "./VehiclePipelineModal";

const FEATURED_VEHICLES = [
  {
    id: "v-porsche",
    name: "Porsche 911 GT3",
    tagline: "Ready for showroom floor.",
    details: "3 unit tersedia · Rp 5,8 M · 24 lead aktif",
    image: "/images/gallery/porsche_gt3.png",
  },
  {
    id: "v-bmw",
    name: "BMW M5 Competition",
    tagline: "Ultimate V8 Twin-Turbo Sedan.",
    details: "5 unit tersedia · Rp 3,4 M · 18 lead aktif",
    image: "/images/gallery/bmw_m5.png",
  },
  {
    id: "v-mercedes",
    name: "Mercedes-AMG GT",
    tagline: "Pure Performance Coupe.",
    details: "2 unit tersedia · Rp 4,9 M · 14 lead aktif",
    image: "/images/gallery/mercedes_amg_gt.png",
  },
  {
    id: "v-audi",
    name: "Audi RS e-tron GT",
    tagline: "Electric Supercar Performance.",
    details: "4 unit tersedia · Rp 4,1 M · 12 lead aktif",
    image: "/images/gallery/audi_etron.png",
  },
  {
    id: "v-ferrari",
    name: "Ferrari 296 GTB",
    tagline: "V6 Hybrid Track Beast.",
    details: "1 unit tersedia · Rp 9,6 M · 29 lead aktif",
    image: "/images/gallery/ferrari_296.png",
  },
  {
    id: "v-tesla",
    name: "Tesla Model S Plaid",
    tagline: "Tri-Motor All-Wheel Drive.",
    details: "7 unit tersedia · Rp 2,8 M · 16 lead aktif",
    image: "/images/gallery/tesla_model_s.png",
  },
];

export const FeaturedVehicleStage: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(FEATURED_VEHICLES[0]);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isPipelineOpen, setIsPipelineOpen] = useState(false);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("#featured-vehicle-dropdown-container")) {
        setIsSelectorOpen(false);
      }
    };
    if (isSelectorOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSelectorOpen]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 26, delay: 0.1 }}
        className="bg-surfaceLight-card border border-surfaceLight-border rounded-3xl p-5 sm:p-8 md:p-10 flex flex-col items-center text-center shadow-xs overflow-visible"
      >
        {/* Featured Badge */}
        <span className="text-[10.5px] sm:text-[11px] font-semibold text-brand tracking-[0.08em] uppercase block mb-1.5">
          FEATURED SHOWROOM UNIT
        </span>

        {/* Dynamic Large Headline */}
        <h2 className="text-[24px] sm:text-[32px] md:text-[40px] font-display font-bold tracking-tight text-textGray-display leading-tight mb-2">
          {selectedVehicle.name}.
          <br />
          <span className="text-textGray-secondary font-normal text-[20px] sm:text-[28px] md:text-[34px]">
            {selectedVehicle.tagline}
          </span>
        </h2>

        {/* Subtitle Details */}
        <p className="text-[13px] sm:text-[14px] md:text-[15px] text-textGray-tertiary font-normal mb-5 sm:mb-6 leading-normal">
          {selectedVehicle.details}
        </p>

        {/* Interactive Action Buttons Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 w-full max-w-[500px] mb-6 sm:mb-8 relative z-20">
          {/* Main 360° Viewer Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsViewerOpen(true)}
            type="button"
            className="px-5 py-2.5 rounded-full bg-green-gradient-pill text-white font-semibold text-[13px] sm:text-[13.5px] inline-flex items-center justify-center gap-2 shadow-sm transition-all hover:opacity-95 cursor-pointer select-none whitespace-nowrap"
          >
            <RotateCw className="w-4 h-4 text-white shrink-0" strokeWidth={1.5} />
            <span>Buka 360° Viewer</span>
          </motion.button>

          {/* Tombol Mobil Lain Dropdown Selector */}
          <div id="featured-vehicle-dropdown-container" className="relative">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsSelectorOpen(!isSelectorOpen)}
              type="button"
              className="w-full px-5 py-2.5 rounded-full bg-surfaceLight-card border border-surfaceLight-border text-textGray-display font-semibold text-[13px] sm:text-[13.5px] inline-flex items-center justify-center gap-2 shadow-2xs hover:bg-surfaceLight-pearl transition-colors cursor-pointer select-none whitespace-nowrap"
            >
              <Car className="w-4 h-4 text-[#4B8E55] shrink-0" strokeWidth={1.5} />
              <span>Mobil Lain</span>
              <ChevronDown className={`w-3.5 h-3.5 text-textGray-tertiary transition-transform shrink-0 ${isSelectorOpen ? "rotate-180" : ""}`} />
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isSelectorOpen && (
                <motion.div
                  key="featured-dropdown-menu"
                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 w-[230px] max-w-[calc(100vw-32px)] bg-surfaceLight-card border border-surfaceLight-border rounded-2xl shadow-2xl p-2 flex flex-col gap-1"
                >
                  <span className="px-3 py-1.5 text-[10px] font-semibold text-textGray-muted uppercase tracking-wider block text-left">
                    PILIH UNIT FEATURED 360°
                  </span>
                  {FEATURED_VEHICLES.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => {
                        setSelectedVehicle(v);
                        setIsSelectorOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-[12.5px] font-medium transition-colors flex items-center justify-between cursor-pointer ${
                        selectedVehicle.id === v.id
                          ? "bg-[#4B8E55]/10 text-brand font-semibold"
                          : "text-textGray-display hover:bg-surfaceLight-pearl"
                      }`}
                    >
                      <span className="truncate pr-2">{v.name}</span>
                      {selectedVehicle.id === v.id && (
                        <span className="w-2 h-2 rounded-full bg-[#4B8E55] shrink-0" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Lihat Pipeline Pop-up Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsPipelineOpen(true)}
            type="button"
            className="px-5 py-2.5 rounded-full bg-surfaceLight-pearl border border-surfaceLight-border text-brand font-semibold text-[13px] sm:text-[13.5px] inline-flex items-center justify-center gap-1.5 shadow-2xs hover:bg-surfaceLight-card transition-colors cursor-pointer select-none whitespace-nowrap"
          >
            <TrendingUp className="w-4 h-4 text-[#4B8E55] shrink-0" strokeWidth={1.5} />
            <span>Lihat Pipeline</span>
          </motion.button>
        </div>

        {/* Large Vehicle Spotlight Image Showcase */}
        <div className="relative w-full max-w-[720px] aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-surfaceLight-pearl border border-surfaceLight-border flex items-center justify-center shadow-inner group">
          <Image
            src={selectedVehicle.image}
            alt={selectedVehicle.name}
            fill
            sizes="(max-width: 768px) 100vw, 720px"
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            priority
          />
        </div>
      </motion.div>

      {/* Interactive Modals */}
      <Viewer360Modal
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        vehicleName={selectedVehicle.name}
        imageUrl={selectedVehicle.image}
      />

      <VehiclePipelineModal
        isOpen={isPipelineOpen}
        onClose={() => setIsPipelineOpen(false)}
        vehicleName={selectedVehicle.name}
      />
    </>
  );
};

export default FeaturedVehicleStage;

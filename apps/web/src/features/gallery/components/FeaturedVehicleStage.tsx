"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCw, ChevronRight, Car, ChevronDown } from "lucide-react";
import { Viewer360Modal } from "./Viewer360Modal";

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
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 26, delay: 0.1 }}
        className="bg-surfaceLight-card border border-surfaceLight-border rounded-3xl p-8 md:p-12 flex flex-col items-center text-center shadow-xs overflow-hidden"
      >
        {/* Featured Badge */}
        <span className="text-[11px] font-semibold text-brand tracking-[0.08em] uppercase block mb-2">
          FEATURED SHOWROOM UNIT
        </span>

        {/* Dynamic Large Headline */}
        <h2 className="text-[32px] md:text-[44px] font-display font-semibold tracking-tight text-textGray-display leading-tight mb-2">
          {selectedVehicle.name}.
          <br />
          <span className="text-textGray-secondary font-normal">{selectedVehicle.tagline}</span>
        </h2>

        {/* Subtitle Details */}
        <p className="text-[14px] md:text-[15px] text-textGray-tertiary font-normal mb-6">
          {selectedVehicle.details}
        </p>

        {/* Interactive Action Buttons (Main CTA + Other Vehicles Dropdown + Pipeline Link) */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8 relative">
          {/* Main 360° Viewer Button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={() => setIsViewerOpen(true)}
            type="button"
            className="px-6 py-2.5 rounded-full bg-green-gradient-pill text-white font-medium text-[13.5px] inline-flex items-center gap-2 shadow-sm transition-all hover:opacity-95 cursor-pointer select-none"
          >
            <RotateCw className="w-4 h-4" strokeWidth={1.5} />
            <span>Buka 360° Viewer</span>
          </motion.button>

          {/* Tombol Other (Pilih Mobil Lain) Dropdown Selector */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsSelectorOpen(!isSelectorOpen)}
              type="button"
              className="px-5 py-2.5 rounded-full bg-surfaceLight-card border border-surfaceLight-border text-textGray-display font-medium text-[13.5px] inline-flex items-center gap-2 shadow-2xs hover:bg-surfaceLight-pearl transition-colors cursor-pointer select-none"
            >
              <Car className="w-4 h-4 text-[#4B8E55]" strokeWidth={1.5} />
              <span>Mobil Lain</span>
              <ChevronDown className={`w-3.5 h-3.5 text-textGray-tertiary transition-transform ${isSelectorOpen ? "rotate-180" : ""}`} />
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isSelectorOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-30 w-[240px] bg-surfaceLight-card border border-surfaceLight-border rounded-2xl shadow-xl p-2 flex flex-col gap-1"
                >
                  <span className="px-3 py-1.5 text-[10.5px] font-semibold text-textGray-muted uppercase tracking-wider block">
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
                      className={`w-full text-left px-3 py-2 rounded-xl text-[13px] font-medium transition-colors flex items-center justify-between cursor-pointer ${
                        selectedVehicle.id === v.id
                          ? "bg-[#4B8E55]/10 text-brand font-semibold"
                          : "text-textGray-display hover:bg-surfaceLight-pearl"
                      }`}
                    >
                      <span>{v.name}</span>
                      {selectedVehicle.id === v.id && (
                        <span className="w-2 h-2 rounded-full bg-[#4B8E55]" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/sales"
            className="text-[13.5px] font-medium text-textGray-secondary hover:text-textGray-display inline-flex items-center gap-1 transition-colors cursor-pointer select-none ml-1"
          >
            <span>Lihat pipeline</span>
            <ChevronRight className="w-4 h-4 text-textGray-tertiary" strokeWidth={1.5} />
          </Link>
        </div>

        {/* Studio Featured Image Presentation Box (Clean Full Frame, NO bottom-right pill) */}
        <div
          onClick={() => setIsViewerOpen(true)}
          className="relative w-full max-w-[840px] h-[360px] md:h-[450px] rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800/40 border border-surfaceLight-border shadow-md cursor-pointer group"
        >
          <Image
            src={selectedVehicle.image}
            alt={`${selectedVehicle.name} Studio Presentation`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />
        </div>
      </motion.div>

      {/* Interactive 360 Viewer Modal */}
      <Viewer360Modal
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        vehicleName={selectedVehicle.name}
      />
    </>
  );
};

export default FeaturedVehicleStage;

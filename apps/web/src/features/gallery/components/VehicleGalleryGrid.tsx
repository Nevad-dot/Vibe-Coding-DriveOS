"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { RotateCw, ChevronRight } from "lucide-react";

const GALLERY_ITEMS = [
  {
    name: "Porsche 911 GT3",
    price: "Rp 5,8 M",
    units: "3 unit",
    has360: true,
    image: "/images/gallery/porsche_gt3.png",
  },
  {
    name: "BMW M5 Competition",
    price: "Rp 3,4 M",
    units: "5 unit",
    has360: false,
    image: "/images/gallery/bmw_m5.png",
  },
  {
    name: "Mercedes-AMG GT",
    price: "Rp 4,9 M",
    units: "2 unit",
    has360: false,
    image: "/images/gallery/mercedes_amg_gt.png",
  },
  {
    name: "Audi RS e-tron GT",
    price: "Rp 4,1 M",
    units: "4 unit",
    has360: false,
    image: "/images/gallery/audi_etron.png",
  },
  {
    name: "Ferrari 296 GTB",
    price: "Rp 9,6 M",
    units: "1 unit",
    has360: false,
    image: "/images/gallery/ferrari_296.png",
  },
  {
    name: "Tesla Model S Plaid",
    price: "Rp 2,8 M",
    units: "7 unit",
    has360: false,
    image: "/images/gallery/tesla_model_s.png",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 360, damping: 26 },
  },
};

export const VehicleGalleryGrid: React.FC = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {GALLERY_ITEMS.map((item, idx) => (
        <motion.div
          key={idx}
          variants={cardVariants}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="bg-surfaceLight-card border border-surfaceLight-border rounded-[24px] overflow-hidden shadow-xs hover:border-brand/40 transition-colors flex flex-col"
        >
          {/* Full Bleed Image Container matching card top border radius */}
          <div className="relative h-[220px] w-full bg-gray-100 overflow-hidden">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />

            {/* Top-Right Units Pill Badge */}
            <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-surfaceLight-border text-[12px] font-medium text-textGray-primary shadow-xs z-10">
              {item.units}
            </span>

            {/* Bottom-Left 360° Badge if available */}
            {item.has360 && (
              <span className="absolute bottom-3 left-4 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-surfaceLight-border text-[11px] font-medium text-textGray-primary shadow-xs z-10 inline-flex items-center gap-1">
                <RotateCw className="w-3 h-3 text-textGray-tertiary" />
                <span>360°</span>
              </span>
            )}
          </div>

          {/* Card Body matching exact typography */}
          <div className="p-6 flex flex-col gap-1.5">
            <span className="text-[11px] font-medium text-textGray-muted uppercase tracking-[0.08em] block mb-1">
              AVAILABLE
            </span>

            <h3 className="text-[19px] font-display font-semibold text-textGray-display mb-3 leading-snug">
              {item.name}
            </h3>

            {/* Bottom Row: Thin Price & Detail link (No line) */}
            <div className="flex items-center justify-between">
              <span className="text-[16px] font-normal text-textGray-primary">{item.price}</span>
              <button className="text-[13px] font-medium text-brand hover:underline inline-flex items-center gap-1">
                <span>Detail</span>
                <ChevronRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default VehicleGalleryGrid;

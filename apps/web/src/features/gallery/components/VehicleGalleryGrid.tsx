"use client";

import React from "react";
import Image from "next/image";
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

export const VehicleGalleryGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {GALLERY_ITEMS.map((item, idx) => (
        <div
          key={idx}
          className="bg-surfaceLight-card border border-surfaceLight-border rounded-[24px] overflow-hidden shadow-xs hover:border-brand/40 transition-all duration-200 hover:-translate-y-1 transform-gpu flex flex-col"
        >
          {/* Full Bleed Studio Image Container */}
          <div className="relative h-[220px] w-full bg-gray-100 dark:bg-gray-800/40 overflow-hidden">
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 hover:scale-105 transform-gpu"
            />

            {/* Top-Right Units Pill Badge - Dark Mode Adaptive */}
            <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-surfaceLight-card border border-surfaceLight-border text-[12px] font-medium text-textGray-primary shadow-xs z-10">
              {item.units}
            </span>

            {/* Bottom-Left 360° Badge if available - Dark Mode Adaptive */}
            {item.has360 && (
              <span className="absolute bottom-3 left-4 px-2.5 py-1 rounded-full bg-surfaceLight-card border border-surfaceLight-border text-[11px] font-medium text-textGray-primary shadow-xs z-10 inline-flex items-center gap-1">
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
        </div>
      ))}
    </div>
  );
};

export default VehicleGalleryGrid;

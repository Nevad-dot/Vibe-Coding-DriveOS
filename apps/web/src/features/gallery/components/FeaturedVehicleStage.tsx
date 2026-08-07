"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { RotateCw, ChevronRight } from "lucide-react";

export const FeaturedVehicleStage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 26, delay: 0.1 }}
      className="bg-surfaceLight-card border border-surfaceLight-border rounded-3xl p-8 md:p-12 flex flex-col items-center text-center shadow-xs overflow-hidden"
    >
      {/* Featured Badge */}
      <span className="text-[11px] font-semibold text-green-gradient tracking-[0.08em] uppercase block mb-2">
        FEATURED
      </span>

      {/* Main Large Headline */}
      <h2 className="text-[32px] md:text-[44px] font-display font-semibold tracking-tight text-textGray-display leading-tight mb-2">
        Porsche 911 GT3.
        <br />
        <span className="text-textGray-secondary font-normal">Ready for showroom floor.</span>
      </h2>

      {/* Subtitle Details */}
      <p className="text-[14px] md:text-[15px] text-textGray-tertiary font-normal mb-6">
        3 unit tersedia · Rp 5,8 M · 24 lead aktif
      </p>

      {/* Interactive Action Buttons */}
      <div className="flex items-center gap-4 mb-8">
        <motion.button
          whileHover={{ scale: 1.04, boxShadow: "0 6px 24px rgba(16,185,129,0.45)" }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="px-6 py-2.5 rounded-full bg-green-gradient-pill text-white font-medium text-[13.5px] inline-flex items-center gap-2 shadow-md border border-white/20 transition-colors"
        >
          <RotateCw className="w-4 h-4" strokeWidth={1.5} />
          <span>Buka 360° Viewer</span>
        </motion.button>

        <button className="text-[13.5px] font-medium text-textGray-secondary hover:text-textGray-primary inline-flex items-center gap-1 transition-colors">
          <span>Lihat pipeline</span>
          <ChevronRight className="w-4 h-4 text-textGray-tertiary" strokeWidth={1.5} />
        </button>
      </div>

      {/* Studio Featured Image Presentation Box with Full Bleed object-cover */}
      <div className="relative w-full max-w-[800px] h-[340px] md:h-[440px] rounded-3xl overflow-hidden bg-gray-200 border border-surfaceLight-border shadow-md">
        <Image
          src="/images/gallery/porsche_gt3.png"
          alt="Porsche 911 GT3 Studio Presentation"
          fill
          className="object-cover"
          priority
        />
      </div>
    </motion.div>
  );
};

export default FeaturedVehicleStage;

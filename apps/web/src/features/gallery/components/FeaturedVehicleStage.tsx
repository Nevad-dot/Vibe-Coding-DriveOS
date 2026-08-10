"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { RotateCw, ChevronRight } from "lucide-react";
import { Viewer360Modal } from "./Viewer360Modal";

export const FeaturedVehicleStage: React.FC = () => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

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
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={() => setIsViewerOpen(true)}
            type="button"
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#33613A] via-[#4B8E55] to-[#6BA374] text-white font-medium text-[13.5px] inline-flex items-center gap-2 shadow-sm border border-white/20 transition-all hover:opacity-95 cursor-pointer select-none"
          >
            <RotateCw className="w-4 h-4" strokeWidth={1.5} />
            <span>Buka 360° Viewer</span>
          </motion.button>

          <Link
            href="/sales"
            className="text-[13.5px] font-medium text-textGray-secondary hover:text-textGray-display inline-flex items-center gap-1 transition-colors cursor-pointer select-none"
          >
            <span>Lihat pipeline</span>
            <ChevronRight className="w-4 h-4 text-textGray-tertiary" strokeWidth={1.5} />
          </Link>
        </div>

        {/* Studio Featured Image Presentation Box */}
        <div
          onClick={() => setIsViewerOpen(true)}
          className="relative w-full max-w-[800px] h-[340px] md:h-[440px] rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800/40 border border-surfaceLight-border shadow-md cursor-pointer group"
        >
          <Image
            src="/images/gallery/porsche_gt3.png"
            alt="Porsche 911 GT3 Studio Presentation"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />
          <div className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full bg-surfaceLight-card/90 border border-surfaceLight-border text-[12px] font-semibold text-textGray-display backdrop-blur-xs shadow-xs inline-flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <RotateCw className="w-3.5 h-3.5 text-brand" />
            <span>Klik untuk 360° Viewer</span>
          </div>
        </div>
      </motion.div>

      {/* Interactive 360 Viewer Modal */}
      <Viewer360Modal
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        vehicleName="Porsche 911 GT3"
      />
    </>
  );
};

export default FeaturedVehicleStage;

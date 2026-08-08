"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export const HeroGreeting: React.FC = () => {
  const [userName, setUserName] = useState("Adrian");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = sessionStorage.getItem("user_name");
      if (storedName) {
        const trimmed = storedName.trim();
        const firstName = trimmed.split(" ")[0];
        setUserName(firstName);
      }
    }
  }, []);

  const handleOpenAiModal = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-ai-modal"));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 360, damping: 26 }}
      className="flex flex-col gap-2.5 pb-1"
    >
      {/* Date & Time Badge */}
      <span className="text-[11px] font-medium text-textGray-muted uppercase tracking-[0.08em]">
        SELASA · 23 JULI 2026 · 09:24 WIB
      </span>

      {/* Main Headline with Dynamic First Name & Green Gradient Accent */}
      <h1 className="text-[28px] md:text-[34px] font-display tracking-tight leading-snug">
        <span className="font-semibold text-textGray-display">Good morning, {userName}. </span>
        <span className="font-normal text-textGray-tertiary">Bisnis Anda hari ini — </span>
        <span className="font-bold text-green-gradient">di atas rencana.</span>
      </h1>

      {/* Subtitle */}
      <p className="text-[14px] md:text-[15px] text-textGray-tertiary font-normal">
        Revenue MTD Rp 42,8 M · 128 unit terjual · 6 approval menunggu keputusan Anda.
      </p>

      {/* AI Assistant Pill Button */}
      <div className="pt-1.5 flex items-center">
        <button
          type="button"
          onClick={handleOpenAiModal}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#33613A] via-[#4B8E55] to-[#6BA374] text-white font-medium text-[13.5px] inline-flex items-center justify-center gap-2 shadow-sm transition-opacity hover:opacity-90 cursor-pointer"
        >
          <span>AI Assistant</span>
          <Sparkles className="w-4 h-4 text-white shrink-0" strokeWidth={1.5} />
        </button>
      </div>
    </motion.div>
  );
};

export default HeroGreeting;

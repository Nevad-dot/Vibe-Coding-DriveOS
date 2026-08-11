"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import { SendCampaignModal } from "./SendCampaignModal";

interface CustomersHeroHeaderProps {
  onAddCampaign?: (camp: { name: string; segment: string; channel: string; subject: string }) => void;
}

export const CustomersHeroHeader: React.FC<CustomersHeroHeaderProps> = ({ onAddCampaign }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 360, damping: 26 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-1"
      >
        {/* Title & Subtitle */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-medium text-textGray-muted uppercase tracking-[0.08em]">
            CUSTOMER INTELLIGENCE
          </span>

          <h1 className="text-[28px] md:text-[34px] font-display tracking-tight leading-snug">
            <span className="font-semibold text-textGray-display">
              Siapa yang{" "}
            </span>
            <span className="font-bold text-green-gradient">membeli</span>
            <span className="font-semibold text-textGray-display">
              {" "}
              — dan kenapa.
            </span>
          </h1>

          <p className="text-[14px] md:text-[15px] text-textGray-tertiary font-normal">
            214 pelanggan aktif · CSAT 4,6 / 5 · segmen 35–44 menyumbang 47%
            revenue.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-1 md:pt-0 shrink-0">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={() => setIsModalOpen(true)}
            type="button"
            className="px-6 py-2.5 rounded-full bg-green-gradient-pill text-white font-medium text-[13.5px] inline-flex items-center justify-center gap-2 transition-colors shadow-xs whitespace-nowrap cursor-pointer"
          >
            <Send className="w-4 h-4 shrink-0" strokeWidth={1.5} />
            <span>Kirim Kampanye</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Send Campaign Modal */}
      <SendCampaignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default CustomersHeroHeader;

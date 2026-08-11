"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Megaphone, Users, Target, CheckCircle2, Trash2 } from "lucide-react";
import { campaignsService } from "@/shared/lib/supabase/campaignsService";

export interface CampaignItem {
  id: string;
  name: string;
  segment: string;
  channel: string;
  subject: string;
  date: string;
  status: string;
}

interface CampaignsHistoryPanelProps {
  campaigns: CampaignItem[];
  onDeleteCampaign?: (id: string) => void;
}

export const CampaignsHistoryPanel: React.FC<CampaignsHistoryPanelProps> = ({
  campaigns,
  onDeleteCampaign,
}) => {
  const handleDelete = async (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Hapus kampanye "${name}" dari database?`)) {
      await campaignsService.delete(id);
      if (onDeleteCampaign) onDeleteCampaign(id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 22 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 26 }}
      className="bg-surfaceLight-card border border-surfaceLight-border p-6 rounded-2xl flex flex-col shadow-xs"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-5">
        <div>
          <span className="text-[11px] font-semibold text-brand uppercase tracking-wider block mb-1 flex items-center gap-1.5">
            <Megaphone className="w-3.5 h-3.5 text-[#4B8E55]" />
            DATABASE KAMPANYE PENGIRIMAN
          </span>
          <h3 className="text-[18px] font-display font-semibold text-textGray-display">
            Riwayat Kampanye Active & Sent ({campaigns.length})
          </h3>
        </div>
        <span className="text-[12px] font-medium text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
          Live Database Feed
        </span>
      </div>

      {/* Campaigns Grid / List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence initial={false}>
          {campaigns.map((camp) => (
            <motion.div
              key={camp.id}
              initial={{ opacity: 0, scale: 0.9, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="p-4 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border flex flex-col justify-between gap-3 shadow-2xs hover:border-[#4B8E55]/40 transition-all relative group"
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[14px] font-bold text-textGray-display truncate pr-6">
                    {camp.name}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-600 border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {camp.status}
                    </span>
                    <button
                      type="button"
                      title="Hapus Kampanye"
                      onClick={(e) => handleDelete(camp.id, camp.name, e)}
                      className="w-7 h-7 rounded-full bg-surfaceLight-card border border-surfaceLight-border text-textGray-tertiary hover:text-red-600 hover:border-red-500/30 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-[12.5px] font-medium text-textGray-primary line-clamp-1">
                  &quot;{camp.subject}&quot;
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-surfaceLight-border text-[11.5px] text-textGray-tertiary">
                <span className="flex items-center gap-1 truncate">
                  <Users className="w-3.5 h-3.5 text-[#4B8E55] shrink-0" />
                  <span className="truncate">{camp.segment}</span>
                </span>
                <span className="flex items-center gap-1 truncate justify-end">
                  <Target className="w-3.5 h-3.5 text-[#4B8E55] shrink-0" />
                  <span>{camp.channel}</span>
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CampaignsHistoryPanel;

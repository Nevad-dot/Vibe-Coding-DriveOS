"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Megaphone, Users, Target, CheckCircle2, Trash2, RotateCcw } from "lucide-react";
import { campaignsService } from "@/shared/lib/supabase/campaignsService";
import { ConfirmDeleteModal } from "@/shared/components/ConfirmDeleteModal";

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
  onRestoreCampaign?: (campaign: CampaignItem) => void;
}

export const CampaignsHistoryPanel: React.FC<CampaignsHistoryPanelProps> = ({
  campaigns,
  onDeleteCampaign,
  onRestoreCampaign,
}) => {
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const [lastDeletedCampaign, setLastDeletedCampaign] = useState<CampaignItem | null>(null);

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    const targetItem = campaigns.find((c) => c.id === deleteTarget.id);
    await campaignsService.delete(deleteTarget.id);
    if (targetItem) {
      setLastDeletedCampaign(targetItem);
    }
    if (onDeleteCampaign) onDeleteCampaign(deleteTarget.id);
    setDeleteTarget(null);
  };

  const handleUndoDelete = async () => {
    if (!lastDeletedCampaign) return;
    const restoredRecord = await campaignsService.create({
      name: lastDeletedCampaign.name,
      segment: lastDeletedCampaign.segment,
      channel: lastDeletedCampaign.channel,
      subject: lastDeletedCampaign.subject,
      status: lastDeletedCampaign.status,
    });

    const restoredItem: CampaignItem = {
      id: restoredRecord.id,
      name: restoredRecord.name,
      segment: restoredRecord.segment,
      channel: restoredRecord.channel,
      subject: restoredRecord.subject,
      date: "Baru saja",
      status: restoredRecord.status,
    };

    if (onRestoreCampaign) {
      onRestoreCampaign(restoredItem);
    }
    setLastDeletedCampaign(null);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 22 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 26 }}
        className="bg-surfaceLight-card border border-surfaceLight-border p-4 sm:p-6 rounded-2xl flex flex-col shadow-xs min-w-0"
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-surfaceLight-border pb-3">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[10px] sm:text-[11px] font-semibold text-brand uppercase tracking-wider block flex items-center gap-1.5 leading-snug">
              <Megaphone className="w-3.5 h-3.5 text-[#4B8E55] shrink-0" />
              DATABASE KAMPANYE PENGIRIMAN
            </span>
            <h3 className="text-[16px] sm:text-[18px] font-display font-bold text-textGray-display leading-tight break-words">
              Riwayat Kampanye Active & Sent ({campaigns.length})
            </h3>
          </div>
          <span className="inline-flex items-center w-fit text-[11px] font-semibold text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full whitespace-nowrap shrink-0">
            Live Database
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
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-[14px] font-bold text-textGray-display leading-snug break-words flex-1 pr-2">
                      {camp.name}
                    </span>
                    <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-600 border border-emerald-500/30 flex items-center gap-1 whitespace-nowrap">
                        <CheckCircle2 className="w-3 h-3 shrink-0" />
                        {camp.status}
                      </span>
                      <button
                        type="button"
                        title="Hapus Kampanye"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteTarget({ id: camp.id, name: camp.name });
                        }}
                        className="w-7 h-7 rounded-full bg-surfaceLight-card border border-surfaceLight-border text-textGray-tertiary hover:text-red-600 hover:border-red-500/30 flex items-center justify-center transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-[12.5px] font-medium text-textGray-primary leading-normal italic">
                    &quot;{camp.subject}&quot;
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-surfaceLight-border text-[11.5px] text-textGray-tertiary">
                  <span className="flex items-center gap-1.5 min-w-0">
                    <Users className="w-3.5 h-3.5 text-[#4B8E55] shrink-0" />
                    <span className="truncate font-medium">{camp.segment}</span>
                  </span>
                  <span className="flex items-center gap-1.5 min-w-0">
                    <Target className="w-3.5 h-3.5 text-[#4B8E55] shrink-0" />
                    <span className="font-medium">{camp.channel}</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Custom Confirmation Delete Modal for Campaigns */}
      <ConfirmDeleteModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title="Konfirmasi Hapus Kampanye"
        itemName={deleteTarget?.name || "Kampanye"}
        description="Tindakan ini akan menghapus riwayat kampanye pengiriman dari database DriveOS secara permanen."
      />

      {/* Floating Undo Delete Toast Notification - Positioned Bottom-Right */}
      <AnimatePresence>
        {lastDeletedCampaign && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 450, damping: 30 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[999] w-[calc(100%-2rem)] sm:w-auto max-w-[calc(100%-2rem)] sm:max-w-md px-4 py-3 rounded-2xl bg-surfaceLight-card dark:bg-[#16181F] border border-surfaceLight-border dark:border-[#222F43] shadow-2xl flex items-center justify-between gap-3 text-[13px]"
          >
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <span className="w-2 h-2 rounded-full bg-[#4B8E55] shrink-0 animate-pulse" />
              <span className="text-textGray-display font-medium text-[12.5px] sm:text-[13px] truncate">
                Kampanye <strong className="font-bold text-textGray-display">{lastDeletedCampaign.name}</strong> dihapus.
              </span>
            </div>

            <button
              type="button"
              onClick={handleUndoDelete}
              className="px-3.5 py-1.5 rounded-full bg-green-gradient-pill text-white font-semibold text-[12px] inline-flex items-center justify-center gap-1.5 shadow-xs hover:opacity-95 cursor-pointer shrink-0 whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Batal Hapus</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CampaignsHistoryPanel;

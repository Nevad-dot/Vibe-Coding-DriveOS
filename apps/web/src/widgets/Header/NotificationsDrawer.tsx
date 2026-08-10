"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Check, Car, Wrench, ShieldCheck, CheckCircle2 } from "lucide-react";

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onClearUnread: () => void;
}

const NOTIFICATIONS = [
  { id: "n1", title: "Restock Order Disetujui", desc: "Order Porsche 911 GT3 (3 Unit) telah disetujui tim direksi.", time: "10m lalu", icon: Car, unread: true },
  { id: "n2", title: "Booking Servis Baru", desc: "BMW X7 (B 1088 RFS) dijadwalkan di Bay 01 Express.", time: "25m lalu", icon: Wrench, unread: true },
  { id: "n3", title: "Telematika Safe Alert", desc: "Armada Jakarta Selatan selesai inspeksi kesehatan bulanan.", time: "1 jam lalu", icon: ShieldCheck, unread: false },
  { id: "n4", title: "Laporan Keuangan Q3 Siap", desc: "Laporan P&L & Cash Flow bulan Agustus 2026 telah di-export.", time: "3 jam lalu", icon: CheckCircle2, unread: false },
];

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({ isOpen, onClose, onClearUnread }) => {
  const [items, setItems] = useState(NOTIFICATIONS);

  const handleMarkAllRead = () => {
    setItems((prev) => prev.map((item) => ({ ...item, unread: false })));
    onClearUnread();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: -8 }}
          transition={{ type: "spring", stiffness: 420, damping: 28 }}
          className="absolute right-0 top-[48px] w-[340px] bg-surfaceLight-card border border-surfaceLight-border rounded-2xl shadow-xl p-3 z-50 flex flex-col gap-2 origin-top-right"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-2 py-1.5 border-b border-surfaceLight-border">
            <span className="font-display font-semibold text-[14.5px] text-textGray-display flex items-center gap-2">
              <Bell className="w-4 h-4 text-brand" />
              Notifikasi System
            </span>

            <button
              type="button"
              onClick={handleMarkAllRead}
              className="text-[11.5px] font-medium text-brand hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Tandai dibaca</span>
            </button>
          </div>

          {/* List */}
          <div className="max-h-[300px] overflow-y-auto flex flex-col gap-1.5 pr-0.5">
            {items.map((n) => {
              const Icon = n.icon;
              return (
                <div
                  key={n.id}
                  className={`p-2.5 rounded-xl border transition-colors flex items-start gap-3 ${
                    n.unread
                      ? "bg-surfaceLight-pearl/80 border-[#4B8E55]/30"
                      : "bg-surfaceLight-card border-surfaceLight-border opacity-75"
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#4B8E55]/15 text-[#4B8E55] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                  </div>

                  <div className="flex flex-col gap-0.5 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-bold text-textGray-display">{n.title}</span>
                      <span className="text-[10.5px] text-textGray-tertiary">{n.time}</span>
                    </div>
                    <p className="text-[12px] text-textGray-tertiary leading-snug">{n.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationsDrawer;

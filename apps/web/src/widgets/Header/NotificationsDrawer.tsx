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
          className="absolute right-0 top-[52px] w-[360px] bg-surfaceLight-card border border-surfaceLight-border rounded-3xl shadow-2xl p-5 flex flex-col gap-4 z-50 origin-top-right"
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-3 border-b border-surfaceLight-border">
            <span className="font-display font-semibold text-[15px] text-textGray-display flex items-center gap-2">
              <Bell className="w-4 h-4 text-brand" strokeWidth={1.75} />
              Notifikasi System
            </span>

            <button
              type="button"
              onClick={handleMarkAllRead}
              className="text-[12px] font-medium text-brand hover:underline flex items-center gap-1 cursor-pointer shrink-0 whitespace-nowrap"
            >
              <Check className="w-3.5 h-3.5" strokeWidth={2} />
              <span>Tandai dibaca</span>
            </button>
          </div>

          {/* Notification List with Consistent Padding & Gaps */}
          <div className="max-h-[320px] overflow-y-auto flex flex-col gap-2.5 pr-1">
            {items.map((n) => {
              const Icon = n.icon;
              return (
                <div
                  key={n.id}
                  className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3.5 ${
                    n.unread
                      ? "bg-surfaceLight-pearl border-surfaceLight-border shadow-2xs"
                      : "bg-surfaceLight-card border-surfaceLight-border opacity-70"
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-surfaceLight-card border border-surfaceLight-border text-brand flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                  </div>

                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[13.5px] font-semibold text-textGray-display truncate leading-snug">{n.title}</span>
                      <span className="text-[11px] text-textGray-tertiary shrink-0 font-normal">{n.time}</span>
                    </div>
                    <p className="text-[12.5px] text-textGray-tertiary leading-relaxed font-normal">{n.desc}</p>
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

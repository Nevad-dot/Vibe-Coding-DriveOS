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

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="notifications-drawer-card"
          initial={{ opacity: 0, scale: 0.94, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: -8 }}
          transition={{ type: "spring", stiffness: 420, damping: 28 }}
          className="fixed inset-x-3 top-[68px] sm:absolute sm:inset-auto sm:right-0 sm:top-[52px] sm:w-[380px] max-w-[calc(100vw-24px)] bg-surfaceLight-card border border-surfaceLight-border rounded-3xl shadow-2xl p-4 sm:p-5 flex flex-col gap-4 z-[90] origin-top-right mx-auto"
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-3 border-b border-surfaceLight-border">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-brand" strokeWidth={1.5} />
              <h3 className="text-[15px] font-semibold text-textGray-display leading-tight">
                Notifikasi System
              </h3>
            </div>
            <button
              type="button"
              onClick={handleMarkAllRead}
              className="text-[12px] font-medium text-brand hover:text-brand-hover flex items-center gap-1 transition-colors cursor-pointer select-none"
            >
              <Check className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>Tandai dibaca</span>
            </button>
          </div>

          {/* Notifications Feed List */}
          <div className="flex flex-col gap-2.5 max-h-[320px] overflow-y-auto pr-1">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className={`p-3 rounded-2xl border transition-all flex items-start gap-3 ${
                    item.unread
                      ? "bg-surfaceLight-pearl border-surfaceLight-border"
                      : "bg-surfaceLight-card border-surfaceLight-border/60 opacity-75"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-surfaceLight-card border border-surfaceLight-border text-brand flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                  </div>

                  <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[13px] font-semibold text-textGray-display truncate leading-tight">
                        {item.title}
                      </span>
                      <span className="text-[10.5px] text-textGray-tertiary font-normal shrink-0">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-[12px] text-textGray-tertiary leading-relaxed font-normal line-clamp-2">
                      {item.desc}
                    </p>
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

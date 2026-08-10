"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Car, Users, TrendingUp, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SEARCH_DATABASE = [
  { id: "s1", type: "Vehicle", title: "Porsche 911 GT3", subtitle: "Rp 5,8 M · 3 Unit Tersedia · Showroom Floor", path: "/gallery", icon: Car },
  { id: "s2", type: "Vehicle", title: "BMW M5 Competition", subtitle: "Rp 3,4 M · 5 Unit Tersedia · Ready Stock", path: "/gallery", icon: Car },
  { id: "s3", type: "Customer", title: "Bpk. Hendra Wijaya", subtitle: "PT Trans Logistik · Hot Lead VIP", path: "/customers", icon: Users },
  { id: "s4", type: "Customer", title: "Ibu Sinta Pramudita", subtitle: "Customer Aktif · Jakarta Selatan", path: "/customers", icon: Users },
  { id: "s5", type: "Sales Deal", title: "Deal #1084 — Porsche 911 GT3", subtitle: "Rp 5.800.000.000 · Negosiasi SPK", path: "/sales", icon: TrendingUp },
  { id: "s6", type: "Sales Deal", title: "Deal #1085 — BMW X7 M Sport", subtitle: "Rp 2.450.000.000 · SPK Diterbitkan", path: "/sales", icon: TrendingUp },
  { id: "s7", type: "Page", title: "Fleet & Logistics Intelligence", subtitle: "126 Unit Active · Real-time GPS Tracking", path: "/fleet", icon: ShieldCheck },
  { id: "s8", type: "Page", title: "Service & Workshop Management", subtitle: "18 Bay Active · Booking Servis", path: "/service", icon: ShieldCheck },
];

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard shortcut listener to close on ESC
  useEffect(() => {
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

  if (!mounted) return null;

  const filteredResults = query.trim() === ""
    ? SEARCH_DATABASE.slice(0, 5)
    : SEARCH_DATABASE.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          item.type.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelect = (path: string) => {
    router.push(path);
    onClose();
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 p-4">
          {/* Full Screen Dark Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
          />

          {/* Search Command Palette Container with Consistent Spacing Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -16 }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
            className="relative w-full max-w-[640px] bg-surfaceLight-card border border-surfaceLight-border rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col"
          >
            {/* Search Input Header */}
            <div className="px-5 py-4 border-b border-surfaceLight-border flex items-center gap-3.5">
              <Search className="w-5 h-5 text-brand shrink-0" strokeWidth={1.75} />
              <input
                type="text"
                autoFocus
                placeholder="Cari kendaraan, pelanggan, deal, atau halaman..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-[15px] font-medium text-textGray-display placeholder:text-textGray-tertiary/60 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="p-1 rounded-full text-textGray-tertiary hover:text-textGray-display hover:bg-surfaceLight-pearl transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="text-[11px] font-semibold text-textGray-tertiary bg-surfaceLight-pearl border border-surfaceLight-border px-2 py-1 rounded-lg shadow-xs select-none shrink-0">
                ESC
              </kbd>
            </div>

            {/* Results Section with Uniform Padding & Gaps */}
            <div className="flex flex-col max-h-[380px] overflow-y-auto">
              <span className="px-5 pt-3.5 pb-2 text-[11px] font-semibold text-textGray-muted uppercase tracking-wider block">
                {query.trim() ? "HASIL PENCARIAN" : "REKOMENDASI CEPAT"}
              </span>

              {filteredResults.length === 0 ? (
                <div className="py-10 text-center text-[14px] text-textGray-tertiary font-medium">
                  Tidak ditemukan hasil untuk &quot;{query}&quot;
                </div>
              ) : (
                <div className="px-3 pb-3 flex flex-col gap-2">
                  {filteredResults.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelect(item.path)}
                        className="flex items-center justify-between p-3.5 rounded-2xl bg-surfaceLight-pearl border border-surfaceLight-border hover:border-[#4B8E55] transition-all group cursor-pointer text-left w-full shadow-2xs"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-surfaceLight-card border border-surfaceLight-border text-brand flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                            <Icon className="w-5 h-5" strokeWidth={1.5} />
                          </div>
                          <div className="flex flex-col gap-0.5 min-w-0">
                            <span className="text-[14px] font-semibold text-textGray-display group-hover:text-brand transition-colors truncate leading-tight">
                              {item.title}
                            </span>
                            <span className="text-[12px] text-textGray-tertiary font-normal truncate leading-tight">
                              {item.subtitle}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0 ml-3">
                          <span className="text-[11px] font-medium px-3 py-1 rounded-full bg-surfaceLight-card border border-surfaceLight-border text-textGray-primary shadow-2xs">
                            {item.type}
                          </span>
                          <ArrowRight className="w-4 h-4 text-textGray-tertiary group-hover:text-brand transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-3.5 bg-surfaceLight-pearl border-t border-surfaceLight-border flex items-center justify-between text-[12px] text-textGray-tertiary">
              <span className="flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-brand" />
                Navigasi instan dengan ⌘K / Ctrl+K
              </span>
              <span className="font-semibold text-brand">DriveOS Intelligence Engine</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default GlobalSearchModal;

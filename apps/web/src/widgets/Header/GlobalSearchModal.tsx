"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Car, Users, TrendingUp, ArrowRight, ShieldCheck, Sparkles, Wrench, DollarSign, FileText, Package } from "lucide-react";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Curated Comprehensive Search Index covering key items across all modules
const SEARCH_DATABASE = [
  // 1. Vehicles
  { id: "v1", type: "Kendaraan", title: "Porsche 911 GT3", subtitle: "Rp 5,8 M · 3 Unit Tersedia · Showroom Jakarta", path: "/gallery", icon: Car, keywords: "porsche gt3 mobil galeri showroom" },
  { id: "v2", type: "Kendaraan", title: "BMW M5 Competition", subtitle: "Rp 3,4 M · 5 Unit Tersedia · Ready Stock", path: "/gallery", icon: Car, keywords: "bmw m5 sedan mobil galeri" },
  { id: "v3", type: "Kendaraan", title: "Mercedes-AMG GT", subtitle: "Rp 4,9 M · 2 Unit Tersedia · Coupe", path: "/gallery", icon: Car, keywords: "mercedes amg gt coupe" },
  { id: "v4", type: "Kendaraan", title: "Audi RS e-tron GT", subtitle: "Rp 4,1 M · 4 Unit Tersedia · EV Electric", path: "/gallery", icon: Car, keywords: "audi etron listrik ev" },

  // 2. Customers
  { id: "c1", type: "Pelanggan", title: "Bpk. Hendra Wijaya", subtitle: "PT Trans Logistik · Hot Lead VIP · CSAT 5.0", path: "/customers", icon: Users, keywords: "hendra pt trans logistik customer vip" },
  { id: "c2", type: "Pelanggan", title: "Ibu Sinta Pramudita", subtitle: "Customer Aktif · Jakarta Selatan", path: "/customers", icon: Users, keywords: "sinta pelanggan aktif" },
  { id: "c3", type: "Pelanggan", title: "PT Astra Logistik", subtitle: "Corporate Fleet Account · 12 Unit Active", path: "/customers", icon: Users, keywords: "astra armada corporate" },

  // 3. Sales Deals
  { id: "d1", type: "Sales Deal", title: "Deal #1084 — Porsche 911 GT3", subtitle: "Rp 5.800.000.000 · Tahap Negosiasi SPK", path: "/sales", icon: TrendingUp, keywords: "deal porsche 911 negosiasi" },
  { id: "d2", type: "Sales Deal", title: "Deal #1085 — BMW X7 M Sport", subtitle: "Rp 2.450.000.000 · SPK Diterbitkan", path: "/sales", icon: TrendingUp, keywords: "deal bmw x7 spk" },

  // 4. Inventory & Restock
  { id: "i1", type: "Inventory", title: "Restock Order #RST-2026-09", subtitle: "Porsche 911 GT3 · 3 Unit Restock Pending", path: "/inventory", icon: Package, keywords: "restock order stok inventory" },
  { id: "i2", type: "Inventory", title: "Stok Showroom Jakarta Pusat", subtitle: "14 Unit Available · High Turnover", path: "/inventory", icon: Package, keywords: "stok cabang jakarta pusat" },

  // 5. Fleet & Telematics
  { id: "f1", type: "Fleet Unit", title: "Unit B 1088 RFS — BMW X7", subtitle: "Driver Arif · On-Route Tol Dalam Kota", path: "/fleet", icon: ShieldCheck, keywords: "plat b1088rfs bmw fleet driver arif" },
  { id: "f2", type: "Fleet Unit", title: "Unit B 2291 TNG — Mercedes S 450", subtitle: "In Service Workshop · Servis Rutin", path: "/fleet", icon: ShieldCheck, keywords: "plat b2291tng mercedes fleet" },

  // 6. Service & Workshop
  { id: "s1", type: "Servis", title: "Bay 01 Express — Servis Berkala", subtitle: "BMW X7 (B 1088 RFS) · Jam 09:00 WIB", path: "/service", icon: Wrench, keywords: "bay 01 servis bengkel workshop" },
  { id: "s2", type: "Servis", title: "Bay 02 Heavy Repair — Inspeksi Mesin", subtitle: "Porsche Cayenne (D 1402 ABD)", path: "/service", icon: Wrench, keywords: "bay 02 perbaikan porsche" },

  // 7. Financial & Reports
  { id: "fn1", type: "Keuangan", title: "Laporan Financial Q3 2026", subtitle: "Revenue Rp 42,8 M · Margin 18,4%", path: "/financial", icon: DollarSign, keywords: "keuangan p&l margin revenue" },
  { id: "rp1", type: "Laporan", title: "Executive Summary Bulanan", subtitle: "Ringkasan Performa Direksi & Investor", path: "/reports", icon: FileText, keywords: "laporan executive summary pdf excel" },
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
    ? SEARCH_DATABASE.slice(0, 6)
    : SEARCH_DATABASE.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          item.type.toLowerCase().includes(query.toLowerCase()) ||
          item.keywords.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelect = (path: string) => {
    router.push(path);
    onClose();
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Full Screen Dark Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
          />

          {/* Search Command Palette Container Centered in Viewport */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
            className="relative w-full max-w-[640px] bg-surfaceLight-card border border-surfaceLight-border rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col"
          >
            {/* Search Input Header */}
            <div className="px-5 py-3.5 border-b border-surfaceLight-border flex items-center gap-3">
              <Search className="w-[18px] h-[18px] text-textGray-tertiary shrink-0" strokeWidth={1.5} />
              <input
                type="text"
                autoFocus
                placeholder="Cari kendaraan, pelanggan, deal, atau servis..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-[14.5px] font-normal text-textGray-display placeholder:text-textGray-placeholder focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="p-1 rounded-full text-textGray-tertiary hover:text-textGray-display hover:bg-surfaceLight-pearl transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" strokeWidth={1.5} />
                </button>
              )}
              <kbd className="text-[10px] font-medium text-textGray-tertiary bg-surfaceLight-pearl border border-surfaceLight-border px-1.5 py-0.5 rounded-md shadow-xs select-none shrink-0 font-mono">
                ESC
              </kbd>
            </div>

            {/* Results Section */}
            <div className="flex flex-col max-h-[400px] overflow-y-auto">
              <span className="px-5 pt-3.5 pb-2 text-[11px] font-semibold text-textGray-muted uppercase tracking-wider block">
                {query.trim() ? `HASIL PENCARIAN (${filteredResults.length})` : "ITEMS & DATA UTAMA"}
              </span>

              {filteredResults.length === 0 ? (
                <div className="py-10 text-center text-[14px] text-textGray-tertiary font-medium">
                  Tidak ditemukan data untuk &quot;{query}&quot;
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

            {/* Clean Minimalist Footer */}
            <div className="px-5 py-3 bg-surfaceLight-pearl border-t border-surfaceLight-border flex items-center justify-between text-[11.5px] text-textGray-tertiary">
              <div className="flex items-center gap-3 font-normal">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded-md bg-surfaceLight-card border border-surfaceLight-border font-mono text-[10px] text-textGray-secondary">↵</kbd>
                  <span>Buka</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded-md bg-surfaceLight-card border border-surfaceLight-border font-mono text-[10px] text-textGray-secondary">ESC</kbd>
                  <span>Tutup</span>
                </span>
              </div>
              <span className="font-medium text-textGray-muted text-[11.5px] tracking-tight">
                DriveOS Search
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default GlobalSearchModal;

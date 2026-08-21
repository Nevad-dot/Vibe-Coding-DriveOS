"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  TrendingUp,
  Car,
  Users,
  Wrench,
  Truck,
  DollarSign,
  Search,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Layers,
  Lock,
  Building2,
  Menu,
  X,
  Sun,
  Moon,
  RotateCw,
  FileText,
  Activity,
  AlertCircle
} from "lucide-react";

import { VehicleDetailModal } from "@/features/gallery/components/VehicleDetailModal";
import { Viewer360Modal } from "@/features/gallery/components/Viewer360Modal";

export const LandingPage: React.FC = () => {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(true);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("product");

  // Active Interactive States
  const [activeExecTab, setActiveExecTab] = useState<"kpi" | "branch" | "margin">("kpi");
  const [activeRole, setActiveRole] = useState<number>(0);
  const [activeAiQuery, setActiveAiQuery] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedDetailVehicle, setSelectedDetailVehicle] = useState<any>(null);
  const [selected360Vehicle, setSelected360Vehicle] = useState<any>(null);

  const isNavClickingRef = useRef<boolean>(false);
  const navClickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Theme Sync & ScrollSpy Listener
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDarkMode = document.documentElement.classList.contains("dark");
      setIsDark(isDarkMode);

      const sectionIds = ["product", "solutions", "intelligence", "roles", "security"];
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);

        // Skip updating activeSection during smooth scroll triggered by nav click to eliminate stutter
        if (isNavClickingRef.current) return;

        const scrollPosition = window.scrollY + 140;
        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const el = document.getElementById(sectionIds[i]);
          if (el) {
            const top = el.offsetTop;
            if (scrollPosition >= top) {
              setActiveSection(sectionIds[i]);
              break;
            }
          }
        }
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    isNavClickingRef.current = true;
    setActiveSection(sectionId);

    if (navClickTimeoutRef.current) {
      clearTimeout(navClickTimeoutRef.current);
    }

    if (typeof window !== "undefined") {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const yOffset = -80; // Offset for sticky navbar header
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 50);
    }

    // Unlock scrollspy after smooth scroll animation completes (850ms)
    navClickTimeoutRef.current = setTimeout(() => {
      isNavClickingRef.current = false;
    }, 850);
  };

  const toggleTheme = () => {
    if (typeof window !== "undefined") {
      if (isDark) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("driveos_theme_mode", "light");
        setIsDark(false);
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("driveos_theme_mode", "dark");
        setIsDark(true);
      }
    }
  };

  // AI Prompt Demo Data
  const aiPrompts = [
    {
      q: "Which vehicles need attention today?",
      a: "Berdasarkan analisis real-time, 3 unit Porsche GT3 memiliki masa simpan >45 hari. Disarankan penyesuaian promo leasing. 2 unit Audi e-tron GT membutuhkan servis berkala sebelum serah terima.",
      metric: "3 Unit Perlu Perhatian",
      badge: "Inventory & Service"
    },
    {
      q: "Show me sales forecast for Next Quarter",
      a: "Proyeksi penjualan Q3 diperkirakan naik 14.8% (Rp 48.2M), didorong tren permintaan EV premium di Cabang Jakarta Central dan Surabaya.",
      metric: "+14.8% Proyeksi Pertumbuhan",
      badge: "Sales Intelligence"
    },
    {
      q: "Which branch is outperforming margin targets?",
      a: "Cabang Jakarta Central HQ memimpin dengan gross margin 18.2%, diikuti Surabaya (16.4%). Unit Porsche GT3 menyumbang margin terbesar.",
      metric: "18.2% Gross Margin",
      badge: "Financial Overview"
    }
  ];

  // Role Features
  const roles = [
    {
      title: "Dealer Owner",
      desc: "Visibilitas tingkat tinggi terhadap seluruh performa bisnis, profitabilitas cabang, dan arah strategis.",
      icon: Building2,
      highlights: ["Executive KPI Real-time", "Margin & Profit Analysis", "Multi-Branch Governance", "AI Predictive Forecast"]
    },
    {
      title: "Sales Consultant",
      desc: "Manajemen lead prospek, pipeline penjualan, dan pengingat follow-up otomatis.",
      icon: TrendingUp,
      highlights: ["Pipeline Kanban View", "Instant Test Drive Booking", "Automated Lead Scoring", "WhatsApp Follow-up Reminders"]
    },
    {
      title: "Inventory Manager",
      desc: "Kontrol stok kendaraan, alokasi antar-cabang, dan pelacakan status operasional.",
      icon: Car,
      highlights: ["Live Stock Map", "Aging Inventory Alerts", "360° Asset Inspector", "Automated Restock Triggers"]
    },
    {
      title: "Service Advisor",
      desc: "Penjadwalan servis, pelacakan pengerjaan mekanik, dan estimasi biaya perbaikan.",
      icon: Wrench,
      highlights: ["Work Order Scheduling", "Technician Workload Chart", "Parts Availability Check", "Customer Progress SMS"]
    },
    {
      title: "Fleet & Delivery",
      desc: "Monitoring unit pengiriman kendaraan dan logistik operasional antar-showroom.",
      icon: Truck,
      highlights: ["Live Dispatch Tracker", "Carrier Capacity Map", "Proof-of-Delivery Sign", "Route Optimization"]
    },
    {
      title: "Finance Team",
      desc: "Monitoring kas, revenue margin, invoicing, dan laporan konsolidasi keuangan.",
      icon: DollarSign,
      highlights: ["Automated Invoicing", "Leasing Approval Track", "Branch P&L Comparison", "Audit Logs & Export"]
    }
  ];

  // Branch Data
  const branches = [
    { name: "Jakarta Central HQ", units: 142, revenue: "Rp 24,8 M", growth: "+18.2%", status: "Optimal" },
    { name: "Surabaya Showroom", units: 110, revenue: "Rp 12,4 M", growth: "+14.5%", status: "Optimal" },
    { name: "Bali Branch", units: 90, revenue: "Rp 5,6 M", growth: "+9.1%", status: "Expanding" }
  ];

  // Dashboard-Exact Vehicle Records Data
  const vehicles = [
    {
      id: "v1",
      name: "Porsche 911 GT3",
      brand: "Porsche",
      branch: "Jakarta Pusat",
      price: "Rp 4.850.000.000",
      units: 4,
      hp: "510 HP",
      zeroHundred: "3.4s",
      image_url: "/images/gallery/porsche_gt3.png",
      status: "Tersedia"
    },
    {
      id: "v2",
      name: "Audi e-tron GT",
      brand: "Audi",
      branch: "Surabaya",
      price: "Rp 3.250.000.000",
      units: 2,
      hp: "637 HP",
      zeroHundred: "3.3s",
      image_url: "/images/gallery/audi_etron.png",
      status: "Reserved"
    },
    {
      id: "v3",
      name: "BMW M5 CS",
      brand: "BMW",
      branch: "Jakarta Selatan",
      price: "Rp 3.980.000.000",
      units: 3,
      hp: "635 HP",
      zeroHundred: "3.0s",
      image_url: "/images/gallery/bmw_m5.png",
      status: "Tersedia"
    },
    {
      id: "v4",
      name: "Mercedes-AMG GT",
      brand: "Mercedes-Benz",
      branch: "Jakarta Pusat",
      price: "Rp 4.150.000.000",
      units: 5,
      hp: "585 HP",
      zeroHundred: "3.2s",
      image_url: "/images/gallery/mercedes_amg_gt.png",
      status: "Tersedia"
    },
    {
      id: "v5",
      name: "Ferrari 296 GTB",
      brand: "Ferrari",
      branch: "Bali Showroom",
      price: "Rp 8.900.000.000",
      units: 1,
      hp: "830 HP",
      zeroHundred: "2.9s",
      image_url: "/images/gallery/ferrari_296.png",
      status: "Dalam Transit"
    },
    {
      id: "v6",
      name: "Tesla Model S Plaid",
      brand: "Tesla",
      branch: "Surabaya",
      price: "Rp 2.750.000.000",
      units: 6,
      hp: "1,020 HP",
      zeroHundred: "1.99s",
      image_url: "/images/gallery/tesla_model_s.png",
      status: "Tersedia"
    }
  ];

  // Smart Search Results
  const searchResults = [
    { title: "Porsche 911 GT3 (2026)", category: "Stok Kendaraan", meta: "VIN: WP0ZZZ99ZNS29182 · Jakarta HQ" },
    { title: "PT Nusantara Automotive Group", category: "Pelanggan VIP", meta: "12 Transaksi Selesai · Rating A+" },
    { title: "Laporan Keuangan & Penjualan Q2", category: "Laporan Exec", meta: "PDF Export · Diperbarui 2 jam lalu" },
    { title: "SO-2026-0891 (Audi e-tron GT)", category: "Order Penjualan", meta: "Status: Jadwal Pengiriman" }
  ].filter(
    (item) =>
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-surfaceLight-canvas text-textGray-primary font-sans transition-colors duration-300 relative selection:bg-[#4B8E55]/20 selection:text-[#4B8E55]">
      {/* Background Ambient Orbs */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] pointer-events-none z-0 opacity-40 dark:opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(75,142,85,0.16) 0%, rgba(75,142,85,0) 70%)",
        }}
      />
      <div
        className="fixed bottom-0 right-0 w-[800px] h-[600px] pointer-events-none z-0 opacity-20 dark:opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(107,163,116,0.12) 0%, rgba(107,163,116,0) 70%)",
        }}
      />

      {/* SECTION 1 — STICKY NAVIGATION */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 bg-surfaceLight-canvas dark:bg-[#0E1015] py-3.5 ${
          isScrolled
            ? "border-b border-surfaceLight-border dark:border-[#222F43] shadow-sm"
            : "border-b-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between relative">
          {/* Left: Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-green-gradient shadow-[0_0_8px_rgba(75,142,85,0.8)]" />
            <span className="text-[22px] font-display font-bold tracking-tight text-textGray-display">
              Drive<span className="text-[#4B8E55]">OS</span>
            </span>
          </Link>

          {/* Center Navigation Links - Perfectly Centered & Crisp Solid Track */}
          <nav className="hidden md:flex items-center gap-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-surfaceLight-card dark:bg-[#16181F] border border-surfaceLight-border dark:border-[#222F43] p-1 rounded-full shadow-xs">
            {[
              { id: "product", label: "Produk" },
              { id: "solutions", label: "Solusi" },
              { id: "intelligence", label: "Intelligence" },
              { id: "roles", label: "Tim" },
              { id: "security", label: "Keamanan" },
            ].map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`relative px-4 py-1.5 rounded-full text-[13px] transition-colors cursor-pointer select-none whitespace-nowrap ${
                    isActive
                      ? "text-textGray-display font-semibold"
                      : "text-textGray-tertiary hover:text-textGray-display font-medium"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeHeaderNavPill"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                      className="absolute inset-0 bg-surfaceLight-pearl dark:bg-[#222F43] border border-surfaceLight-border dark:border-[#2C3B53] rounded-full -z-10 shadow-xs"
                    />
                  )}
                  <span className="inline-flex items-center gap-1.5">
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4B8E55] shrink-0" />
                    )}
                    {item.label}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Right: Aligned Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] rounded-full border border-surfaceLight-border dark:border-[#222F43] bg-surfaceLight-card dark:bg-[#16181F] text-textGray-secondary hover:text-textGray-display transition-all flex items-center justify-center cursor-pointer shrink-0"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Login Link - Desktop */}
            <Link
              href="/login"
              className="hidden md:inline-flex h-[40px] px-5 rounded-full border border-surfaceLight-border dark:border-[#222F43] bg-surfaceLight-card dark:bg-[#16181F] text-textGray-primary hover:text-textGray-display text-[13.5px] font-semibold items-center justify-center transition-all shadow-xs cursor-pointer shrink-0 hover:bg-surfaceLight-pearl dark:hover:bg-[#1E2028]"
            >
              Log in
            </Link>

            {/* Sign Up CTA Button - Desktop */}
            <Link
              href="/signup"
              className="hidden md:inline-flex h-[40px] px-5 rounded-full bg-green-gradient-pill text-white text-[13.5px] font-semibold items-center justify-center gap-1.5 transition-all shadow-xs hover:opacity-95 cursor-pointer border border-white/20 shrink-0"
            >
              <span>Sign up</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl border border-surfaceLight-border dark:border-[#222F43] bg-surfaceLight-card dark:bg-[#16181F] text-textGray-secondary hover:text-textGray-display cursor-pointer"
              aria-label="Open Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-surfaceLight-canvas dark:bg-[#0E1015] border-b border-surfaceLight-border dark:border-[#222F43] px-4 pt-3 pb-4 shadow-xl"
            >
              <nav className="flex flex-col gap-1.5">
                {[
                  { id: "product", label: "Produk" },
                  { id: "solutions", label: "Solusi" },
                  { id: "intelligence", label: "Intelligence" },
                  { id: "roles", label: "Tim" },
                  { id: "security", label: "Keamanan" },
                ].map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => {
                        setMobileMenuOpen(false);
                        handleNavClick(e, item.id);
                      }}
                      className={`text-[14px] font-medium py-2.5 px-3.5 rounded-xl border transition-colors flex items-center justify-between ${
                        isActive
                          ? "bg-surfaceLight-card dark:bg-[#16181F] text-textGray-display font-semibold border-surfaceLight-border dark:border-[#222F43]"
                          : "text-textGray-secondary hover:text-textGray-display border-transparent"
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4B8E55]" />
                      )}
                    </a>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* SECTION 2 — HERO */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4B8E55]/10 border border-[#4B8E55]/20 text-[#4B8E55] dark:text-[#6BA374] mb-5 text-[11px] font-semibold tracking-[0.08em] uppercase shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#4B8E55]" />
            <span>SISTEM OPERASI OTOMOTIF CERDAS</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[32px] sm:text-[48px] md:text-[54px] lg:text-[60px] font-display tracking-tight leading-tight max-w-4xl mx-auto"
          >
            <span className="font-bold text-textGray-display">Kelola bisnis otomotif Anda dalam </span>
            <span className="font-extrabold text-green-gradient block sm:inline">satu sistem cerdas.</span>
          </motion.h1>

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[14.5px] sm:text-[16px] md:text-[17px] text-textGray-tertiary font-normal max-w-2xl mx-auto mt-5 leading-relaxed"
          >
            Penjualan, stok kendaraan, pelanggan, operasi servis, dan analisis AI — terhubung dalam satu command center siap pakai untuk grup dealer dan showroom modern.
          </motion.p>

          {/* CTA Group */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5"
          >
            <Link
              href="/signup"
              className="w-full sm:w-auto px-7 py-3 text-[14px] font-semibold text-white bg-green-gradient-pill rounded-full shadow-xs hover:opacity-95 transition-all flex items-center justify-center gap-2 border border-white/20"
            >
              <span>Mulai Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#product"
              className="w-full sm:w-auto px-7 py-3 text-[14px] font-medium text-textGray-primary hover:text-textGray-display border border-surfaceLight-border dark:border-[#222F43] bg-surfaceLight-card dark:bg-[#16181F] rounded-full hover:bg-surfaceLight-pearl dark:hover:bg-[#1E2028] transition-all flex items-center justify-center gap-2"
            >
              <span>Jelajahi Platform</span>
              <ChevronDown className="w-4 h-4 text-textGray-muted" />
            </a>
          </motion.div>

          {/* Hero Visual — Realistic Interactive Preview of DriveOS Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 max-w-5xl mx-auto relative rounded-2xl border border-surfaceLight-border dark:border-[#222F43] bg-surfaceLight-canvas dark:bg-[#0E1015] shadow-2xl overflow-hidden text-left"
          >
            {/* Window Bar Header */}
            <div className="px-4 py-3 bg-surfaceLight-pearl dark:bg-[#16181F] border-b border-surfaceLight-border dark:border-[#222F43] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-surfaceLight-border dark:bg-[#272A34] inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-surfaceLight-border dark:bg-[#272A34] inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-surfaceLight-border dark:bg-[#272A34] inline-block" />
                <span className="ml-3 text-[11px] font-mono text-textGray-muted hidden sm:inline-block">
                  https://app.driveos.auto/overview
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-textGray-muted font-medium">
                <span className="w-2 h-2 rounded-full bg-[#4B8E55]" />
                <span>Command Center Active</span>
              </div>
            </div>

            {/* Dashboard Inner Body Mock */}
            <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-surfaceLight-canvas dark:bg-[#0E1015]">
              {/* Dashboard Top Header Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-surfaceLight-border dark:border-[#222F43]">
                <div>
                  <h3 className="text-[18px] font-bold text-textGray-display">Executive Command Overview</h3>
                  <p className="text-[13px] text-textGray-tertiary font-normal">Real-time operasional 3 cabang showroom</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 text-[11px] font-semibold text-[#4B8E55] bg-[#4B8E55]/10 rounded-full border border-[#4B8E55]/20">
                    Jakarta HQ · Live
                  </span>
                  <div className="w-8 h-8 rounded-full bg-green-gradient text-white font-bold text-[12px] flex items-center justify-center">
                    AD
                  </div>
                </div>
              </div>

              {/* KPI Cards Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-4 rounded-xl bg-surfaceLight-pearl dark:bg-[#16181F] border border-surfaceLight-border dark:border-[#222F43]">
                  <span className="text-[11px] font-medium text-textGray-muted block mb-1">Total Revenue (MTD)</span>
                  <div className="text-[20px] sm:text-[22px] font-bold text-textGray-display">Rp 42,8 M</div>
                  <div className="mt-1 flex items-center gap-1 text-[11.5px] font-semibold text-[#4B8E55]">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+18.4% vs bulan lalu</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-surfaceLight-pearl dark:bg-[#16181F] border border-surfaceLight-border dark:border-[#222F43]">
                  <span className="text-[11px] font-medium text-textGray-muted block mb-1">Unit Terjual</span>
                  <div className="text-[20px] sm:text-[22px] font-bold text-textGray-display">148 Unit</div>
                  <div className="mt-1 flex items-center gap-1 text-[11.5px] font-semibold text-[#4B8E55]">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+12.5% target pacing</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-surfaceLight-pearl dark:bg-[#16181F] border border-surfaceLight-border dark:border-[#222F43]">
                  <span className="text-[11px] font-medium text-textGray-muted block mb-1">Stok Aktif</span>
                  <div className="text-[20px] sm:text-[22px] font-bold text-textGray-display">342 Unit</div>
                  <div className="mt-1 flex items-center gap-1 text-[11.5px] font-medium text-textGray-tertiary">
                    <Activity className="w-3.5 h-3.5" />
                    <span>18 Hari Rata-rata Simpan</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-surfaceLight-pearl dark:bg-[#16181F] border border-surfaceLight-border dark:border-[#222F43]">
                  <span className="text-[11px] font-medium text-textGray-muted block mb-1">Gross Profit Margin</span>
                  <div className="text-[20px] sm:text-[22px] font-bold text-textGray-display">17.6%</div>
                  <div className="mt-1 flex items-center gap-1 text-[11.5px] font-semibold text-[#4B8E55]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Di Atas Target (15%)</span>
                  </div>
                </div>
              </div>

              {/* Chart & AI Insights Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Sales Chart Mockup */}
                <div className="lg:col-span-2 p-4 sm:p-5 rounded-xl bg-surfaceLight-pearl dark:bg-[#16181F] border border-surfaceLight-border dark:border-[#222F43] flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-[13.5px] font-bold text-textGray-display">Tren Penjualan Bulanan</h4>
                      <span className="text-[11.5px] text-textGray-muted">Perbandingan unit terjual & revenue</span>
                    </div>
                    <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-surfaceLight-canvas dark:bg-[#0E1015] border border-surfaceLight-border dark:border-[#222F43] text-textGray-secondary">
                      2026 YTD
                    </span>
                  </div>
                  {/* Mockup Chart Bars */}
                  <div className="h-[130px] w-full flex items-end justify-between gap-2 pt-4 px-1">
                    {[
                      { m: "Jan", h: "45%" },
                      { m: "Feb", h: "60%" },
                      { m: "Mar", h: "52%" },
                      { m: "Apr", h: "75%" },
                      { m: "Mei", h: "68%" },
                      { m: "Jun", h: "88%" },
                      { m: "Jul", h: "95%" }
                    ].map((bar, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-2 group/bar">
                        <div className="w-full bg-surfaceLight-canvas dark:bg-[#0E1015] h-full rounded-t-md relative overflow-hidden flex items-end">
                          <div
                            className="w-full bg-[#4B8E55] rounded-t-md transition-all duration-500 group-hover/bar:brightness-110"
                            style={{ height: bar.h }}
                          />
                        </div>
                        <span className="text-[11px] font-medium text-textGray-muted">{bar.m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Assistant Insight Highlight Card */}
                <div className="p-4 sm:p-5 rounded-xl bg-surfaceLight-pearl dark:bg-[#16181F] border border-[#4B8E55]/30 flex flex-col justify-between relative overflow-hidden">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1 rounded-md bg-green-gradient text-white">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[13px] font-bold text-textGray-display">DriveOS AI Insight</span>
                    </div>
                    <p className="text-[12.5px] text-textGray-tertiary leading-relaxed">
                      "Permintaan EV premium di cabang Jakarta Central naik +34% minggu ini. Disarankan alokasi 4 unit Audi e-tron GT dari Surabaya."
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-surfaceLight-border dark:border-[#222F43] flex items-center justify-between text-[11.5px]">
                    <span className="text-textGray-muted">Tingkat Akurasi Data</span>
                    <span className="font-semibold text-[#4B8E55]">96.4% Terverifikasi</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — THE PROBLEM VS SOLUTION */}
      <section className="py-20 md:py-24 bg-surfaceLight-pearl dark:bg-[#12141C] border-y border-surfaceLight-border dark:border-[#222F43] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[11px] font-semibold text-[#4B8E55] uppercase tracking-[0.08em] block mb-2">
              TANTANGAN OPERASIONAL
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-display font-bold text-textGray-display tracking-tight">
              Bisnis Anda tidak seharusnya berjalan pada aplikasi terpisah.
            </h2>
            <p className="text-[14.5px] text-textGray-tertiary mt-3 leading-relaxed">
              Mengelola stok kendaraan, data penjualan, pelanggan, dan laporan dalam aplikasi terpisah menyebabkan keterlambatan keputusan dan potensi penjualan yang hilang.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Fragmented Operations Side - Standard Dark Slate Styling */}
            <div className="p-7 rounded-2xl bg-surfaceLight-canvas dark:bg-[#0E1015] border border-surfaceLight-border dark:border-[#222F43] flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surfaceLight-pearl dark:bg-[#16181F] border border-surfaceLight-border dark:border-[#222F43] text-textGray-tertiary text-[11px] font-semibold uppercase tracking-wider mb-5">
                  <AlertCircle className="w-3.5 h-3.5 text-textGray-muted" />
                  <span>Sistem Manual & Terpisah</span>
                </div>
                <h3 className="text-[20px] font-bold text-textGray-display mb-3">
                  Informasi Terfragmentasi & Keterlambatan Data
                </h3>
                <ul className="space-y-3 text-[13.5px] text-textGray-tertiary font-normal">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-textGray-muted shrink-0 mt-2" />
                    <span>Spreadsheet terpisah antar-cabang yang berisiko duplikasi data stok.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-textGray-muted shrink-0 mt-2" />
                    <span>Tim sales tidak memiliki akses real-time terhadap ketersediaan unit fisik.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-textGray-muted shrink-0 mt-2" />
                    <span>Laporan keuangan eksekutif membutuhkan waktu rekapitulasi hingga beberapa hari.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-textGray-muted shrink-0 mt-2" />
                    <span>Follow-up pelanggan tidak terpantau secara konsisten.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-surfaceLight-border dark:border-[#222F43] text-[12px] font-medium text-textGray-muted">
                Dampak: Efisiensi operasional terhambat & risiko kendala stok
              </div>
            </div>

            {/* DriveOS Connected Side */}
            <div className="p-7 rounded-2xl bg-surfaceLight-canvas dark:bg-[#0E1015] border border-[#4B8E55]/40 shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4B8E55]/10 text-[#4B8E55] dark:text-[#6BA374] text-[11px] font-semibold uppercase tracking-wider mb-5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>DriveOS Connected System</span>
                </div>
                <h3 className="text-[20px] font-bold text-textGray-display mb-3">
                  Satu Platform Terintegrasi
                </h3>
                <ul className="space-y-3 text-[13.5px] text-textGray-tertiary font-normal">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#4B8E55] shrink-0 mt-0.5" />
                    <span>Single source of truth untuk stok kendaraan, cabang, dan posisi keuangan.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#4B8E55] shrink-0 mt-0.5" />
                    <span>Pembaruan stok instan saat reservasi, test drive, atau order dibuat.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#4B8E55] shrink-0 mt-0.5" />
                    <span>Executive KPI dashboard dengan data akurat dalam waktu nyata.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#4B8E55] shrink-0 mt-0.5" />
                    <span>AI Assistant proaktif untuk analisis peluang bisnis otomatis.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-surfaceLight-border dark:border-[#222F43] text-[12px] font-semibold text-[#4B8E55]">
                Hasil: +18.4% Kecepatan Penjualan & Transparansi Operasional 100%
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — PLATFORM OVERVIEW (BENTO GRID) */}
      <section id="product" className="py-20 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[11px] font-semibold text-[#4B8E55] uppercase tracking-[0.08em] block mb-2">
              MODUL PLATFORM
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-display font-bold text-textGray-display tracking-tight">
              Satu platform. Setiap komponen bisnis.
            </h2>
            <p className="text-[14.5px] text-textGray-tertiary mt-3">
              DriveOS menghubungkan seluruh divisi operasional ke dalam satu workflow digital yang lancar.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Sales Intelligence */}
            <div className="p-6 rounded-2xl bg-surfaceLight-card dark:bg-[#16181F] border border-surfaceLight-border dark:border-[#222F43] hover:border-[#4B8E55]/50 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-green-gradient text-white flex items-center justify-center mb-5 shadow-xs group-hover:scale-105 transition-transform">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-[18px] font-bold text-textGray-display mb-2">Sales Intelligence</h3>
              <p className="text-[13.5px] text-textGray-tertiary font-normal leading-relaxed">
                Kelola lead pipeline, tahapan prospek, otomasi pengingat follow-up, dan lacak performa sales per cabang.
              </p>
            </div>

            {/* Vehicle Inventory */}
            <div className="p-6 rounded-2xl bg-surfaceLight-card dark:bg-[#16181F] border border-surfaceLight-border dark:border-[#222F43] hover:border-[#4B8E55]/50 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-green-gradient text-white flex items-center justify-center mb-5 shadow-xs group-hover:scale-105 transition-transform">
                <Car className="w-5 h-5" />
              </div>
              <h3 className="text-[18px] font-bold text-textGray-display mb-2">Vehicle Inventory</h3>
              <p className="text-[13.5px] text-textGray-tertiary font-normal leading-relaxed">
                Pantau stok kendaraan real-time, status ketersediaan, riwayat inspeksi, dan alokasi unit antar-showroom.
              </p>
            </div>

            {/* Customer Analytics */}
            <div className="p-6 rounded-2xl bg-surfaceLight-card dark:bg-[#16181F] border border-surfaceLight-border dark:border-[#222F43] hover:border-[#4B8E55]/50 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-green-gradient text-white flex items-center justify-center mb-5 shadow-xs group-hover:scale-105 transition-transform">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-[18px] font-bold text-textGray-display mb-2">Customer Analytics</h3>
              <p className="text-[13.5px] text-textGray-tertiary font-normal leading-relaxed">
                Pahami profil pelanggan, riwayat pembelian kendaraan, preferensi brand, dan Customer Lifetime Value (CLV).
              </p>
            </div>

            {/* Financial Intelligence */}
            <div className="p-6 rounded-2xl bg-surfaceLight-card dark:bg-[#16181F] border border-surfaceLight-border dark:border-[#222F43] hover:border-[#4B8E55]/50 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-green-gradient text-white flex items-center justify-center mb-5 shadow-xs group-hover:scale-105 transition-transform">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="text-[18px] font-bold text-textGray-display mb-2">Financial Intelligence</h3>
              <p className="text-[13.5px] text-textGray-tertiary font-normal leading-relaxed">
                Monitor pendapatan, gross profit margin, beban operasional, dan arus kas konsolidasi grup.
              </p>
            </div>

            {/* Service Operations */}
            <div className="p-6 rounded-2xl bg-surfaceLight-card dark:bg-[#16181F] border border-surfaceLight-border dark:border-[#222F43] hover:border-[#4B8E55]/50 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-green-gradient text-white flex items-center justify-center mb-5 shadow-xs group-hover:scale-105 transition-transform">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="text-[18px] font-bold text-textGray-display mb-2">Service Operations</h3>
              <p className="text-[13.5px] text-textGray-tertiary font-normal leading-relaxed">
                Kelola pengerjaan workshop, antrean pengerjaan mekanik, pemesanan sparepart, dan invoice servis.
              </p>
            </div>

            {/* Fleet & Delivery */}
            <div className="p-6 rounded-2xl bg-surfaceLight-card dark:bg-[#16181F] border border-surfaceLight-border dark:border-[#222F43] hover:border-[#4B8E55]/50 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-green-gradient text-white flex items-center justify-center mb-5 shadow-xs group-hover:scale-105 transition-transform">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="text-[18px] font-bold text-textGray-display mb-2">Fleet & Delivery</h3>
              <p className="text-[13.5px] text-textGray-tertiary font-normal leading-relaxed">
                Lacak pengiriman unit kendaraan ke pelanggan, pergerakan towing, dan jadwal serah terima kendaraan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — EXECUTIVE VISIBILITY */}
      <section id="solutions" className="py-20 md:py-24 bg-surfaceLight-pearl dark:bg-[#12141C] border-t border-surfaceLight-border dark:border-[#222F43]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-[11px] font-semibold text-[#4B8E55] uppercase tracking-[0.08em] block mb-2">
              VISIBILITAS EKSEKUTIF
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-display font-bold text-textGray-display tracking-tight">
              Seluruh bisnis Anda. Dalam satu pandangan.
            </h2>
            <p className="text-[14.5px] text-textGray-tertiary mt-3">
              Ganti tampilan untuk memantau KPI utama, perbandingan cabang, atau analisis margin keuntungan.
            </p>
          </div>

          {/* Interactive Metric Switcher Tabs with Animated Sliding Pill */}
          <div className="flex justify-center mb-6 sm:mb-8 w-full">
            <div className="relative flex items-center bg-surfaceLight-card dark:bg-[#16181F] border border-surfaceLight-border dark:border-[#222F43] p-1 rounded-2xl sm:rounded-full text-[12px] sm:text-[13px] font-semibold w-full sm:w-auto shadow-xs">
              {(["kpi", "branch", "margin"] as const).map((tab) => {
                const labels = {
                  kpi: "Executive KPIs",
                  branch: "Perbandingan Cabang",
                  margin: "Analisis Margin",
                };
                const mobileLabels = {
                  kpi: "KPIs",
                  branch: "Cabang",
                  margin: "Margin",
                };
                const isActive = activeExecTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveExecTab(tab)}
                    className={`relative z-10 flex-1 sm:flex-initial px-3 sm:px-5 py-2 rounded-xl sm:rounded-full transition-colors cursor-pointer text-center whitespace-nowrap select-none ${
                      isActive ? "text-white" : "text-textGray-muted hover:text-textGray-display"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeExecTabPill"
                        transition={{ type: "spring", stiffness: 450, damping: 32 }}
                        className="absolute inset-0 bg-green-gradient-pill rounded-xl sm:rounded-full shadow-xs -z-10"
                      />
                    )}
                    <span className="hidden sm:inline">{labels[tab]}</span>
                    <span className="sm:hidden">{mobileLabels[tab]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Tab Content Preview - 1:1 Dashboard Animation & Card System Match */}
          <div className="w-full">
            <AnimatePresence mode="wait">
              {activeExecTab === "kpi" && (
                <motion.div
                  key="kpi"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5"
                >
                  <motion.div
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    className="p-5 sm:p-6 rounded-2xl bg-surfaceLight-card dark:bg-[#16181F] border border-surfaceLight-border dark:border-[#222F43] shadow-xs flex flex-col justify-between hover:border-[#4B8E55]/40 transition-colors"
                  >
                    <span className="text-[11px] font-semibold text-textGray-muted uppercase tracking-[0.08em] block mb-1">Gross Revenue YTD</span>
                    <div className="text-[26px] sm:text-[30px] font-display font-semibold text-textGray-display my-2">Rp 128,4 M</div>
                    <div className="inline-flex items-center gap-1 font-semibold text-[12px] text-[#6BA374] bg-[#4B8E55]/20 border border-[#4B8E55]/40 px-3 py-1 rounded-full w-fit">
                      +22.1% YoY Growth
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    className="p-5 sm:p-6 rounded-2xl bg-surfaceLight-card dark:bg-[#16181F] border border-surfaceLight-border dark:border-[#222F43] shadow-xs flex flex-col justify-between hover:border-[#4B8E55]/40 transition-colors"
                  >
                    <span className="text-[11px] font-semibold text-textGray-muted uppercase tracking-[0.08em] block mb-1">Net Profit Margin</span>
                    <div className="text-[26px] sm:text-[30px] font-display font-semibold text-textGray-display my-2">16.8%</div>
                    <div className="inline-flex items-center gap-1 font-semibold text-[12px] text-[#6BA374] bg-[#4B8E55]/20 border border-[#4B8E55]/40 px-3 py-1 rounded-full w-fit">
                      +2.4% vs Benchmark
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    className="p-5 sm:p-6 rounded-2xl bg-surfaceLight-card dark:bg-[#16181F] border border-surfaceLight-border dark:border-[#222F43] shadow-xs flex flex-col justify-between hover:border-[#4B8E55]/40 transition-colors"
                  >
                    <span className="text-[11px] font-semibold text-textGray-muted uppercase tracking-[0.08em] block mb-1">Total Pelanggan Aktif</span>
                    <div className="text-[26px] sm:text-[30px] font-display font-semibold text-textGray-display my-2">1.420 VIP</div>
                    <div className="inline-flex items-center gap-1 font-semibold text-[12px] text-[#6BA374] bg-[#4B8E55]/20 border border-[#4B8E55]/40 px-3 py-1 rounded-full w-fit">
                      89% Retensi Pelanggan
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {activeExecTab === "branch" && (
                <motion.div
                  key="branch"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3.5"
                >
                  {branches.map((b, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -2, transition: { duration: 0.2 } }}
                      className="p-4 sm:p-5 rounded-2xl bg-surfaceLight-card dark:bg-[#16181F] border border-surfaceLight-border dark:border-[#222F43] shadow-xs flex items-center justify-between gap-3 hover:border-[#4B8E55]/40 transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <h4 className="text-[15px] sm:text-[16px] font-display font-semibold text-textGray-display mb-0.5 truncate">
                          {b.name}
                        </h4>
                        <span className="text-[12px] sm:text-[12.5px] text-textGray-tertiary font-normal">
                          {b.units} Unit Stok Aktif
                        </span>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-6 shrink-0">
                        <div className="text-right">
                          <div className="text-[15px] sm:text-[17px] font-bold text-textGray-display">{b.revenue}</div>
                          <span className="text-[11.5px] sm:text-[12px] text-[#6BA374] font-semibold">{b.growth}</span>
                        </div>
                        <span
                          className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-[11.5px] font-bold border shadow-xs shrink-0 ${
                            b.status === "Optimal"
                              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                              : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeExecTab === "margin" && (
                <motion.div
                  key="margin"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 sm:p-7 rounded-2xl bg-surfaceLight-card dark:bg-[#16181F] border border-surfaceLight-border dark:border-[#222F43] shadow-xs"
                >
                  <span className="text-[11px] font-semibold text-textGray-muted uppercase tracking-[0.08em] block mb-1">
                    ANALISIS MARGIN
                  </span>
                  <h4 className="text-[18px] sm:text-[20px] font-display font-semibold text-textGray-display mb-1">
                    Kontribusi Margin Per Kategori Kendaraan
                  </h4>
                  <p className="text-[13px] text-textGray-tertiary mb-6 font-normal">
                    Kategori Luxury EV & Performance Coupe menyumbang margin terbesar pada periode berjalan.
                  </p>
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between text-[13.5px] mb-1.5">
                        <span className="text-textGray-display font-semibold">Luxury EV & Hybrid</span>
                        <span className="text-[#4B8E55] font-semibold">21.4% Margin</span>
                      </div>
                      <div className="w-full h-2 sm:h-2.5 bg-surfaceLight-pearl border border-surfaceLight-border dark:border-[#222F43] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "85%" }}
                          transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
                          className="h-full bg-gradient-to-r from-[#33613A] via-[#4B8E55] to-[#6BA374] rounded-full shadow-xs"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[13.5px] mb-1.5">
                        <span className="text-textGray-display font-semibold">Performance Sports Coupe</span>
                        <span className="text-[#4B8E55] font-semibold">18.9% Margin</span>
                      </div>
                      <div className="w-full h-2 sm:h-2.5 bg-surfaceLight-pearl border border-surfaceLight-border dark:border-[#222F43] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "75%" }}
                          transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.15 }}
                          className="h-full bg-gradient-to-r from-[#33613A] via-[#4B8E55] to-[#6BA374] rounded-full shadow-xs"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[13.5px] mb-1.5">
                        <span className="text-textGray-display font-semibold">Executive Sedans</span>
                        <span className="text-[#4B8E55] font-semibold">14.2% Margin</span>
                      </div>
                      <div className="w-full h-2 sm:h-2.5 bg-surfaceLight-pearl border border-surfaceLight-border dark:border-[#222F43] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "60%" }}
                          transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 }}
                          className="h-full bg-gradient-to-r from-[#33613A] via-[#4B8E55] to-[#6BA374] rounded-full shadow-xs"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* SECTION 7 — PREMIUM VEHICLE EXPERIENCE (1:1 EXACT DASHBOARD VEHICLE GALLERY GRID) */}
      <section className="py-20 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[11px] font-semibold text-[#4B8E55] uppercase tracking-[0.08em] block mb-2">
              GALERI & ASET KENDARAAN
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-display font-bold text-textGray-display tracking-tight">
              Lihat setiap unit kendaraan secara detail.
            </h2>
            <p className="text-[14.5px] text-textGray-tertiary mt-3">
              DriveOS menyediakan rekaman stok visual HD lengkap dengan spesifikasi teknis, status ketersediaan, dan inspeksi digital.
            </p>
          </div>

          {/* 1:1 Dashboard Exact Vehicle Card Grid with Working Modals */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                onClick={() =>
                  setSelectedDetailVehicle({
                    name: item.name,
                    price: item.price,
                    units: `${item.units} unit`,
                    image: item.image_url,
                    brand: item.brand,
                  })
                }
                className="bg-surfaceLight-card border border-surfaceLight-border dark:border-[#222F43] rounded-2xl overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all duration-300 relative cursor-pointer hover:border-[#4B8E55]/40"
              >
                {/* Full Frame Studio Image Container - Exact 1:1 Dashboard Match */}
                <div className="relative w-full h-[240px] overflow-hidden rounded-t-2xl bg-gradient-to-b from-surfaceLight-pearl to-surfaceLight-card">
                  <Image
                    src={item.image_url || "/images/gallery/porsche_gt3.png"}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />

                  {/* 360° View Button - Interactive Modal Trigger */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelected360Vehicle(item);
                    }}
                    className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-surfaceLight-card dark:bg-[#16181F] border border-surfaceLight-border dark:border-[#222F43] text-[11.5px] font-semibold text-[#4B8E55] dark:text-[#6BA374] flex items-center gap-1.5 shadow-xs hover:bg-surfaceLight-pearl cursor-pointer transition-all hover:scale-105 z-10"
                  >
                    <RotateCw className="w-3.5 h-3.5 text-[#4B8E55]" />
                    <span>360° View</span>
                  </button>

                  {/* Solid Status Badge Top Left - Crisp Solid (No translucent glass) */}
                  <div
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold shadow-xs z-10 ${
                      item.status === "Tersedia"
                        ? "bg-[#4B8E55] text-white border border-[#4B8E55]"
                        : "bg-[#16181F] dark:bg-[#16181F] text-white border border-[#272A34]"
                    }`}
                  >
                    {item.status}
                  </div>
                </div>

                {/* Content & Action Bar - Dashboard Exact Style */}
                <div className="p-5 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-[17px] font-semibold text-textGray-display group-hover:text-brand transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-[12px] text-textGray-tertiary font-normal">
                        {item.brand} · {item.branch}
                      </span>
                    </div>
                    <span className="text-[16px] font-bold text-textGray-display">{item.price}</span>
                  </div>

                  <div className="pt-3 border-t border-surfaceLight-border dark:border-[#222F43] flex items-center justify-between">
                    <span className="text-[12px] text-textGray-tertiary font-medium">
                      {item.units} unit tersedia
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDetailVehicle({
                          name: item.name,
                          price: item.price,
                          units: `${item.units} unit`,
                          image: item.image_url,
                          brand: item.brand,
                        });
                      }}
                      className="text-[13px] font-semibold text-brand hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Detail Spesifikasi</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 — DRIVEOS INTELLIGENCE (AI ASSISTANT) */}
      <section id="intelligence" className="py-20 md:py-24 bg-surfaceLight-pearl dark:bg-[#12141C] border-t border-surfaceLight-border dark:border-[#222F43]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left Info Text */}
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4B8E55]/10 border border-[#4B8E55]/20 text-[#4B8E55] text-[11px] font-semibold uppercase tracking-[0.08em] mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>DRIVEOS INTELLIGENCE</span>
              </div>
              <h2 className="text-[28px] sm:text-[40px] font-display leading-tight tracking-tight">
                <span className="font-bold text-textGray-display">Data bisnis Anda paham lebih banyak. </span>
                <span className="font-extrabold text-green-gradient block mt-1">Kini Anda bisa menanyakannya.</span>
              </h2>
              <p className="text-[14.5px] text-textGray-tertiary mt-4 leading-relaxed font-normal">
                Tanyakan langsung kondisi bisnis otomotif Anda dalam bahasa sehari-hari. AI Assistant DriveOS terhubung dengan data stok real-time, tren penjualan, dan estimasi margin secara terverifikasi.
              </p>

              {/* Prompt Suggestion Chips */}
              <div className="mt-7 space-y-2">
                <span className="text-[11px] font-semibold text-textGray-muted uppercase tracking-[0.08em] block mb-2">
                  Pertanyaan Sampel:
                </span>
                {aiPrompts.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveAiQuery(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border text-[13px] font-medium transition-all flex items-center justify-between cursor-pointer ${
                      activeAiQuery === idx
                        ? "bg-surfaceLight-canvas dark:bg-[#0E1015] border-[#4B8E55] text-textGray-display shadow-xs"
                        : "bg-surfaceLight-canvas/60 dark:bg-[#0E1015]/60 border-surfaceLight-border dark:border-[#222F43] text-textGray-secondary hover:border-textGray-muted"
                    }`}
                  >
                    <span className="truncate pr-2">"{item.q}"</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#4B8E55] shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Chat Interactive Widget */}
            <div className="p-6 sm:p-7 rounded-2xl bg-surfaceLight-canvas dark:bg-[#0E1015] border border-surfaceLight-border dark:border-[#222F43] shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-surfaceLight-border dark:border-[#222F43] pb-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-green-gradient text-white">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-textGray-display">DriveOS AI Copilot</h3>
                    <span className="text-[11.5px] text-[#6BA374] font-semibold">Model Otomotif v4.2 Terhubung</span>
                  </div>
                </div>
                <span className="px-3 py-1 text-[11.5px] font-semibold bg-[#4B8E55]/20 text-[#6BA374] border border-[#4B8E55]/40 rounded-full shrink-0 shadow-xs">
                  {aiPrompts[activeAiQuery].badge}
                </span>
              </div>

              {/* User Question Bubble */}
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-surfaceLight-card dark:bg-[#16181F] border border-surfaceLight-border dark:border-[#222F43] flex items-center justify-center font-bold text-[11px] text-textGray-primary shrink-0">
                  YOU
                </div>
                <div className="p-3.5 rounded-2xl bg-surfaceLight-card dark:bg-[#16181F] border border-surfaceLight-border dark:border-[#222F43] text-[13.5px] text-textGray-primary font-medium flex-1">
                  {aiPrompts[activeAiQuery].q}
                </div>
              </div>

              {/* AI Response Bubble */}
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-green-gradient text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                  AI
                </div>
                <div className="p-3.5 rounded-2xl bg-surfaceLight-card dark:bg-[#16181F] border border-[#4B8E55]/30 text-[13.5px] text-textGray-primary leading-relaxed flex-1 font-normal">
                  <p>{aiPrompts[activeAiQuery].a}</p>
                  <div className="mt-3 pt-2.5 border-t border-surfaceLight-border dark:border-[#222F43] flex items-center justify-between text-[11.5px]">
                    <span className="text-textGray-muted">Metrik Turunan</span>
                    <span className="font-semibold text-[#6BA374]">{aiPrompts[activeAiQuery].metric}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10 — ROLE-BASED EXPERIENCE */}
      <section id="roles" className="py-20 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-[11px] font-semibold text-[#4B8E55] uppercase tracking-[0.08em] block mb-2">
              ALUR KERJA TERSPESIFIKASI
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-display font-bold text-textGray-display tracking-tight">
              Satu sistem. Dirancang untuk setiap tim.
            </h2>
            <p className="text-[14.5px] text-textGray-tertiary mt-3">
              Pilih peran Anda untuk mengeksplorasi bagaimana DriveOS mengoptimalkan tugas harian.
            </p>
          </div>

          {/* Role Tabs - 2x2 Responsive Mobile Grid */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-2 sm:gap-3 w-full mb-8">
            {roles.map((r, idx) => {
              const IconComp = r.icon;
              const isActive = activeRole === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveRole(idx)}
                  className={`px-3 sm:px-4 py-2.5 sm:py-2 rounded-xl sm:rounded-full text-[12px] sm:text-[13px] font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer text-center ${
                    isActive
                      ? "bg-green-gradient-pill text-white shadow-xs"
                      : "bg-surfaceLight-card dark:bg-[#16181F] text-textGray-secondary hover:text-textGray-display border border-surfaceLight-border dark:border-[#222F43]"
                  }`}
                >
                  <IconComp className="w-4 h-4 shrink-0" />
                  <span className="truncate">{r.title}</span>
                </button>
              );
            })}
          </div>

          {/* Role Active Detail Card */}
          <div className="p-7 rounded-2xl bg-surfaceLight-card dark:bg-[#16181F] border border-surfaceLight-border dark:border-[#222F43] max-w-4xl mx-auto shadow-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-[11px] font-semibold text-[#4B8E55] uppercase tracking-wider">PROFIL PERAN</span>
                <h3 className="text-[22px] font-bold text-textGray-display">{roles[activeRole].title}</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#4B8E55]/10 text-[#4B8E55] text-[11px] font-semibold">
                Role-Based Permission
              </span>
            </div>
            <p className="text-[14px] text-textGray-tertiary mb-6 leading-relaxed font-normal">
              {roles[activeRole].desc}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {roles[activeRole].highlights.map((h, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-surfaceLight-canvas dark:bg-[#0E1015] border border-surfaceLight-border dark:border-[#222F43] flex items-center gap-2.5">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#4B8E55] shrink-0" />
                  <span className="text-[13.5px] font-medium text-textGray-primary">{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 13 — SMART SEARCH */}
      <section className="py-20 md:py-24 bg-surfaceLight-pearl dark:bg-[#12141C] border-t border-surfaceLight-border dark:border-[#222F43]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[11px] font-semibold text-[#4B8E55] uppercase tracking-[0.08em] block mb-2">
            PENCARIAN UNIFIED
          </span>
          <h2 className="text-[28px] sm:text-[36px] font-display font-bold text-textGray-display tracking-tight">
            Cari informasi apa saja. Instan.
          </h2>
          <p className="text-[14.5px] text-textGray-tertiary mt-3 mb-8">
            Cari stok kendaraan, nomor VIN, profil pelanggan, order penjualan, dan laporan keuangan langsung dari satu search bar.
          </p>

          {/* Interactive Search Mockup */}
          <div className="p-6 rounded-2xl bg-surfaceLight-canvas dark:bg-[#0E1015] border border-surfaceLight-border dark:border-[#222F43] shadow-xl text-left">
            <div className="relative mb-5">
              <Search className="w-4.5 h-4.5 text-textGray-muted absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari kendaraan, nomor VIN, nama pelanggan, order..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-surfaceLight-card dark:bg-[#16181F] border border-surfaceLight-border dark:border-[#222F43] text-textGray-display focus:outline-none focus:border-[#4B8E55] text-[14px]"
              />
            </div>

            <div className="space-y-2.5">
              <span className="text-[11px] font-semibold text-textGray-muted uppercase tracking-[0.08em] block px-1">
                HASIL PENCARIAN TERVERIFIKASI ({searchResults.length})
              </span>
              {searchResults.map((res, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-surfaceLight-card dark:bg-[#16181F] border border-surfaceLight-border dark:border-[#222F43] flex items-center justify-between hover:border-[#4B8E55]/40 transition-all cursor-pointer"
                >
                  <div>
                    <h4 className="text-[14px] font-bold text-textGray-display">{res.title}</h4>
                    <span className="text-[11.5px] text-textGray-muted">{res.meta}</span>
                  </div>
                  <span className="px-3 py-1 text-[11.5px] font-semibold rounded-full bg-[#4B8E55]/20 text-[#6BA374] border border-[#4B8E55]/40 shrink-0 shadow-xs">
                    {res.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 14 — SECURITY & TRUST */}
      <section id="security" className="py-20 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[11px] font-semibold text-[#4B8E55] uppercase tracking-[0.08em] block mb-2">
              KEAMANAN SISTEM
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-display font-bold text-textGray-display tracking-tight">
              Data bisnis Anda terlindungi sepenuhnya.
            </h2>
            <p className="text-[14.5px] text-textGray-tertiary mt-3">
              DriveOS dibangun dengan isolasi multi-tenant yang ketat, kontrol akses per peran, dan log audit lengkap.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-6 rounded-2xl bg-surfaceLight-card dark:bg-[#16181F] border border-surfaceLight-border dark:border-[#222F43]">
              <Lock className="w-7 h-7 text-[#4B8E55] mb-3.5" />
              <h3 className="text-[17px] font-bold text-textGray-display mb-1.5">Akses Terenkripsi</h3>
              <p className="text-[13px] text-textGray-tertiary font-normal">
                Autentikasi aman dan enkripsi data bisnis (AES-256).
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-surfaceLight-card dark:bg-[#16181F] border border-surfaceLight-border dark:border-[#222F43]">
              <Shield className="w-7 h-7 text-[#4B8E55] mb-3.5" />
              <h3 className="text-[17px] font-bold text-textGray-display mb-1.5">Role-Based Control</h3>
              <p className="text-[13px] text-textGray-tertiary font-normal">
                Hak akses presisi per peran pengguna (Sales, Service, Finance, Owner).
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-surfaceLight-card dark:bg-[#16181F] border border-surfaceLight-border dark:border-[#222F43]">
              <Layers className="w-7 h-7 text-[#4B8E55] mb-3.5" />
              <h3 className="text-[17px] font-bold text-textGray-display mb-1.5">Multi-Tenant Isolation</h3>
              <p className="text-[13px] text-textGray-tertiary font-normal">
                Isolasi arsitektur data antargrup dealer terjamin secara terpisah.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-surfaceLight-card dark:bg-[#16181F] border border-surfaceLight-border dark:border-[#222F43]">
              <FileText className="w-7 h-7 text-[#4B8E55] mb-3.5" />
              <h3 className="text-[17px] font-bold text-textGray-display mb-1.5">Jejak Audit Lengkap</h3>
              <p className="text-[13px] text-textGray-tertiary font-normal">
                Log histori transaksi dan perubahan reservasi stok dapat dilacak.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 15 — FINAL CTA */}
      <section className="py-20 md:py-24 bg-surfaceLight-pearl dark:bg-[#12141C] border-t border-surfaceLight-border dark:border-[#222F43] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-[32px] sm:text-[44px] font-display font-bold text-textGray-display tracking-tight leading-tight">
            Siap membawa bisnis otomotif Anda ke tingkat berikutnya?
          </h2>
          <p className="text-[15px] sm:text-[17px] text-textGray-tertiary max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
            Hubungkan penjualan, stok kendaraan, operasi, dan kecerdasan AI dalam satu sistem terpadu.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-8 py-3.5 text-[14.5px] font-semibold text-white bg-green-gradient-pill rounded-full shadow-xs hover:opacity-95 transition-all flex items-center justify-center gap-2 border border-white/20"
            >
              <span>Mulai Sekarang</span>
              <ArrowRight className="w-4.5 h-4.5" />
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-3.5 text-[14.5px] font-medium text-textGray-primary hover:text-textGray-display border border-surfaceLight-border dark:border-[#222F43] bg-surfaceLight-canvas dark:bg-[#0E1015] rounded-full hover:bg-surfaceLight-pearl dark:hover:bg-[#16181F] transition-all"
            >
              Log in
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 16 — FOOTER */}
      <footer className="py-12 bg-surfaceLight-canvas dark:bg-[#0E1015] border-t border-surfaceLight-border dark:border-[#222F43] text-[13.5px] text-textGray-tertiary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-green-gradient shadow-[0_0_8px_rgba(75,142,85,0.8)]" />
              <span className="text-[20px] font-display font-bold tracking-tight text-textGray-display">
                Drive<span className="text-[#4B8E55]">OS</span>
              </span>
            </Link>
            <p className="text-[13px] text-textGray-muted max-w-sm leading-relaxed mb-3 font-normal">
              Sistem operasi cerdas untuk bisnis otomotif modern. Menghubungkan penjualan, stok kendaraan, operasional, dan AI.
            </p>
            <span className="text-[11.5px] text-textGray-muted block">
              © 2026 DriveOS Inc. Hak Cipta Dilindungi.
            </span>
          </div>

          <div>
            <h4 className="text-[13.5px] font-bold text-textGray-display mb-2.5">Produk</h4>
            <ul className="space-y-2 text-[12.5px] font-normal">
              <li><a href="#product" className="hover:text-textGray-display transition-colors">Sales Intelligence</a></li>
              <li><a href="#product" className="hover:text-textGray-display transition-colors">Vehicle Inventory</a></li>
              <li><a href="#intelligence" className="hover:text-textGather-display transition-colors">AI Copilot</a></li>
              <li><a href="#product" className="hover:text-textGray-display transition-colors">Financial Reporting</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[13.5px] font-bold text-textGray-display mb-2.5">Solusi</h4>
            <ul className="space-y-2 text-[12.5px] font-normal">
              <li><a href="#roles" className="hover:text-textGray-display transition-colors">Grup Otomotif</a></li>
              <li><a href="#roles" className="hover:text-textGray-display transition-colors">Showroom Kendaraan</a></li>
              <li><a href="#roles" className="hover:text-textGray-display transition-colors">EV Dealerships</a></li>
              <li><a href="#roles" className="hover:text-textGray-display transition-colors">Fleet Operations</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[13.5px] font-bold text-textGray-display mb-2.5">Keamanan</h4>
            <ul className="space-y-2 text-[12.5px] font-normal">
              <li><a href="#security" className="hover:text-textGray-display transition-colors">Kebijakan Privasi</a></li>
              <li><a href="#security" className="hover:text-textGray-display transition-colors">Syarat & Ketentuan</a></li>
              <li><a href="#security" className="hover:text-textGray-display transition-colors">Arsitektur Keamanan</a></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Interactive Vehicle Detail Modal (Read-Only Showcase for Public Landing Page) */}
      {selectedDetailVehicle && (
        <VehicleDetailModal
          isOpen={Boolean(selectedDetailVehicle)}
          onClose={() => setSelectedDetailVehicle(null)}
          vehicle={selectedDetailVehicle}
          readOnly={true}
        />
      )}

      {/* Interactive 360° Viewer Modal */}
      {selected360Vehicle && (
        <Viewer360Modal
          isOpen={Boolean(selected360Vehicle)}
          onClose={() => setSelected360Vehicle(null)}
          vehicleName={selected360Vehicle.name}
          imageUrl={selected360Vehicle.image_url}
        />
      )}
    </div>
  );
};

export default LandingPage;

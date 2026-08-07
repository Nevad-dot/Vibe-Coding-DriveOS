"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  TrendingUp,
  Boxes,
  Grid2X2,
  Users,
  Car,
  Wrench,
  DollarSign,
  FileText,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { name: "Overview", href: "/overview", icon: LayoutGrid },
  { name: "Sales", href: "/sales", icon: TrendingUp },
  { name: "Inventory", href: "/inventory", icon: Boxes },
  { name: "Gallery", href: "/gallery", icon: Grid2X2 },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Fleet", href: "/fleet", icon: Car },
  { name: "Service", href: "/service", icon: Wrench },
  { name: "Financial", href: "/financial", icon: DollarSign },
  { name: "Reports", href: "/reports", icon: FileText },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`h-screen bg-surfaceLight-card border-r border-surfaceLight-border flex flex-col justify-between transition-all duration-300 ease-in-out shrink-0 z-30 select-none ${
        isCollapsed ? "w-[72px]" : "w-[240px]"
      }`}
    >
      {/* Top Section: Brand & Navigation */}
      <div className="flex flex-col">
        {/* Brand Logo Header */}
        <div className="h-[64px] px-6 flex items-center justify-between border-b border-surfaceLight-border shrink-0">
          <Link href="/overview" className="flex items-center gap-2 overflow-hidden">
            {isCollapsed ? (
              <span className="text-[20px] font-display font-bold tracking-tight text-textGray-display">
                D<span className="text-[#4B8E55]">O</span>
              </span>
            ) : (
              <span className="text-[20px] font-display font-bold tracking-tight text-textGray-display">
                Drive<span className="text-[#4B8E55]">OS</span>
              </span>
            )}
          </Link>
        </div>

        {/* Navigation Items List */}
        <nav className="p-3 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href === "/overview" && pathname === "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-3 px-3 h-[36px] rounded-xl text-[13.5px] transition-colors ${
                  isActive
                    ? "bg-surfaceLight-pearl font-medium text-textGray-display"
                    : "font-normal text-textGray-tertiary hover:text-textGray-primary hover:bg-surfaceLight-pearl/60"
                } ${isCollapsed ? "justify-center px-0" : ""}`}
                title={isCollapsed ? item.name : undefined}
              >
                {/* Active Indicator Bar smoothly sliding with Framer Motion layoutId */}
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active-bar"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    className="absolute left-0 top-[9px] h-[18px] w-[2.5px] bg-[#4B8E55] rounded-full"
                  />
                )}

                <Icon
                  className={`w-[18px] h-[18px] shrink-0 ${
                    isActive ? "text-[#4B8E55]" : "text-textGray-tertiary"
                  }`}
                  strokeWidth={1.5}
                />

                {!isCollapsed && <span className="truncate">{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: AI Card & Collapse Toggle */}
      <div className="p-3 border-t border-surfaceLight-border flex flex-col gap-3">
        {/* AI Assistant Callout Box with Gradient Green Button */}
        {!isCollapsed && (
          <div className="bg-surfaceLight-pearl border border-surfaceLight-border p-3 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#4B8E55] uppercase tracking-wider">
              <Sparkles className="w-[14px] h-[14px] text-[#4B8E55]" strokeWidth={1.5} />
              <span>AI Assistant</span>
            </div>
            <p className="text-[12px] text-textGray-tertiary leading-snug font-normal">
              Tanya apa saja tentang bisnis Anda.
            </p>
            <button className="mt-1 w-full bg-green-gradient-pill text-white text-[13px] font-medium py-2 px-4 rounded-xl transition-opacity hover:opacity-90 shadow-sm flex items-center justify-center whitespace-nowrap">
              Buka
            </button>
          </div>
        )}

        {/* Collapse Sidebar Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`flex items-center gap-2 px-3 h-[36px] rounded-xl text-[13px] font-normal text-textGray-tertiary hover:text-textGray-primary hover:bg-surfaceLight-pearl transition-colors ${
            isCollapsed ? "justify-center px-0" : ""
          }`}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="w-[18px] h-[18px]" strokeWidth={1.5} />
          ) : (
            <>
              <ChevronLeft className="w-[18px] h-[18px]" strokeWidth={1.5} />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

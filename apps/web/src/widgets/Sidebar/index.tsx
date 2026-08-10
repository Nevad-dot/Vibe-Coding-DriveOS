"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  TrendingUp,
  Package,
  Image as ImageIcon,
  Users,
  Car,
  Wrench,
  FileText,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Custom smooth rounded Dollar Icon matching 1.5px stroke width
const SmoothDollarIcon: React.FC<{ className?: string; strokeWidth?: number }> = ({
  className,
  strokeWidth = 1.5,
}) => (
  <svg
    width={18}
    height={18}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="3" x2="12" y2="21" />
    <path d="M16.5 7.5C16.5 5.567 14.485 4 12 4C9.515 4 7.5 5.567 7.5 7.5C7.5 9.433 9.515 11 12 11C14.485 11 16.5 12.567 16.5 14.5C16.5 16.433 14.485 18 12 18C9.515 18 7.5 16.433 7.5 14.5" />
  </svg>
);

const NAV_ITEMS = [
  { label: "Overview", href: "/overview", icon: LayoutGrid },
  { label: "Sales", href: "/sales", icon: TrendingUp },
  { label: "Inventory", href: "/inventory", icon: Package },
  { label: "Gallery", href: "/gallery", icon: ImageIcon },
  { label: "Customers", href: "/customers", icon: Users },
  { label: "Fleet", href: "/fleet", icon: Car },
  { label: "Service", href: "/service", icon: Wrench },
  { label: "Financial", href: "/financial", icon: SmoothDollarIcon },
  { label: "Reports", href: "/reports", icon: FileText },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const handleOpenAiModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-ai-modal"));
    }
  };

  return (
    <aside
      className={`bg-surfaceLight-card border-r border-surfaceLight-border flex flex-col justify-between transition-all duration-200 z-30 shrink-0 transform-gpu ${
        collapsed ? "w-[72px]" : "w-[230px]"
      }`}
    >
      {/* Top Section: Logo & Nav Links */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Brand Header */}
        <div className={`h-[64px] flex items-center border-b border-surfaceLight-border shrink-0 ${collapsed ? "justify-center px-2" : "px-5"}`}>
          <Link href="/overview" className="flex items-center gap-1.5 overflow-hidden">
            {collapsed ? (
              <span className="text-[19px] font-display font-semibold text-textGray-display select-none">
                D<span className="text-brand">O</span>
              </span>
            ) : (
              <span className="text-[20px] font-display font-semibold tracking-tight text-textGray-display select-none whitespace-nowrap">
                Drive<span className="text-brand">OS</span>
              </span>
            )}
          </Link>
        </div>

        {/* Navigation Items with Framer Motion Sliding Indicator */}
        <nav className="p-2.5 flex flex-col gap-1 relative">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href === "/overview" && pathname === "/");

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative flex items-center rounded-xl text-[13.5px] transition-colors duration-150 select-none ${
                  collapsed ? "justify-center p-2.5" : "gap-3 px-3 py-2 pl-4"
                } ${
                  isActive
                    ? "text-textGray-display font-medium"
                    : "text-textGray-secondary hover:text-textGray-primary hover:bg-surfaceLight-pearl/60 font-normal"
                }`}
                title={collapsed ? item.label : undefined}
              >
                {/* Sliding Framer Motion Active Background & Green Indicator Bar */}
                {isActive && (
                  <>
                    <motion.div
                      layoutId="activeSidebarPill"
                      transition={{ type: "spring", stiffness: 420, damping: 30 }}
                      className="absolute inset-0 bg-surfaceLight-pearl rounded-xl -z-10"
                    />

                    <motion.div
                      layoutId="activeSidebarGreenBar"
                      transition={{ type: "spring", stiffness: 420, damping: 30 }}
                      className="absolute left-1.5 top-2.5 bottom-2.5 w-[3px] bg-brand rounded-full z-10"
                    />
                  </>
                )}

                <Icon
                  className={`w-[18px] h-[18px] shrink-0 z-10 ${isActive ? "text-brand" : "text-textGray-tertiary"}`}
                  strokeWidth={1.5}
                />
                {!collapsed && <span className="z-10">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: AI Card & Collapse Toggle */}
      <div className="p-2.5 border-t border-surfaceLight-border flex flex-col gap-2 shrink-0">
        {!collapsed && (
          <div className="bg-surfaceLight-pearl border border-surfaceLight-border rounded-xl p-3 flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#4B8E55] uppercase tracking-wider">
              <Sparkles className="w-[14px] h-[14px] text-[#4B8E55]" strokeWidth={1.5} />
              <span>AI ASSISTANT</span>
            </div>
            <p className="text-[12px] text-textGray-tertiary leading-snug font-normal">
              Tanya apa saja tentang bisnis Anda.
            </p>
            <button
              type="button"
              onClick={handleOpenAiModal}
              className="mt-1 w-full bg-gradient-to-r from-[#33613A] via-[#4B8E55] to-[#6BA374] text-white text-[13px] font-medium py-2 px-4 rounded-xl transition-opacity hover:opacity-90 shadow-sm cursor-pointer"
            >
              Buka
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className={`flex items-center rounded-lg text-[13px] font-normal text-textGray-tertiary hover:text-textGray-primary hover:bg-surfaceLight-pearl transition-all duration-150 w-full select-none ${
            collapsed ? "justify-center p-2.5" : "gap-2 px-3 py-2"
          }`}
        >
          {collapsed ? (
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

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  X,
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

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen = false, onMobileClose }) => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const handleOpenAiModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (onMobileClose) onMobileClose();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-ai-modal"));
    }
  };

  const renderNavContent = (isMobileDrawer = false) => (
    <div className="flex flex-col justify-between h-full w-full">
      {/* Top Section: Logo & Nav Links */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Brand Header */}
        <div
          className={`h-[64px] flex items-center border-b border-surfaceLight-border shrink-0 justify-between ${
            !isMobileDrawer && collapsed ? "px-2 justify-center" : "px-5"
          }`}
        >
          <Link href="/overview" className="flex items-center gap-1.5 overflow-hidden">
            {!isMobileDrawer && collapsed ? (
              <span className="text-[19px] font-display font-semibold text-textGray-display select-none">
                D<span className="text-brand">O</span>
              </span>
            ) : (
              <span className="text-[20px] font-display font-semibold tracking-tight text-textGray-display select-none whitespace-nowrap">
                Drive<span className="text-brand">OS</span>
              </span>
            )}
          </Link>

          {isMobileDrawer && onMobileClose && (
            <button
              type="button"
              onClick={onMobileClose}
              className="p-1.5 rounded-xl text-textGray-tertiary hover:text-textGray-display hover:bg-surfaceLight-pearl transition-colors"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="p-2.5 flex flex-col gap-1 relative">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href === "/overview" && pathname === "/");

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={isMobileDrawer ? onMobileClose : undefined}
                className={`relative flex items-center rounded-xl text-[13.5px] transition-colors duration-150 select-none ${
                  !isMobileDrawer && collapsed ? "justify-center p-2.5" : "gap-3 px-3 py-2 pl-4"
                } ${
                  isActive
                    ? "text-textGray-display font-medium"
                    : "text-textGray-secondary hover:text-textGray-primary hover:bg-surfaceLight-pearl/60 font-normal"
                }`}
                title={!isMobileDrawer && collapsed ? item.label : undefined}
              >
                {/* Sliding Framer Motion Active Background & Green Indicator Bar */}
                {isActive && (
                  <>
                    <motion.div
                      layoutId={isMobileDrawer ? "activeNavBgMobile" : "activeNavBgDesktop"}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="absolute inset-0 bg-surfaceLight-pearl rounded-xl -z-10 shadow-xs"
                    />
                    <motion.div
                      layoutId={isMobileDrawer ? "activeNavIndicatorMobile" : "activeNavIndicatorDesktop"}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="absolute left-0 top-2 bottom-2 w-1 bg-brand rounded-r-full"
                    />
                  </>
                )}

                <Icon
                  className={`w-[18px] h-[18px] shrink-0 transition-colors ${
                    isActive ? "text-brand" : "text-textGray-tertiary"
                  }`}
                  strokeWidth={1.5}
                />
                {(isMobileDrawer || !collapsed) && (
                  <span className="truncate">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: AI Assistant CTA & Collapse Toggle */}
      <div className="p-2.5 border-t border-surfaceLight-border flex flex-col gap-2 shrink-0">
        {/* AI Assistant Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleOpenAiModal}
          type="button"
          className={`w-full py-2.5 px-3 rounded-xl bg-green-gradient-pill text-white flex items-center transition-all cursor-pointer shadow-sm hover:opacity-95 ${
            !isMobileDrawer && collapsed ? "justify-center" : "justify-between"
          }`}
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            <Sparkles className="w-4 h-4 shrink-0 text-white animate-pulse" strokeWidth={1.75} />
            {(isMobileDrawer || !collapsed) && (
              <span className="text-[13px] font-medium tracking-tight truncate">AI Assistant</span>
            )}
          </div>
        </motion.button>

        {/* Sidebar Collapse Toggle Button (Desktop only) */}
        {!isMobileDrawer && (
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className={`w-full py-2 px-3 rounded-xl text-textGray-tertiary hover:text-textGray-primary hover:bg-surfaceLight-pearl transition-colors flex items-center text-[12px] font-medium cursor-pointer ${
              collapsed ? "justify-center" : "justify-between"
            }`}
          >
            {!collapsed && <span>Collapse</span>}
            {collapsed ? (
              <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
            ) : (
              <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
            )}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop & Tablet Sidebar (lg:flex, hidden on mobile screens) */}
      <aside
        className={`hidden lg:flex bg-surfaceLight-card border-r border-surfaceLight-border flex-col justify-between transition-all duration-200 z-30 shrink-0 transform-gpu ${
          collapsed ? "w-[72px]" : "w-[230px]"
        }`}
      >
        {renderNavContent(false)}
      </aside>

      {/* Mobile Slide-Over Drawer Navigation (<1024px) */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-[100] flex">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Floating Drawer Container */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              className="relative w-[280px] max-w-[80vw] bg-surfaceLight-card border-r border-surfaceLight-border h-full shadow-2xl z-10 flex flex-col"
            >
              {renderNavContent(true)}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;

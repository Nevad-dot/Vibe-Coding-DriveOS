"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Moon,
  Sun,
  Bell,
  User,
  Settings,
  Monitor,
  LogOut,
  X,
  AlertCircle,
} from "lucide-react";
import { applyDriveOSTheme, getSavedThemeMode, ThemeMode } from "@/shared/lib/theme";
import { GlobalSearchModal } from "./GlobalSearchModal";
import { NotificationsDrawer } from "./NotificationsDrawer";
import { UserProfileModal } from "./UserProfileModal";
import { UserSettingsModal } from "./UserSettingsModal";

export const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [themeMode, setThemeMode] = useState<ThemeMode>("system");
  const [userName, setUserName] = useState("Adrian Hartono");
  const [userEmail, setUserEmail] = useState("adrian@driveos.app");
  const [userInitials, setUserInitials] = useState("AH");

  // Dropdown & Modal States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [hasUnreadNotifs, setHasUnreadNotifs] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Dynamic Breadcrumb Title based on route
  const getPageTitle = (path: string) => {
    if (path === "/sales") return "Sales";
    if (path === "/inventory") return "Inventory";
    if (path === "/gallery") return "Gallery";
    if (path === "/customers") return "Customers";
    if (path === "/fleet") return "Fleet";
    if (path === "/service") return "Service";
    if (path === "/financial") return "Financial";
    if (path === "/reports") return "Reports";
    if (path === "/profile") return "Profile";
    if (path === "/settings") return "Settings";
    return "Overview";
  };

  const pageTitle = getPageTitle(pathname);

  // Global Keyboard Shortcut listener for ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Persistent Theme Mode Initialization & User Profile
  useEffect(() => {
    if (typeof window !== "undefined") {
      const initialMode = getSavedThemeMode();
      const result = applyDriveOSTheme(initialMode);
      setThemeMode(result.mode);
      setIsDarkMode(result.isDark);

      // System Preference Real-time Listener
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleSystemChange = (e: MediaQueryListEvent) => {
        const saved = localStorage.getItem("driveos_theme_mode");
        if (!saved || saved === "system") {
          if (e.matches) {
            document.documentElement.classList.add("dark");
            setIsDarkMode(true);
          } else {
            document.documentElement.classList.remove("dark");
            setIsDarkMode(false);
          }
        }
      };

      mediaQuery.addEventListener("change", handleSystemChange);

      const storedName = sessionStorage.getItem("user_name");
      const storedEmail = sessionStorage.getItem("user_email");

      if (storedName) {
        setUserName(storedName);

        const parts = storedName.trim().split(" ");
        if (parts.length >= 2) {
          setUserInitials((parts[0][0] + parts[1][0]).toUpperCase());
        } else if (parts[0].length > 0) {
          setUserInitials(parts[0].slice(0, 2).toUpperCase());
        }
      }

      if (storedEmail) {
        setUserEmail(storedEmail);
      } else if (storedName) {
        const nameSlug = storedName.toLowerCase().replace(/\s+/g, "");
        setUserEmail(`${nameSlug}@driveos.app`);
      }

      return () => mediaQuery.removeEventListener("change", handleSystemChange);
    }
  }, []);

  // Keyboard shortcut listener to close modals on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showLogoutModal) {
          setShowLogoutModal(false);
        } else if (isProfileModalOpen) {
          setIsProfileModalOpen(false);
        } else if (isSettingsModalOpen) {
          setIsSettingsModalOpen(false);
        } else if (isProfileOpen) {
          setIsProfileOpen(false);
        } else if (isNotificationsOpen) {
          setIsNotificationsOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showLogoutModal, isProfileModalOpen, isSettingsModalOpen, isProfileOpen, isNotificationsOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !showLogoutModal
      ) {
        setIsProfileOpen(false);
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showLogoutModal]);

  // Theme Select Handlers with localStorage Persistence
  const handleSelectTheme = (mode: ThemeMode) => {
    const result = applyDriveOSTheme(mode);
    setThemeMode(result.mode);
    setIsDarkMode(result.isDark);
  };

  const toggleThemeButton = () => {
    const nextMode = isDarkMode ? "light" : "dark";
    handleSelectTheme(nextMode);
  };

  // Logout Handlers
  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  const handleConfirmLogout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.clear();
    }
    setShowLogoutModal(false);
    setIsProfileOpen(false);
    router.push("/login");
  };

  return (
    <>
      <header className="h-[64px] bg-surfaceLight-card border-b border-surfaceLight-border px-6 flex items-center justify-between shrink-0 z-20 relative">
        {/* Left Dynamic Breadcrumb */}
        <div className="flex items-center gap-2 text-[13px] font-normal text-textGray-tertiary">
          <span>DriveOS</span>
          <span>/</span>
          <span className="text-textGray-primary font-medium">{pageTitle}</span>
        </div>

        {/* Right Tools & Profile */}
        <div className="flex items-center gap-2 relative" ref={dropdownRef}>
          {/* Search Bar Button */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="relative flex items-center justify-center sm:justify-start w-9 sm:w-[260px] h-[36px] bg-surfaceLight-pearl border border-surfaceLight-border rounded-full sm:px-3.5 transition-all hover:border-[#4B8E55] text-left cursor-pointer group select-none shadow-xs shrink-0"
          >
            <Search className="w-[15px] h-[15px] text-textGray-tertiary shrink-0 sm:mr-2.5 transition-colors group-hover:text-brand" strokeWidth={1.5} />
            <span className="hidden sm:inline-block w-full bg-transparent text-[13px] text-textGray-placeholder font-normal pr-2 truncate">
              Cari kendaraan, pelanggan...
            </span>
            <kbd className="hidden sm:inline-block shrink-0 text-[10px] font-medium text-textGray-tertiary bg-surfaceLight-card border border-surfaceLight-border px-1.5 py-0.5 rounded-md shadow-xs select-none leading-none">
              ⌘K
            </kbd>
          </button>

          {/* Theme Toggle Quick Button */}
          <button
            onClick={toggleThemeButton}
            className="w-9 h-9 flex items-center justify-center text-textGray-secondary hover:text-textGray-primary hover:bg-surfaceLight-pearl rounded-full transition-colors shrink-0 cursor-pointer"
            title="Toggle Light/Dark Theme"
          >
            {isDarkMode ? (
              <Sun className="w-[18px] h-[18px] text-amber-400" strokeWidth={1.5} />
            ) : (
              <Moon className="w-[18px] h-[18px]" strokeWidth={1.5} />
            )}
          </button>

          {/* Notification Bell Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative w-9 h-9 flex items-center justify-center text-textGray-secondary hover:text-textGray-primary hover:bg-surfaceLight-pearl rounded-full transition-colors shrink-0 cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-[18px] h-[18px]" strokeWidth={1.5} />
              {hasUnreadNotifs && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </button>

            {/* Notifications Dropdown */}
            <NotificationsDrawer
              isOpen={isNotificationsOpen}
              onClose={() => setIsNotificationsOpen(false)}
              onClearUnread={() => setHasUnreadNotifs(false)}
            />
          </div>

          {/* User Avatar - Toggles User Profile Dropdown Menu */}
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-9 h-9 rounded-full bg-brand-hover text-white flex items-center justify-center font-medium text-[13px] leading-none select-none shrink-0 overflow-hidden shadow-xs hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-brand/40 cursor-pointer"
            title="Account Menu"
          >
            {userInitials}
          </button>

          {/* User Profile Dropdown Menu */}
          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -8 }}
                transition={{ type: "spring", stiffness: 420, damping: 28 }}
                className="absolute right-0 top-[48px] w-[240px] bg-surfaceLight-card border border-surfaceLight-border rounded-2xl shadow-xl p-2 z-50 flex flex-col text-[13px] origin-top-right"
              >
                {/* User Profile Header Info */}
                <div className="px-3 py-2.5 border-b border-surfaceLight-border flex flex-col gap-0.5">
                  <span className="font-semibold text-textGray-display leading-snug truncate">
                    {userName}
                  </span>
                  <span className="text-[12px] text-textGray-tertiary font-normal truncate">
                    {userEmail}
                  </span>
                </div>

                {/* Navigation Options */}
                <div className="py-1.5 border-b border-surfaceLight-border flex flex-col gap-0.5">
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      router.push("/profile");
                    }}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-textGray-primary hover:bg-surfaceLight-pearl transition-colors font-normal w-full text-left cursor-pointer"
                  >
                    <User className="w-[16px] h-[16px] text-textGray-tertiary" strokeWidth={1.5} />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      router.push("/settings");
                    }}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-textGray-primary hover:bg-surfaceLight-pearl transition-colors font-normal w-full text-left cursor-pointer"
                  >
                    <Settings className="w-[16px] h-[16px] text-textGray-tertiary" strokeWidth={1.5} />
                    <span>Settings</span>
                  </button>
                </div>

                {/* Theme Submenu */}
                <div className="py-2 border-b border-surfaceLight-border flex flex-col gap-1">
                  <span className="px-3 text-[10px] font-semibold text-textGray-muted uppercase tracking-[0.08em] block mb-0.5">
                    THEME
                  </span>
                  <button
                    onClick={() => handleSelectTheme("light")}
                    className={`flex items-center justify-between px-3 py-1.5 rounded-xl transition-colors text-left cursor-pointer ${
                      themeMode === "light"
                        ? "bg-surfaceLight-pearl text-textGray-display font-medium"
                        : "text-textGray-secondary hover:bg-surfaceLight-pearl font-normal"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Sun className="w-[16px] h-[16px] text-textGray-tertiary" strokeWidth={1.5} />
                      <span>Light</span>
                    </div>
                    {themeMode === "light" && <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>}
                  </button>
                  <button
                    onClick={() => handleSelectTheme("dark")}
                    className={`flex items-center justify-between px-3 py-1.5 rounded-xl transition-colors text-left cursor-pointer ${
                      themeMode === "dark"
                        ? "bg-surfaceLight-pearl text-textGray-display font-medium"
                        : "text-textGray-secondary hover:bg-surfaceLight-pearl font-normal"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Moon className="w-[16px] h-[16px] text-textGray-tertiary" strokeWidth={1.5} />
                      <span>Dark</span>
                    </div>
                    {themeMode === "dark" && <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>}
                  </button>
                  <button
                    onClick={() => handleSelectTheme("system")}
                    className={`flex items-center justify-between px-3 py-1.5 rounded-xl transition-colors text-left cursor-pointer ${
                      themeMode === "system"
                        ? "bg-surfaceLight-pearl text-textGray-display font-medium"
                        : "text-textGray-secondary hover:bg-surfaceLight-pearl font-normal"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Monitor className="w-[16px] h-[16px] text-textGray-tertiary" strokeWidth={1.5} />
                      <span>System</span>
                    </div>
                    {themeMode === "system" && <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>}
                  </button>
                </div>

                {/* Log Out Button */}
                <div className="pt-1">
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors font-medium w-full text-left cursor-pointer"
                  >
                    <LogOut className="w-[16px] h-[16px] text-red-500" strokeWidth={1.5} />
                    <span>Log out</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Global Command Palette Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Formal Log Out Confirmation Modal (createPortal with z-[100]) */}
      {showLogoutModal && createPortal(
        <AnimatePresence>
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCancelLogout}
              className="fixed inset-0 bg-black/75 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 12 }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
              className="relative bg-surfaceLight-card border border-surfaceLight-border w-full max-w-[420px] rounded-2xl p-6 shadow-2xl flex flex-col gap-5 z-10"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="w-10 h-10 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <button
                  type="button"
                  onClick={handleCancelLogout}
                  className="text-textGray-tertiary hover:text-textGray-primary p-1 rounded-lg hover:bg-surfaceLight-pearl transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>

              {/* Modal Body Info */}
              <div className="flex flex-col gap-1.5">
                <h3 className="text-[18px] font-display font-semibold text-textGray-display">
                  Konfirmasi Keluar Sesi
                </h3>
                <p className="text-[13.5px] text-textGray-tertiary leading-relaxed font-normal">
                  Apakah Anda yakin ingin keluar dari akun DriveOS Anda? Sesi kerja Anda akan diakhiri dan Anda perlu masuk kembali untuk mengakses dashboard.
                </p>
              </div>

              {/* Modal Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCancelLogout}
                  className="px-4 py-2 rounded-full border border-surfaceLight-border text-[13.5px] font-medium text-textGray-primary hover:bg-surfaceLight-pearl transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleConfirmLogout}
                  className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-[13.5px] font-medium shadow-xs transition-colors cursor-pointer"
                >
                  Ya, Keluar
                </button>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>,
        document.body
      )}

      {/* Executive User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onUpdateProfile={(newName, newEmail) => {
          setUserName(newName);
          setUserEmail(newEmail);
          const parts = newName.trim().split(" ");
          if (parts.length >= 2) {
            setUserInitials((parts[0][0] + parts[1][0]).toUpperCase());
          } else if (parts[0].length > 0) {
            setUserInitials(parts[0].slice(0, 2).toUpperCase());
          }
        }}
      />

      {/* System Settings Modal */}
      <UserSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />
    </>
  );
};

export default Header;

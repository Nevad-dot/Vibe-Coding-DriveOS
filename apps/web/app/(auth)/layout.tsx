import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign in to DriveOS",
  description: "Automotive Intelligence Dashboard — Welcome back.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row h-screen min-h-screen w-full bg-surfaceLight-canvas text-textGray-primary overflow-hidden font-sans relative">
      {/* High-Performance Radial Gradient Background Accents (0% GPU Overhead) */}
      <div
        className="absolute top-0 left-0 w-[550px] h-[550px] pointer-events-none z-0 opacity-80"
        style={{
          background: "radial-gradient(circle, rgba(75,142,85,0.12) 0%, rgba(75,142,85,0) 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none z-0 opacity-60"
        style={{
          background: "radial-gradient(circle, rgba(107,163,116,0.1) 0%, rgba(107,163,116,0) 70%)",
        }}
      />

      {/* Left Pane - Command Center Hero (Visible on Desktop lg:flex, hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 bg-surfaceLight-canvas flex-col justify-between p-12 lg:p-16 h-screen sticky top-0 border-r border-surfaceLight-border dark:border-[#222F43] z-10 relative">
        {/* Top: Brand Logo */}
        <Link href="/" className="flex items-center gap-1.5 shrink-0 hover:opacity-80 transition-opacity cursor-pointer">
          <span className="text-[24px] font-display font-bold tracking-tight text-textGray-display select-none">
            Drive<span className="text-[#4B8E55]">OS</span>
          </span>
        </Link>

        {/* Center: Hero Message */}
        <div className="my-auto py-0">
          <div className="flex items-center gap-2 mb-5">
            <svg
              className="w-4 h-4 text-[#4B8E55]"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" />
              <circle cx="8" cy="8" r="2" fill="currentColor" />
            </svg>
            <span className="text-[12px] font-semibold tracking-wide text-[#4B8E55] uppercase">
              Command Center
            </span>
          </div>

          <h1 className="text-[46px] lg:text-[54px] font-display font-semibold tracking-[-0.03em] leading-[1.08] text-textGray-display">
            Bisnis otomotif Anda,<br />
            <span className="text-green-gradient">dalam satu tampilan.</span>
          </h1>

          <p className="text-[16px] lg:text-[17px] text-textGray-tertiary leading-relaxed mt-6 max-w-[440px]">
            Real-time revenue, inventory, dan operasi — didukung AI Assistant yang mengerti bahasa Anda.
          </p>
        </div>

        {/* Bottom: Legal Copyright */}
        <div className="text-[13px] text-textGray-muted shrink-0">
          © 2026 DriveOS
        </div>
      </div>

      {/* Right Pane - Form Workspace (Centered Vertically and Horizontally) */}
      <div className="w-full lg:w-1/2 bg-surfaceLight-pearl dark:bg-[#0E1015] flex flex-col justify-center items-center h-full min-h-screen px-4 py-4 z-10 relative overflow-y-auto sm:overflow-hidden">
        {children}
      </div>
    </div>
  );
}

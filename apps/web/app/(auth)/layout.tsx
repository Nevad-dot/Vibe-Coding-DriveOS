import React from "react";
import type { Metadata } from "next";

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
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-surfaceLight-canvas text-textGray-primary overflow-x-hidden font-sans relative">
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

      {/* Left Pane - Command Center Hero */}
      <div className="w-full md:w-1/2 bg-surfaceLight-canvas flex flex-col justify-between p-8 md:p-16 min-h-[50vh] md:h-screen md:sticky md:top-0 border-b md:border-b-0 md:border-r border-surfaceLight-border z-10 relative">
        {/* Top: Brand Logo */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[22px] font-display font-semibold tracking-tight text-textGray-display select-none">
            Drive<span className="text-[#4B8E55]">OS</span>
          </span>
        </div>

        {/* Center: Hero Message */}
        <div className="my-auto py-8 md:py-0">
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

          <h1 className="text-[42px] md:text-[54px] font-display font-semibold tracking-[-0.03em] leading-[1.08] text-textGray-display">
            Bisnis otomotif Anda,<br />
            <span className="text-green-gradient">dalam satu tampilan.</span>
          </h1>

          <p className="text-[16px] md:text-[17px] text-textGray-tertiary leading-relaxed mt-6 max-w-[440px]">
            Real-time revenue, inventory, dan operasi — didukung AI Assistant yang mengerti bahasa Anda.
          </p>
        </div>

        {/* Bottom: Legal Copyright */}
        <div className="text-[13px] text-textGray-muted shrink-0">
          © 2026 DriveOS
        </div>
      </div>

      {/* Right Pane - Form Workspace */}
      <div className="w-full md:w-1/2 bg-surfaceLight-pearl flex flex-col justify-center items-center min-h-screen py-10 md:py-16 px-4 overflow-y-auto z-10 relative">
        {children}
      </div>
    </div>
  );
}

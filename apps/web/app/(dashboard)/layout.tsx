"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/widgets/Sidebar";
import Header from "@/widgets/Header";
import AiAssistantModal from "@/features/dashboard/components/AiAssistantModal";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Global listener to prevent double modal instances
  useEffect(() => {
    const handleOpenModal = (e: Event) => {
      e.stopPropagation();
      setIsAiModalOpen(true);
    };
    window.addEventListener("open-ai-modal", handleOpenModal);
    return () => window.removeEventListener("open-ai-modal", handleOpenModal);
  }, []);

  return (
    <div className="flex h-screen w-full bg-surfaceLight-pearl text-textGray-primary overflow-hidden font-sans relative">
      {/* High-Performance Radial Gradient Background Accents (0% GPU Overhead) */}
      <div
        className="absolute -top-24 -right-24 w-[600px] h-[600px] pointer-events-none z-0 opacity-80"
        style={{
          background: "radial-gradient(circle, rgba(75,142,85,0.12) 0%, rgba(75,142,85,0) 70%)",
        }}
      />
      <div
        className="absolute bottom-10 left-1/3 w-[450px] h-[450px] pointer-events-none z-0 opacity-60"
        style={{
          background: "radial-gradient(circle, rgba(107,163,116,0.1) 0%, rgba(107,163,116,0) 70%)",
        }}
      />

      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Main Workspace Column */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden z-10 relative">
        <Header />

        {/* Scrollable Content Viewport */}
        <main className="flex-1 overflow-y-auto bg-surfaceLight-pearl/80">
          {children}
        </main>
      </div>

      {/* Single Global Instance of AI Assistant Modal */}
      <AiAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />
    </div>
  );
}

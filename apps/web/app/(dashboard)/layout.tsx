import React from "react";
import Sidebar from "@/widgets/Sidebar";
import Header from "@/widgets/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-surfaceLight-pearl text-textGray-primary overflow-hidden font-sans transition-colors duration-200 relative">
      {/* Ambient Glow Orbs created directly from Color Mode Green #4B8E55 */}
      <div className="absolute -top-24 -right-24 w-[650px] h-[650px] bg-[#4B8E55]/15 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-10 left-1/3 w-[450px] h-[450px] bg-[#6BA374]/10 rounded-full blur-[110px] pointer-events-none z-0" />

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
    </div>
  );
}

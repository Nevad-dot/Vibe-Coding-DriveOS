import React from "react";
import GalleryHeroHeader from "@/features/gallery/components/GalleryHeroHeader";
import FeaturedVehicleStage from "@/features/gallery/components/FeaturedVehicleStage";
import VehicleGalleryGrid from "@/features/gallery/components/VehicleGalleryGrid";

export const metadata = {
  title: "DriveOS — Premium Vehicle Gallery",
  description: "Premium Vehicle Gallery — 360° showroom viewer & vehicle presentation suite.",
};

export default function GalleryPage() {
  return (
    <div className="w-full flex flex-col">
      {/* Top Header Banner: Pure White background with horizontal divider line */}
      <div className="bg-surfaceLight-card border-b border-surfaceLight-border px-6 md:px-8 py-6 md:py-7 w-full">
        <div className="max-w-[1440px] mx-auto">
          <GalleryHeroHeader />
        </div>
      </div>

      {/* Main Gallery Canvas: Slightly tinted gray background with featured stage and vehicle grid */}
      <div className="bg-surfaceLight-pearl px-6 md:px-8 py-6 md:py-8 w-full min-h-[calc(100vh-200px)]">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-8">
          {/* 1. Featured Vehicle Stage (Centerpiece) */}
          <FeaturedVehicleStage />

          {/* 2. 6 Vehicle Showcase Cards (2x3 Grid) */}
          <VehicleGalleryGrid />
        </div>
      </div>
    </div>
  );
}

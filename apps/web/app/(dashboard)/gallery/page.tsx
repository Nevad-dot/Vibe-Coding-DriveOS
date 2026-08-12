"use client";

import React, { useState, useEffect } from "react";
import GalleryHeroHeader from "@/features/gallery/components/GalleryHeroHeader";
import FeaturedVehicleStage from "@/features/gallery/components/FeaturedVehicleStage";
import VehicleGalleryGrid from "@/features/gallery/components/VehicleGalleryGrid";
import { vehiclesService, VehicleRecord } from "@/shared/lib/supabase/vehiclesService";

export default function GalleryPage() {
  const [vehicles, setVehicles] = useState<VehicleRecord[]>([]);

  useEffect(() => {
    vehiclesService.getAll().then((data) => setVehicles(data));
  }, []);

  const handleAddVehicle = async (data: { vehicleName: string; brand: string; price: string; units: number; branch: string; has360: boolean }) => {
    const created = await vehiclesService.create({
      name: data.vehicleName,
      brand: data.brand,
      price: data.price,
      units: data.units,
      branch: data.branch,
      has360: data.has360,
    });
    setVehicles((prev) => [created, ...prev]);
  };

  return (
    <div className="w-full max-w-full flex flex-col min-h-screen">
      {/* Top Header Banner */}
      <div className="bg-surfaceLight-card border-b border-surfaceLight-border px-[20px] md:px-8 py-5 md:py-7 w-full">
        <div className="max-w-[1440px] mx-auto">
          <GalleryHeroHeader onAddVehicle={handleAddVehicle} />
        </div>
      </div>

      {/* Main Gallery Canvas */}
      <div className="bg-surfaceLight-pearl px-[20px] md:px-8 py-5 md:py-8 w-full min-h-[calc(100vh-200px)]">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-8">
          {/* 1. Featured Vehicle Stage (Centerpiece) */}
          <FeaturedVehicleStage />

          {/* 2. Persistent Vehicle Showcase Grid */}
          <VehicleGalleryGrid vehicles={vehicles} />
        </div>
      </div>
    </div>
  );
}

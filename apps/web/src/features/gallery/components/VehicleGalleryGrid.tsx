"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { RotateCw, ChevronRight } from "lucide-react";
import { VehicleDetailModal } from "./VehicleDetailModal";
import { Viewer360Modal } from "./Viewer360Modal";
import { vehiclesService, VehicleRecord } from "@/shared/lib/supabase/vehiclesService";

interface VehicleGalleryGridProps {
  vehicles?: VehicleRecord[];
}

export const VehicleGalleryGrid: React.FC<VehicleGalleryGridProps> = ({ vehicles: customVehicles }) => {
  const [items, setItems] = useState<VehicleRecord[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [viewer360Vehicle, setViewer360Vehicle] = useState<any>(null);

  useEffect(() => {
    if (customVehicles && customVehicles.length > 0) {
      setItems(customVehicles);
    } else {
      vehiclesService.getAll().then((data) => setItems(data));
    }
  }, [customVehicles]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-surfaceLight-card border border-surfaceLight-border rounded-2xl overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all duration-300"
          >
            {/* Full Frame Studio Image Container */}
            <div className="relative w-full h-[240px] overflow-hidden rounded-t-2xl bg-gradient-to-b from-surfaceLight-pearl to-surfaceLight-card">
              <Image
                src={item.image_url || "/images/gallery/porsche_gt3.png"}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />

              {/* 360° View Button on EVERY vehicle card section */}
              <button
                type="button"
                onClick={() => setViewer360Vehicle(item)}
                className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-surfaceLight-card/90 border border-surfaceLight-border text-[11.5px] font-semibold text-brand flex items-center gap-1.5 shadow-sm backdrop-blur-xs hover:bg-surfaceLight-card cursor-pointer transition-all hover:scale-105"
              >
                <RotateCw className="w-3.5 h-3.5 text-[#4B8E55]" />
                <span>360° View</span>
              </button>
            </div>

            {/* Content & Action Bar */}
            <div className="p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[17px] font-semibold text-textGray-display group-hover:text-brand transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-[12px] text-textGray-tertiary font-normal">
                    {item.brand} · {item.branch || "Jakarta Pusat"}
                  </span>
                </div>
                <span className="text-[16px] font-bold text-textGray-display">{item.price}</span>
              </div>

              <div className="pt-3 border-t border-surfaceLight-border flex items-center justify-between">
                <span className="text-[12px] text-textGray-tertiary font-medium">
                  {typeof item.units === "number" ? `${item.units} unit` : item.units} tersedia
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedVehicle(item)}
                  className="text-[13px] font-semibold text-brand hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Detail Spesifikasi</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Vehicle Specification Detail Modal */}
      {selectedVehicle && (
        <VehicleDetailModal
          isOpen={Boolean(selectedVehicle)}
          onClose={() => setSelectedVehicle(null)}
          vehicle={{
            name: selectedVehicle.name,
            price: selectedVehicle.price,
            units: typeof selectedVehicle.units === "number" ? `${selectedVehicle.units} unit` : selectedVehicle.units,
            image: selectedVehicle.image_url || "/images/gallery/porsche_gt3.png",
            brand: selectedVehicle.brand,
          }}
        />
      )}

      {/* 360 Degree Viewer Modal */}
      {viewer360Vehicle && (
        <Viewer360Modal
          isOpen={Boolean(viewer360Vehicle)}
          onClose={() => setViewer360Vehicle(null)}
          vehicleName={viewer360Vehicle.name}
          imageUrl={viewer360Vehicle.image_url}
        />
      )}
    </>
  );
};

export default VehicleGalleryGrid;

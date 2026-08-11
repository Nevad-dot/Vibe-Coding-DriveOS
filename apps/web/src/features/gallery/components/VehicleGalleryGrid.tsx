"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { RotateCw, ChevronRight, Trash2 } from "lucide-react";
import { VehicleDetailModal } from "./VehicleDetailModal";
import { Viewer360Modal } from "./Viewer360Modal";
import { ConfirmDeleteModal } from "@/shared/components/ConfirmDeleteModal";
import { vehiclesService, VehicleRecord } from "@/shared/lib/supabase/vehiclesService";
import { formatCurrencyValue } from "@/shared/lib/settingsStore";

interface VehicleGalleryGridProps {
  vehicles?: VehicleRecord[];
}

export const VehicleGalleryGrid: React.FC<VehicleGalleryGridProps> = ({ vehicles: customVehicles }) => {
  const [items, setItems] = useState<VehicleRecord[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [viewer360Vehicle, setViewer360Vehicle] = useState<any>(null);
  const [deleteTarget, setDeleteTarget] = useState<VehicleRecord | null>(null);
  const [, setRefreshTick] = useState(0);

  useEffect(() => {
    if (customVehicles && customVehicles.length > 0) {
      setItems(customVehicles);
    } else {
      vehiclesService.getAll().then((data) => setItems(data));
    }

    const handleSettingsChange = () => {
      setRefreshTick((prev) => prev + 1);
    };
    window.addEventListener("driveos-settings-changed", handleSettingsChange);
    return () => window.removeEventListener("driveos-settings-changed", handleSettingsChange);
  }, [customVehicles]);

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    await vehiclesService.delete(deleteTarget.id);
    setItems((prev) => prev.filter((v) => v.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-surfaceLight-card border border-surfaceLight-border rounded-2xl overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all duration-300 relative"
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

              {/* 360° View Button */}
              <button
                type="button"
                onClick={() => setViewer360Vehicle(item)}
                className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-surfaceLight-card border border-surfaceLight-border text-[11.5px] font-semibold text-brand flex items-center gap-1.5 shadow-xs hover:bg-surfaceLight-pearl cursor-pointer transition-all hover:scale-105 z-10"
              >
                <RotateCw className="w-3.5 h-3.5 text-[#4B8E55]" />
                <span>360° View</span>
              </button>

              {/* Sleek Consistent Delete Action Badge */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteTarget(item);
                }}
                className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-surfaceLight-card border border-surfaceLight-border text-[11.5px] font-semibold text-textGray-secondary hover:text-red-600 hover:border-red-500/30 shadow-xs flex items-center gap-1.5 cursor-pointer transition-all opacity-0 group-hover:opacity-100 hover:scale-105 z-10"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus</span>
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
                <span className="text-[16px] font-bold text-textGray-display">{formatCurrencyValue(item.price)}</span>
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

      {/* Custom Confirmation Delete Popup Modal */}
      <ConfirmDeleteModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title="Konfirmasi Hapus Kendaraan"
        itemName={deleteTarget?.name || "Kendaraan"}
        description="Tindakan ini akan menghapus data unit kendaraan dari database DriveOS secara permanen."
      />
    </>
  );
};

export default VehicleGalleryGrid;

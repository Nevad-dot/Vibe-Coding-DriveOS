"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCw, ChevronRight, Trash2, RotateCcw } from "lucide-react";
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
  const [lastDeletedVehicle, setLastDeletedVehicle] = useState<VehicleRecord | null>(null);
  const [undoTimer, setUndoTimer] = useState<NodeJS.Timeout | null>(null);
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
    const target = deleteTarget;
    await vehiclesService.delete(target.id);
    setItems((prev) => prev.filter((v) => v.id !== target.id));
    setDeleteTarget(null);
    setLastDeletedVehicle(target);

    if (undoTimer) clearTimeout(undoTimer);
    const timer = setTimeout(() => {
      setLastDeletedVehicle(null);
    }, 7000);
    setUndoTimer(timer);
  };

  const handleUndoDelete = async () => {
    if (!lastDeletedVehicle) return;
    const restored = await vehiclesService.create({
      name: lastDeletedVehicle.name,
      brand: lastDeletedVehicle.brand,
      price: lastDeletedVehicle.price,
      units: lastDeletedVehicle.units,
      branch: lastDeletedVehicle.branch,
      has360: lastDeletedVehicle.has360,
      image_url: lastDeletedVehicle.image_url,
    });
    setItems((prev) => [restored, ...prev]);
    setLastDeletedVehicle(null);
    if (undoTimer) clearTimeout(undoTimer);
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

      {/* Floating Undo Delete Toast Notification - Positioned Bottom-Right & Mobile Browser Bar Clear */}
      <AnimatePresence>
        {lastDeletedVehicle && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 450, damping: 30 }}
            className="fixed bottom-24 right-4 sm:bottom-6 sm:right-6 z-[999] w-[calc(100%-2rem)] sm:w-auto max-w-[calc(100%-2rem)] sm:max-w-md px-4 py-3 rounded-2xl bg-surfaceLight-card dark:bg-[#16181F] border border-surfaceLight-border dark:border-[#222F43] shadow-2xl flex items-center justify-between gap-3 text-[13px]"
          >
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <span className="w-2 h-2 rounded-full bg-[#4B8E55] shrink-0 animate-pulse" />
              <span className="text-textGray-display font-medium text-[12.5px] sm:text-[13px] truncate">
                Unit <strong className="font-bold text-textGray-display">{lastDeletedVehicle.name}</strong> dihapus.
              </span>
            </div>

            <button
              type="button"
              onClick={handleUndoDelete}
              className="px-3.5 py-1.5 rounded-full bg-green-gradient-pill text-white font-semibold text-[12px] inline-flex items-center justify-center gap-1.5 shadow-xs hover:opacity-95 cursor-pointer shrink-0 whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Batal Hapus</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VehicleGalleryGrid;

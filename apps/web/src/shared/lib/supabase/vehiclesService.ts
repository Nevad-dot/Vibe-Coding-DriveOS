import { supabase, isSupabaseConfigured } from "./client";

export interface VehicleRecord {
  id: string;
  name: string;
  brand: string;
  price: string;
  units: number | string;
  branch: string;
  has360?: boolean;
  image_url?: string;
  created_at?: string;
}

const LOCAL_STORAGE_KEY = "driveos_vehicles_db_v1";

const INITIAL_VEHICLES: VehicleRecord[] = [
  {
    id: "v-101",
    name: "Porsche 911 GT3",
    brand: "Porsche",
    price: "Rp 5,8 M",
    units: 3,
    branch: "Jakarta Pusat",
    has360: true,
    image_url: "/images/gallery/porsche_gt3.png",
  },
  {
    id: "v-102",
    name: "BMW M5 Competition",
    brand: "BMW",
    price: "Rp 3,4 M",
    units: 5,
    branch: "Jakarta Pusat",
    has360: false,
    image_url: "/images/gallery/bmw_m5.png",
  },
  {
    id: "v-103",
    name: "Mercedes-AMG GT",
    brand: "Mercedes",
    price: "Rp 4,9 M",
    units: 2,
    branch: "Surabaya",
    has360: false,
    image_url: "/images/gallery/mercedes_amg_gt.png",
  },
  {
    id: "v-104",
    name: "Audi RS e-tron GT",
    brand: "Audi",
    price: "Rp 4,1 M",
    units: 4,
    branch: "Bandung",
    has360: false,
    image_url: "/images/gallery/audi_etron.png",
  },
  {
    id: "v-105",
    name: "Ferrari 296 GTB",
    brand: "Ferrari",
    price: "Rp 9,6 M",
    units: 1,
    branch: "Jakarta Selatan",
    has360: false,
    image_url: "/images/gallery/ferrari_296.png",
  },
  {
    id: "v-106",
    name: "Tesla Model S Plaid",
    brand: "Tesla",
    price: "Rp 2,8 M",
    units: 7,
    branch: "Jakarta Pusat",
    has360: false,
    image_url: "/images/gallery/tesla_model_s.png",
  },
];

export const vehiclesService = {
  async getAll(): Promise<VehicleRecord[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from("vehicles")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0) {
          return data.map((v) => ({
            id: v.id,
            name: v.name,
            brand: v.brand,
            price: v.price,
            units: v.units,
            branch: v.branch,
            has360: v.has_360,
            image_url: v.image_url,
            created_at: v.created_at,
          }));
        }
      } catch (e) {
        console.warn("Supabase fetch failed, fallback to local storage:", e);
      }
    }

    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {}
      }
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_VEHICLES));
    }
    return INITIAL_VEHICLES;
  },

  async create(vehicle: Omit<VehicleRecord, "id">): Promise<VehicleRecord> {
    const newRecord: VehicleRecord = {
      ...vehicle,
      id: `v-${Date.now()}`,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from("vehicles")
          .insert([
            {
              name: vehicle.name,
              brand: vehicle.brand,
              price: vehicle.price,
              units: typeof vehicle.units === "number" ? vehicle.units : parseInt(String(vehicle.units)) || 1,
              branch: vehicle.branch || "Jakarta Pusat",
              has_360: vehicle.has360 ?? true,
              image_url: vehicle.image_url || "/images/gallery/porsche_gt3.png",
            },
          ])
          .select()
          .single();

        if (!error && data) {
          return {
            id: data.id,
            name: data.name,
            brand: data.brand,
            price: data.price,
            units: data.units,
            branch: data.branch,
            has360: data.has_360,
            image_url: data.image_url,
            created_at: data.created_at,
          };
        }
      } catch (e) {
        console.warn("Supabase insert failed, fallback to local storage:", e);
      }
    }

    if (typeof window !== "undefined") {
      const existing = await this.getAll();
      const updated = [newRecord, ...existing];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    }
    return newRecord;
  },
};

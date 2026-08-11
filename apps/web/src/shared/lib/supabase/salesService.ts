import { supabase, isSupabaseConfigured } from "./client";

export interface DealRecord {
  id: string;
  customerName: string;
  vehicleModel: string;
  dealValue: string;
  stage: string;
  consultant: string;
  created_at?: string;
}

const LOCAL_STORAGE_KEY = "driveos_sales_deals_db_v1";

const INITIAL_DEALS: DealRecord[] = [
  {
    id: "d-101",
    customerName: "PT Trans Logistik",
    vehicleModel: "Porsche 911 GT3",
    dealValue: "Rp 5.800.000.000",
    stage: "Negosiasi",
    consultant: "Rendra (Sales)",
  },
  {
    id: "d-102",
    customerName: "Bpk. David Kurniawan",
    vehicleModel: "BMW X7 M Sport",
    dealValue: "Rp 2.450.000.000",
    stage: "SPK Diterbitkan",
    consultant: "Diva (Corporate)",
  },
  {
    id: "d-103",
    customerName: "Ibu Sinta Pramudita",
    vehicleModel: "Mercedes-Benz S 450",
    dealValue: "Rp 3.200.000.000",
    stage: "Proposal Sent",
    consultant: "Ilham (Showroom)",
  },
];

export const salesService = {
  async getAll(): Promise<DealRecord[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from("sales_deals")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0) {
          return data.map((d) => ({
            id: d.id,
            customerName: d.customer_name,
            vehicleModel: d.vehicle_model,
            dealValue: d.deal_value,
            stage: d.stage,
            consultant: d.consultant,
            created_at: d.created_at,
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
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_DEALS));
    }
    return INITIAL_DEALS;
  },

  async create(deal: Omit<DealRecord, "id">): Promise<DealRecord> {
    const newRecord: DealRecord = {
      ...deal,
      id: `d-${Date.now()}`,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from("sales_deals")
          .insert([
            {
              customer_name: deal.customerName,
              vehicle_model: deal.vehicleModel,
              deal_value: deal.dealValue,
              stage: deal.stage || "Negosiasi",
              consultant: deal.consultant || "Rendra",
            },
          ])
          .select()
          .single();

        if (!error && data) {
          return {
            id: data.id,
            customerName: data.customer_name,
            vehicleModel: data.vehicle_model,
            dealValue: data.deal_value,
            stage: data.stage,
            consultant: data.consultant,
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

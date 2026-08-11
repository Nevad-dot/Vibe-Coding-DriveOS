import { supabase, isSupabaseConfigured } from "./client";

export interface RestockOrderRecord {
  id: string;
  brand: string;
  model: string;
  quantity: number | string;
  branch: string;
  priority: string;
  status: string;
  created_at?: string;
}

const LOCAL_STORAGE_KEY = "driveos_restock_orders_db_v1";

const INITIAL_RESTOCK: RestockOrderRecord[] = [
  {
    id: "rst-101",
    brand: "Porsche",
    model: "911 GT3",
    quantity: 3,
    branch: "Jakarta Pusat",
    priority: "Prioritas Tinggi (3 Hari)",
    status: "Pending Approval",
  },
  {
    id: "rst-102",
    brand: "BMW",
    model: "M5 Competition",
    quantity: 5,
    branch: "Surabaya",
    priority: "Standar (7 Hari)",
    status: "Approved",
  },
];

export const inventoryService = {
  async getAll(): Promise<RestockOrderRecord[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from("restock_orders")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0) {
          return data as RestockOrderRecord[];
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
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_RESTOCK));
    }
    return INITIAL_RESTOCK;
  },

  async create(order: Omit<RestockOrderRecord, "id">): Promise<RestockOrderRecord> {
    const newRecord: RestockOrderRecord = {
      ...order,
      id: `rst-${Date.now()}`,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from("restock_orders")
          .insert([
            {
              brand: order.brand,
              model: order.model,
              quantity: typeof order.quantity === "number" ? order.quantity : parseInt(String(order.quantity)) || 1,
              branch: order.branch || "Jakarta Pusat",
              priority: order.priority || "Prioritas Tinggi (3 Hari)",
              status: order.status || "Pending Approval",
            },
          ])
          .select()
          .single();

        if (!error && data) {
          return data as RestockOrderRecord;
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

  async update(id: string, updates: Partial<Omit<RestockOrderRecord, "id">>): Promise<boolean> {
    if (isSupabaseConfigured) {
      try {
        await supabase
          .from("restock_orders")
          .update({
            ...(updates.brand && { brand: updates.brand }),
            ...(updates.model && { model: updates.model }),
            ...(updates.quantity !== undefined && { quantity: updates.quantity }),
            ...(updates.branch && { branch: updates.branch }),
            ...(updates.priority && { priority: updates.priority }),
            ...(updates.status && { status: updates.status }),
          })
          .eq("id", id);
      } catch (e) {
        console.warn("Supabase update failed:", e);
      }
    }

    if (typeof window !== "undefined") {
      const existing = await this.getAll();
      const updated = existing.map((item) => (item.id === id ? { ...item, ...updates } : item));
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    }
    return true;
  },

  async delete(id: string): Promise<boolean> {
    if (isSupabaseConfigured) {
      try {
        await supabase.from("restock_orders").delete().eq("id", id);
      } catch (e) {
        console.warn("Supabase delete failed:", e);
      }
    }

    if (typeof window !== "undefined") {
      const existing = await this.getAll();
      const updated = existing.filter((item) => item.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    }
    return true;
  },
};

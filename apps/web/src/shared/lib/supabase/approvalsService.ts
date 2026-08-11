import { supabase, isSupabaseConfigured } from "./client";

export interface ApprovalRecord {
  id: string;
  title: string;
  meta: string;
  amount: string;
  status: "Pending" | "Approved" | "Rejected";
  created_at?: string;
}

const LOCAL_STORAGE_KEY = "driveos_approvals_db_v1";

const INITIAL_APPROVALS: ApprovalRecord[] = [
  {
    id: "a-101",
    title: "Diskon 8% · Mercedes S-Class",
    meta: "Rendra · Jakarta Pusat · 12m lalu",
    amount: "Rp 2,4 M",
    status: "Pending",
  },
  {
    id: "a-102",
    title: "Fleet contract · Kirana Logistik",
    meta: "Diva · Corporate · 1h lalu",
    amount: "18 unit",
    status: "Pending",
  },
  {
    id: "a-103",
    title: "Trade-in · BMW X5 2022",
    meta: "Ilham · Bandung · 2h lalu",
    amount: "Rp 890 jt",
    status: "Pending",
  },
  {
    id: "a-104",
    title: "Waive fee · Ferrari 296",
    meta: "Nadia · Service · 3h lalu",
    amount: "Rp 12 jt",
    status: "Pending",
  },
];

export const approvalsService = {
  async getAll(): Promise<ApprovalRecord[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from("executive_approvals")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0) {
          return data.map((a) => ({
            id: a.id,
            title: a.title,
            meta: a.meta,
            amount: a.amount,
            status: a.status,
            created_at: a.created_at,
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
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_APPROVALS));
    }
    return INITIAL_APPROVALS;
  },

  async updateStatus(id: string, status: "Approved" | "Rejected"): Promise<boolean> {
    if (isSupabaseConfigured) {
      try {
        await supabase
          .from("executive_approvals")
          .update({ status, reviewed_at: new Date().toISOString() })
          .eq("id", id);
      } catch (e) {
        console.warn("Supabase updateStatus failed:", e);
      }
    }

    if (typeof window !== "undefined") {
      const existing = await this.getAll();
      const updated = existing.map((item) => (item.id === id ? { ...item, status } : item));
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    }
    return true;
  },

  async delete(id: string): Promise<boolean> {
    if (isSupabaseConfigured) {
      try {
        await supabase.from("executive_approvals").delete().eq("id", id);
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

  async approveAll(): Promise<void> {
    if (isSupabaseConfigured) {
      try {
        await supabase
          .from("executive_approvals")
          .update({ status: "Approved", reviewed_at: new Date().toISOString() })
          .eq("status", "Pending");
      } catch (e) {
        console.warn("Supabase approveAll failed:", e);
      }
    }

    if (typeof window !== "undefined") {
      const existing = await this.getAll();
      const updated = existing.map((item) => ({ ...item, status: "Approved" as const }));
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    }
  },
};

import { supabase, isSupabaseConfigured } from "./client";

export interface CampaignRecord {
  id: string;
  name: string;
  segment: string;
  channel: string;
  subject: string;
  message?: string;
  status: string;
  created_at?: string;
}

const LOCAL_STORAGE_KEY = "driveos_campaigns_db_v1";

const INITIAL_CAMPAIGNS: CampaignRecord[] = [
  {
    id: "c-101",
    name: "Promo Akhir Tahun 2026",
    segment: "Semua Pelanggan",
    channel: "Email Marketing",
    subject: "Diskon Spesial Porsche 911 GT3 & Bonus Servis 1 Tahun",
    message: "Penawaran eksklusif promo akhir tahun.",
    status: "Terkirim",
  },
  {
    id: "c-102",
    name: "Exclusive VIP Preview",
    segment: "Pelanggan VIP",
    channel: "WhatsApp Blast",
    subject: "Undangan Special Test Drive Ferrari 296 GTB di Showroom",
    message: "Undangan khusus test drive VIP.",
    status: "Terkirim",
  },
];

export const campaignsService = {
  async getAll(): Promise<CampaignRecord[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from("campaigns")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0) {
          return data as CampaignRecord[];
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
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_CAMPAIGNS));
    }
    return INITIAL_CAMPAIGNS;
  },

  async create(campaign: Omit<CampaignRecord, "id">): Promise<CampaignRecord> {
    const newRecord: CampaignRecord = {
      ...campaign,
      id: `c-${Date.now()}`,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from("campaigns")
          .insert([
            {
              name: campaign.name,
              segment: campaign.segment,
              channel: campaign.channel,
              subject: campaign.subject,
              message: campaign.message || "",
              status: campaign.status || "Terkirim",
            },
          ])
          .select()
          .single();

        if (!error && data) {
          return data as CampaignRecord;
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

  async update(id: string, updates: Partial<Omit<CampaignRecord, "id">>): Promise<boolean> {
    if (isSupabaseConfigured) {
      try {
        await supabase
          .from("campaigns")
          .update({
            ...(updates.name && { name: updates.name }),
            ...(updates.segment && { segment: updates.segment }),
            ...(updates.channel && { channel: updates.channel }),
            ...(updates.subject && { subject: updates.subject }),
            ...(updates.message && { message: updates.message }),
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
        await supabase.from("campaigns").delete().eq("id", id);
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

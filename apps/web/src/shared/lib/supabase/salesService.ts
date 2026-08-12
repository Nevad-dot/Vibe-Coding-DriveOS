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

export interface SalesChartBar {
  label: string;
  subtitle?: string;
  val: number;
  revenueText: string;
  heightPercent: number;
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

const BASE_MONTHLY_DATA = [
  { label: "Jan", units: 32, rev: 21.4 },
  { label: "Feb", units: 38, rev: 26.8 },
  { label: "Mar", units: 42, rev: 31.2 },
  { label: "Apr", units: 35, rev: 24.5 },
  { label: "Mei", units: 48, rev: 34.2 },
  { label: "Jun", units: 56, rev: 38.9 },
  { label: "Jul", units: 64, rev: 42.8 },
  { label: "Agu", units: 58, rev: 39.5 },
  { label: "Sep", units: 62, rev: 41.2 },
  { label: "Okt", units: 54, rev: 36.0 },
  { label: "Nov", units: 68, rev: 45.5 },
  { label: "Des", units: 76, rev: 52.0 },
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
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
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

  async update(id: string, updates: Partial<Omit<DealRecord, "id">>): Promise<boolean> {
    if (isSupabaseConfigured) {
      try {
        await supabase
          .from("sales_deals")
          .update({
            ...(updates.customerName && { customer_name: updates.customerName }),
            ...(updates.vehicleModel && { vehicle_model: updates.vehicleModel }),
            ...(updates.dealValue && { deal_value: updates.dealValue }),
            ...(updates.stage && { stage: updates.stage }),
            ...(updates.consultant && { consultant: updates.consultant }),
          })
          .eq("id", id);
      } catch (e) {
        console.warn("Supabase update failed:", e);
      }
    }

    if (typeof window !== "undefined") {
      const existing = await this.getAll();
      const updated = existing.map((d) => (d.id === id ? { ...d, ...updates } : d));
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    }
    return true;
  },

  async delete(id: string): Promise<boolean> {
    if (isSupabaseConfigured) {
      try {
        await supabase.from("sales_deals").delete().eq("id", id);
      } catch (e) {
        console.warn("Supabase delete failed:", e);
      }
    }

    if (typeof window !== "undefined") {
      const existing = await this.getAll();
      const updated = existing.filter((d) => d.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    }
    return true;
  },

  async getSalesTrendData(period: "Bulanan" | "Kuartal"): Promise<SalesChartBar[]> {
    const allDeals = await this.getAll();
    const extraDealsCount = Math.max(0, allDeals.length - INITIAL_DEALS.length);

    if (period === "Bulanan") {
      const monthly = BASE_MONTHLY_DATA.map((item, idx) => {
        const isCurrentMonth = idx === 6 || idx === 7;
        const extraUnits = isCurrentMonth ? extraDealsCount * 2 : 0;
        const extraRev = isCurrentMonth ? extraDealsCount * 3.5 : 0;

        const totalUnits = item.units + extraUnits;
        const totalRev = (item.rev + extraRev).toFixed(1);

        return {
          label: item.label,
          val: totalUnits,
          revenueText: `Rp ${totalRev} M`,
          units: totalUnits,
        };
      });

      const maxVal = Math.max(...monthly.map((m) => m.val));
      return monthly.map((m) => ({
        label: m.label,
        val: m.val,
        revenueText: m.revenueText,
        heightPercent: Math.round((m.val / maxVal) * 94),
      }));
    } else {
      const q1Units = BASE_MONTHLY_DATA[0].units + BASE_MONTHLY_DATA[1].units + BASE_MONTHLY_DATA[2].units;
      const q1Rev = (BASE_MONTHLY_DATA[0].rev + BASE_MONTHLY_DATA[1].rev + BASE_MONTHLY_DATA[2].rev).toFixed(1);

      const q2Units = BASE_MONTHLY_DATA[3].units + BASE_MONTHLY_DATA[4].units + BASE_MONTHLY_DATA[5].units;
      const q2Rev = (BASE_MONTHLY_DATA[3].rev + BASE_MONTHLY_DATA[4].rev + BASE_MONTHLY_DATA[5].rev).toFixed(1);

      const q3Units = BASE_MONTHLY_DATA[6].units + BASE_MONTHLY_DATA[7].units + BASE_MONTHLY_DATA[8].units + extraDealsCount * 2;
      const q3Rev = (BASE_MONTHLY_DATA[6].rev + BASE_MONTHLY_DATA[7].rev + BASE_MONTHLY_DATA[8].rev + extraDealsCount * 3.5).toFixed(1);

      const q4Units = BASE_MONTHLY_DATA[9].units + BASE_MONTHLY_DATA[10].units + BASE_MONTHLY_DATA[11].units;
      const q4Rev = (BASE_MONTHLY_DATA[9].rev + BASE_MONTHLY_DATA[10].rev + BASE_MONTHLY_DATA[11].rev).toFixed(1);

      const quarters = [
        { label: "Q1 2026", subtitle: "Jan – Mar", val: q1Units, revenueText: `Rp ${q1Rev} M` },
        { label: "Q2 2026", subtitle: "Apr – Jun", val: q2Units, revenueText: `Rp ${q2Rev} M` },
        { label: "Q3 2026", subtitle: "Jul – Sep", val: q3Units, revenueText: `Rp ${q3Rev} M` },
        { label: "Q4 2026", subtitle: "Okt – Des", val: q4Units, revenueText: `Rp ${q4Rev} M` },
      ];

      const maxVal = Math.max(...quarters.map((q) => q.val));
      return quarters.map((q) => ({
        label: q.label,
        subtitle: q.subtitle,
        val: q.val,
        revenueText: q.revenueText,
        heightPercent: Math.round((q.val / maxVal) * 94),
      }));
    }
  },
};

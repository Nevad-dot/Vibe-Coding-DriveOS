import { supabase, isSupabaseConfigured } from "./client";

export interface ServiceAppointmentRecord {
  id: string;
  vehiclePlate: string;
  customerName: string;
  serviceType: string;
  bay: string;
  date: string;
  time: string;
  status: string;
  created_at?: string;
}

const LOCAL_STORAGE_KEY = "driveos_service_appointments_db_v1";

const INITIAL_APPOINTMENTS: ServiceAppointmentRecord[] = [
  {
    id: "srv-101",
    vehiclePlate: "BMW X7 (B 1088 RFS)",
    customerName: "Bpk. Rian",
    serviceType: "Servis Berkala",
    bay: "Bay 01 Express",
    date: "Hari ini",
    time: "09:00 WIB",
    status: "Scheduled",
  },
  {
    id: "srv-102",
    vehiclePlate: "Porsche Cayenne (D 1402 ABD)",
    customerName: "Bpk. Hendra",
    serviceType: "Inspeksi Mesin",
    bay: "Bay 02 Heavy Repair",
    date: "Hari ini",
    time: "11:30 WIB",
    status: "In Progress",
  },
];

export const serviceAppointmentsService = {
  async getAll(): Promise<ServiceAppointmentRecord[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from("service_appointments")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0) {
          return data.map((s) => ({
            id: s.id,
            vehiclePlate: s.vehicle_plate,
            customerName: s.customer_name,
            serviceType: s.service_type,
            bay: s.bay,
            date: s.appointment_date || "Hari ini",
            time: s.appointment_time || "09:00",
            status: s.status,
            created_at: s.created_at,
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
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_APPOINTMENTS));
    }
    return INITIAL_APPOINTMENTS;
  },

  async create(app: Omit<ServiceAppointmentRecord, "id">): Promise<ServiceAppointmentRecord> {
    const newRecord: ServiceAppointmentRecord = {
      ...app,
      id: `srv-${Date.now()}`,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from("service_appointments")
          .insert([
            {
              vehicle_plate: app.vehiclePlate,
              customer_name: app.customerName,
              service_type: app.serviceType,
              bay: app.bay,
              appointment_time: app.time || "09:00",
              status: app.status || "Scheduled",
            },
          ])
          .select()
          .single();

        if (!error && data) {
          return {
            id: data.id,
            vehiclePlate: data.vehicle_plate,
            customerName: data.customer_name,
            serviceType: data.service_type,
            bay: data.bay,
            date: data.appointment_date || "Hari ini",
            time: data.appointment_time || "09:00",
            status: data.status,
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

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MessageSquare } from "lucide-react";

const CUSTOMERS = [
  {
    name: "Bambang Soesatyo",
    email: "bambang.s@corporate.id",
    phone: "+62 811-9842-110",
    tier: "VIP Black",
    tierColor: "bg-slate-900 text-amber-400 border border-amber-400/30",
    vehicles: "Porsche Cayenne, Ferrari 296",
    totalSpend: "Rp 13,05 M",
    lastActive: "2 jam lalu",
  },
  {
    name: "Kirana Logistik PT",
    email: "procurement@kiranalogistik.com",
    phone: "+62 812-4421-998",
    tier: "Fleet Corporate",
    tierColor: "bg-blue-500/15 text-blue-600 border border-blue-500/30",
    vehicles: "18 Unit Fleet Mixed",
    totalSpend: "Rp 24,80 M",
    lastActive: "Kemarin",
  },
  {
    name: "Dr. Hendra Wijaya",
    email: "hendra.w@medika.org",
    phone: "+62 813-7761-002",
    tier: "VIP Platinum",
    tierColor: "bg-emerald-500/15 text-emerald-600 border border-emerald-500/30",
    vehicles: "BMW X7 xDrive40i",
    totalSpend: "Rp 2,68 M",
    lastActive: "3 hari lalu",
  },
  {
    name: "Vanessa Anindya",
    email: "vanessa.anindya@gmail.com",
    phone: "+62 817-2291-045",
    tier: "Gold Tier",
    tierColor: "bg-amber-500/15 text-amber-600 border border-amber-500/30",
    vehicles: "Mercedes-Benz C 300",
    totalSpend: "Rp 1,45 M",
    lastActive: "5 hari lalu",
  },
  {
    name: "Rudi & Partners Law",
    email: "rudi@rudi-law.co.id",
    phone: "+62 818-9901-234",
    tier: "VIP Platinum",
    tierColor: "bg-emerald-500/15 text-emerald-600 border border-emerald-500/30",
    vehicles: "Audi Q5, Mercedes S 450",
    totalSpend: "Rp 4,53 M",
    lastActive: "1 minggu lalu",
  },
];

export const CustomersTablePanel: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 22 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 26, delay: 0.2 }}
      className="bg-surfaceLight-card border border-surfaceLight-border p-6 rounded-2xl flex flex-col shadow-xs"
    >
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-medium text-textGray-muted uppercase tracking-[0.08em] block mb-1">
            CLIENT DIRECTORY
          </span>
          <h3 className="text-[18px] font-display font-semibold text-textGray-display">
            Daftar Pelanggan Aktif
          </h3>
        </div>

        <span className="text-[13px] text-textGray-tertiary font-normal">
          Showing 5 of 1.240 clients
        </span>
      </div>

      {/* Table List */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[13.5px]">
          <thead>
            <tr className="border-b border-surfaceLight-border text-[11px] font-semibold text-textGray-muted uppercase tracking-wider">
              <th className="pb-3 font-medium">Pelanggan</th>
              <th className="pb-3 font-medium">Kategori</th>
              <th className="pb-3 font-medium">Kendaraan Owned</th>
              <th className="pb-3 font-medium">Total Spending</th>
              <th className="pb-3 font-medium text-right">Aksi Cepat</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surfaceLight-border">
            {CUSTOMERS.map((client, idx) => (
              <tr key={idx} className="group hover:bg-surfaceLight-pearl/60 transition-colors">
                <td className="py-3.5 pr-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-textGray-display leading-snug">
                      {client.name}
                    </span>
                    <span className="text-[12px] text-textGray-tertiary font-normal">
                      {client.email} · {client.phone}
                    </span>
                  </div>
                </td>

                <td className="py-3.5 px-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${client.tierColor}`}>
                    {client.tier}
                  </span>
                </td>

                <td className="py-3.5 px-2 text-textGray-primary font-normal">
                  {client.vehicles}
                </td>

                <td className="py-3.5 px-2 font-semibold text-textGray-display">
                  {client.totalSpend}
                </td>

                <td className="py-3.5 pl-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button className="p-1.5 rounded-lg border border-surfaceLight-border text-textGray-secondary hover:text-brand hover:border-brand transition-colors" title="Call Client">
                      <Phone className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                    <button className="p-1.5 rounded-lg border border-surfaceLight-border text-textGray-secondary hover:text-brand hover:border-brand transition-colors" title="Send Email">
                      <Mail className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                    <button className="p-1.5 rounded-lg border border-surfaceLight-border text-textGray-secondary hover:text-brand hover:border-brand transition-colors" title="WhatsApp Message">
                      <MessageSquare className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default CustomersTablePanel;

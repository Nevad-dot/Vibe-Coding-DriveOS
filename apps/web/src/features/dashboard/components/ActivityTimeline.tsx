"use client";

import React from "react";

const ACTIVITIES = [
  {
    text: "Sales order #SO-4821 · Porsche Cayenne · closed won",
    time: "Baru saja",
    dotColor: "bg-emerald-500",
  },
  {
    text: "Kontrak fleet 12 unit ditandatangani · Kirana Logistik",
    time: "8m",
    dotColor: "bg-emerald-500",
  },
  {
    text: "Bay 08 overdue 20 menit · Ferrari 296",
    time: "22m",
    dotColor: "bg-red-500",
  },
  {
    text: "AI Assistant menjawab 14 query dari 6 pengguna",
    time: "1h",
    dotColor: "bg-slate-400",
  },
  {
    text: "Restock: 8 unit Audi Q5 tiba di Bandung",
    time: "3h",
    dotColor: "bg-emerald-500",
  },
];

export const ActivityTimeline: React.FC = () => {
  return (
    <div className="bg-surfaceLight-card border border-surfaceLight-border p-6 rounded-2xl flex flex-col shadow-xs opacity-100">
      {/* Header */}
      <div className="mb-4">
        <span className="text-[11px] font-medium text-textGray-muted uppercase tracking-[0.08em] block mb-1">
          ACTIVITY TIMELINE
        </span>
        <h3 className="text-[18px] font-display font-semibold text-textGray-display">
          Live feed
        </h3>
      </div>

      {/* Activity Timeline List */}
      <div className="flex flex-col gap-5 pt-1">
        {ACTIVITIES.map((activity, idx) => (
          <div key={idx} className="relative flex items-start gap-3.5">
            {/* Vertical Connecting Line */}
            {idx < ACTIVITIES.length - 1 && (
              <div className="absolute left-[4.5px] top-[14px] w-[1px] h-[calc(100%+12px)] bg-surfaceLight-border" />
            )}

            {/* Timeline Dot */}
            <span className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 z-10 ${activity.dotColor}`} />

            {/* Title & Sub-timestamp stacked directly underneath */}
            <div className="flex flex-col gap-0.5">
              <span className="text-[13.5px] text-textGray-primary font-normal leading-snug">
                {activity.text}
              </span>
              <span className="text-[12px] text-textGray-tertiary font-normal">
                {activity.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityTimeline;

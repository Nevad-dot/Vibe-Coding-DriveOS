"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface GradientToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
  disabled?: boolean;
}

export const GradientToggleSwitch: React.FC<GradientToggleSwitchProps> = ({
  checked,
  onChange,
  id,
  disabled = false,
}) => {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative w-12 h-6.5 rounded-full transition-colors duration-300 p-0.5 cursor-pointer shadow-2xs shrink-0 flex items-center select-none ${
        checked
          ? "bg-green-gradient-pill border border-[#4B8E55]/30"
          : "bg-surfaceLight-pearl border border-surfaceLight-border hover:border-surfaceLight-border/80"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <motion.div
        animate={{ x: checked ? 22 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className="w-5 h-5 rounded-full bg-white shadow-xs flex items-center justify-center text-[10px] font-bold shrink-0"
      >
        {checked && <Check className="w-3 h-3 text-[#4B8E55]" strokeWidth={3} />}
      </motion.div>
    </button>
  );
};

export default GradientToggleSwitch;

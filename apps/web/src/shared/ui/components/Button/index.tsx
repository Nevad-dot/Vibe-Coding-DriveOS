"use client";

import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "brand" | "outline-pill" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = React.forwardRef(function Button(
  { className, variant = "brand", size = "md", loading, disabled, children, ...props }: ButtonProps,
  ref: React.Ref<HTMLButtonElement>
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={twMerge(
        clsx(
          "inline-flex items-center justify-center font-sans font-medium transition-all duration-150 ease-out active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
          {
            // Dynamic Light & Dark Mode Variant classes
            "bg-brand text-white hover:bg-brand-hover shadow-sm": variant === "brand",
            "bg-surfaceLight-card text-textGray-primary hover:bg-surfaceLight-pearl border border-surfaceLight-border shadow-xs": variant === "outline-pill",
            "bg-transparent text-textGray-secondary hover:bg-black/5": variant === "ghost",

            // Size classes
            "h-10 px-4 text-[14px] rounded-sm": size === "sm",
            "h-[48px] px-[22px] text-[15px] rounded-pill": size === "md",
            "h-[54px] px-[28px] text-[17px] rounded-pill": size === "lg",
          },
          className
        )
      )}
      {...props}
    >
      {loading ? (
        <svg
          className="mr-2 h-4 w-4 animate-spin text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : null}
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;

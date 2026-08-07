"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = React.forwardRef(function Input(
  { className, type = "text", error, ...props }: InputProps,
  ref: React.Ref<HTMLInputElement>
) {
  const isPasswordField = type === "password";
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPasswordField ? (showPassword ? "text" : "password") : type;

  return (
    <div className="w-full">
      <div className="relative w-full">
        <input
          ref={ref}
          type={inputType}
          className={twMerge(
            clsx(
              "w-full h-[46px] px-3.5 bg-surfaceLight-card text-textGray-primary font-sans placeholder-textGray-placeholder rounded-lg border border-surfaceLight-border focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all text-[14px] shadow-xs",
              {
                "pr-10": isPasswordField,
                "border-red-500 focus:border-red-500 focus:ring-red-500": error,
              }
            ),
            className
          )}
          {...props}
        />

        {isPasswordField ? (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-textGray-muted hover:text-textGray-primary transition-colors p-1 focus:outline-none rounded-md"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              /* EyeOff Icon */
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                <line x1="2" x2="22" y1="2" y2="22" />
              </svg>
            ) : (
              /* Eye Icon */
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        ) : null}
      </div>

      {error ? (
        <span className="text-[11px] text-red-500 mt-0.5 block px-1 font-medium">
          {error}
        </span>
      ) : null}
    </div>
  );
});

Input.displayName = "Input";

export default Input;

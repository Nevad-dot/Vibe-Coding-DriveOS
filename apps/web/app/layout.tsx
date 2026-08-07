import React from "react";
import type { Metadata } from "next";
import "@/shared/ui/styles/globals.css";

export const metadata: Metadata = {
  title: "DriveOS — Automotive Intelligence Dashboard",
  description: "DriveOS Automotive Intelligence SaaS Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

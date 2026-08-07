import React from "react";
import { RegisterForm } from "@/features/authentication";

export const metadata = {
  title: "Create your DriveOS Account",
  description: "Register for DriveOS Automotive Intelligence SaaS Platform.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}

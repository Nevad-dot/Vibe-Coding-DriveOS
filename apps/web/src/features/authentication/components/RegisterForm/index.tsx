"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button, Input } from "@/shared/ui/components";

export const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ nama?: string; email?: string; password?: string }>({});

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { nama?: string; email?: string; password?: string } = {};

    if (!nama.trim()) {
      newErrors.nama = "Nama wajib diisi";
    }
    if (!email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Format email tidak valid";
    }
    if (!password) {
      newErrors.password = "Password wajib diisi";
    } else if (password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    if (typeof window !== "undefined") {
      sessionStorage.setItem("user_name", nama.trim().slice(0, 25));
      sessionStorage.setItem("user_email", email.trim());
    }
    router.push("/overview");
  };

  const handleSocialRegister = () => {
    if (typeof window !== "undefined") {
      if (nama.trim()) sessionStorage.setItem("user_name", nama.trim().slice(0, 25));
      if (email.trim()) sessionStorage.setItem("user_email", email.trim());
    }
    router.push("/overview");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 360, damping: 26 }}
      className="w-full max-w-[420px] mx-auto px-6 py-2 my-auto flex flex-col justify-center"
    >
      {/* Back to Landing Page Link */}
      <div className="mb-4 flex justify-center lg:justify-start">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-textGray-tertiary hover:text-textGray-display transition-all px-3.5 py-1.5 rounded-full bg-surfaceLight-card dark:bg-[#16181F] border border-surfaceLight-border dark:border-[#222F43] shadow-2xs hover:border-[#4B8E55]/50 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#4B8E55] group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Landing Page</span>
        </Link>
      </div>
      {/* Header Info */}
      <div className="mb-6">
        <span className="text-[13px] font-sans font-normal text-textGray-secondary block mb-0.5">
          Get started
        </span>
        <h2 className="text-[32px] font-display font-semibold tracking-tight text-textGray-display mb-1.5">
          Create <span className="text-green-gradient">DriveOS</span> Account
        </h2>
        <p className="text-[13px] text-textGray-tertiary leading-relaxed">
          Daftarkan akun tim dealer Anda dalam beberapa detik.
        </p>
      </div>

      {/* Social Sign-In Buttons */}
      <div className="flex flex-col gap-3 mb-5">
        {/* Google Button */}
        <Button onClick={handleSocialRegister} variant="outline-pill" className="w-full relative gap-3 h-[46px] rounded-full dark:border-[#222F43] dark:bg-[#121826]">
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              fill="#EA4335"
            />
          </svg>
          <span className="text-[14px] font-sans font-semibold text-textGray-primary">Register With Google</span>
        </Button>

        {/* Apple Button */}
        <Button onClick={handleSocialRegister} variant="outline-pill" className="w-full relative gap-3 h-[46px] rounded-full dark:border-[#222F43] dark:bg-[#121826]">
          <svg className="w-5 h-5 shrink-0 fill-current text-textGray-primary" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.2.67-2.92 1.51-.64.73-1.2 1.87-1.05 2.98 1.1.09 2.22-.57 2.98-1.43" />
          </svg>
          <span className="text-[14px] font-sans font-semibold text-textGray-primary">Register With Apple</span>
        </Button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 my-4">
        <div className="h-[1px] flex-1 bg-surfaceLight-border dark:bg-[#222F43]"></div>
        <span className="text-[10.5px] font-bold text-textGray-muted uppercase tracking-[0.1em]">OR</span>
        <div className="h-[1px] flex-1 bg-surfaceLight-border dark:bg-[#222F43]"></div>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleRegister} className="flex flex-col gap-3">
        <Input
          type="text"
          placeholder="Nama Lengkap"
          maxLength={25}
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          error={errors.nama}
          className="rounded-full dark:border-[#222F43] dark:bg-[#121826]"
        />
        <Input
          type="email"
          placeholder="Email Dealer"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          className="rounded-full dark:border-[#222F43] dark:bg-[#121826]"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          className="rounded-full dark:border-[#222F43] dark:bg-[#121826]"
        />

        <Button type="submit" variant="brand" className="w-full mt-2 h-[46px] rounded-full bg-green-gradient-pill text-white font-semibold text-[14px] shadow-sm select-none">
          Create Account
        </Button>
      </form>

      {/* Footer Copy & Sign In Link */}
      <div className="mt-6 text-center flex flex-col gap-1.5">
        <p className="text-[13px] text-textGray-secondary">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-brand hover:underline transition-all">
            Sign in
          </Link>
        </p>
        <p className="text-[12px] text-textGray-muted leading-relaxed">
          Dengan mendaftar, Anda menyetujui{" "}
          <a href="#" className="hover:underline transition-all font-medium text-textGray-tertiary">
            Terms & Privacy DriveOS
          </a>
          .
        </p>
      </div>
    </motion.div>
  );
};

export default RegisterForm;

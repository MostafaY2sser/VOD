"use client";

import Link from "next/link";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authApi } from "@/services/auth";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Eye, EyeOff, Loader2, Mail } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

/* ---------------- VALIDATION ---------------- */
const schema = z
  .object({
    first_name: z.string().min(2),
    last_name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const t = useTranslations("auth");
  const locale = useLocale();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      const response = await authApi.register({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
      });

      toast.success(response.message);

      router.push(`/${locale}/login`);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4">

       {/* 🎬 Background Image */}
  <div className="absolute inset-0">
    <img
      src="https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=2000&auto=format&fit=crop"
      alt="background"
      className="h-full w-full object-cover"
    />
  </div>

  {/* dark overlay */}
  <div className="absolute inset-0 bg-black/60" />

      {/* Card */}
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

        <h1 className="text-3xl font-bold text-white">
          {t("registerTitle")}
        </h1>

        <p className="mt-1 text-sm text-gray-400">
          {t("registerSubtitle")}
        </p>

        {/* Google OAuth UI */}
        <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 py-3 text-white hover:bg-white/10 transition">
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        <div className="my-6 flex items-center gap-3 text-gray-500 text-xs">
          <div className="h-px flex-1 bg-white/10" />
          OR
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* First Name */}
          <input
            {...register("first_name")}
            placeholder="First name"
            className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-3 text-white outline-none"
          />
          {errors.first_name && (
            <p className="text-red-500 text-xs">{errors.first_name.message}</p>
          )}

          {/* Last Name */}
          <input
            {...register("last_name")}
            placeholder="Last name"
            className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-3 text-white outline-none"
          />

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              {...register("email")}
              placeholder="Email"
              className="w-full rounded-lg bg-white/5 border border-white/10 pl-10 pr-3 py-3 text-white outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="Password"
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-3 text-white outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password */}
          <input
            type={showPassword ? "text" : "password"}
            {...register("confirmPassword")}
            placeholder="Confirm password"
            className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-3 text-white outline-none"
          />

          {/* Submit */}
          <button
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 py-3 text-white hover:bg-red-700 transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-4 w-4" />
                Loading...
              </>
            ) : (
              "Create Account"
            )}
          </button>

          <p className="text-center text-sm text-gray-400">
            Already have account?{" "}
            <Link href={`/${locale}/login`} className="text-white underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
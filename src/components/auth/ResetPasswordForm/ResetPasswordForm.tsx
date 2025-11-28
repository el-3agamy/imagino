"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Globe2, Eye, EyeOff } from "lucide-react";
import { useRouteLang } from "@/hooks/useLang";

interface ResetPasswordValues {
  password: string;
  confirm: string;
}

export function ResetPasswordForm() {
  const lang = useRouteLang();
  const [passwordValue, setPasswordValue] = useState<string>("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordValues>({
    defaultValues: {
      password: "",
      confirm: "",
    },
  });

  useEffect(() => {
    setPasswordValue(watch("password"));
  }, [watch]);

  async function onSubmit(values: ResetPasswordValues) {
    console.log("Reset password", values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
          Reset Password
        </h1>
        <p className="text-xs text-muted-foreground sm:text-sm">
          Choose a new password for your account
        </p>
      </header>

      <div className="mt-2 space-y-4">
        <div className="space-y-1.5">
          <label
            htmlFor="reset-password"
            className="text-xs font-medium text-foreground"
          >
            New Password
          </label>
          <div className="relative">
            <input
              id="reset-password"
              type={showPassword ? "text" : "password"}
              placeholder="Min 8 characters"
              className="h-11 w-full rounded-lg border border-[#E4E4E7] bg-[#F5F5F7] px-3 pr-10 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
              autoComplete="new-password"
              aria-invalid={!!errors.password || undefined}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute inset-y-0 right-2 flex items-center rounded-full p-1.5 text-muted-foreground hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8b5cf6]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Must be at least 8 characters with 1 uppercase, 1 lowercase, and 1
            number
          </p>
          {errors.password && (
            <p className="text-[11px] font-medium text-red-500" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="reset-confirm-password"
            className="text-xs font-medium text-foreground"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="reset-confirm-password"
              type={showConfirm ? "text" : "password"}
              placeholder="Re-enter your password"
              className="h-11 w-full rounded-lg border border-[#E4E4E7] bg-[#F5F5F7] px-3 pr-10 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
              autoComplete="new-password"
              aria-invalid={!!errors.confirm || undefined}
              {...register("confirm", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === passwordValue || "Passwords do not match",
              })}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((p) => !p)}
              className="absolute inset-y-0 right-2 flex items-center rounded-full p-1.5 text-muted-foreground hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8b5cf6]"
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
          {errors.confirm && (
            <p className="text-[11px] font-medium text-red-500" role="alert">
              {errors.confirm.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-1 cursor-pointer h-11 w-full rounded-full bg-main text-sm font-semibold text-white shadow-[0_6px_18px_rgba(124,58,237,0.45)] transition hover:bg-main-hover disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Updating…" : "Update Password"}
        </button>
      </div>

      <div className="mt-4">
        <Link
          href={`/${lang}/auth/login`}
          className="h-11 w-full rounded-full border border-[#E4E4E7] bg-white text-center text-sm font-semibold text-foreground hover:bg-[#F5F5F7] transition inline-flex items-center justify-center"
        >
          Back to login
        </Link>
      </div>


    </form>
  );
}

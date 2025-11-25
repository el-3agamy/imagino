"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Globe2 } from "lucide-react";
import { AuthInput } from "../Fields/AuthInput";
import { useRouteLang } from "@/hooks/useLang";

interface LoginFormValues {
  identifier: string;
  password: string;
}

export default function LoginForm() {
  const lang = useRouteLang();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    console.log("Login submit", values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <header className="space-y-1 text-center">
        <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
          Welcome Back
        </h1>
        <p className="text-xs text-muted-foreground sm:text-sm">
          Sign in to your account
        </p>
      </header>

      <AuthInput
        label="Phone / Email"
        placeholder="Enter phone or email"
        autoComplete="email"
        required
        error={errors.identifier?.message}
        {...register("identifier", {
          required: "Please enter your email or phone number",
        })}
      />

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="login-password"
            className="text-xs font-medium text-foreground"
          >
            Password
          </label>
        </div>

        <div className="relative">
          <input
            id="login-password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="h-11 w-full rounded-lg border border-[#E4E4E7] bg-[#F5F5F7] px-3 pr-10 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
            autoComplete="current-password"
            aria-invalid={!!errors.password || undefined}
            aria-describedby={
              errors.password ? "login-password-error" : undefined
            }
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
            onClick={() => setShowPassword((prev) => !prev)}
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

        {errors.password && (
          <p
            id="login-password-error"
            className="text-[11px] font-medium text-red-500"
            role="alert"
          >
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="-mt-2 text-right">
        <Link
          href={`/${lang}/auth/forgot-password`}
          className="text-[11px] font-semibold text-primary hover:underline"
        >
          Forget Password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-1 cursor-pointer h-11 w-full rounded-full bg-main text-sm font-semibold text-white shadow-[0_6px_18px_rgba(124,58,237,0.45)] transition hover:bg-main-hover disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Logging in…" : "Login"}
      </button>

      <div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
        <span className="h-px flex-1 bg-[#E4E4E7]" />
        <span className="font-semibold tracking-wide">
          DON&apos;T HAVE AN ACCOUNT?
        </span>
        <span className="h-px flex-1 bg-[#E4E4E7]" />
      </div>

      <Link
        href={`/${lang}/auth/register`}
        className="h-11 w-full rounded-full border border-[#E4E4E7] bg-white text-center text-sm font-semibold text-foreground hover:bg-[#F5F5F7] transition inline-flex items-center justify-center"
      >
        Sign Up
      </Link>

      <div className="mt-2 flex items-center justify-center gap-1 text-xs text-muted-foreground">
        <Globe2 className="h-4 w-4" aria-hidden="true" />
        <button
          type="button"
          className="flex items-center gap-1 rounded-full px-1.5 py-0.5 hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6]"
          aria-label="Change language"
        >
          <span>Language:</span>
          <span className="font-semibold text-foreground">
            {lang.toUpperCase()}
          </span>
        </button>
      </div>
    </form>
  );
}

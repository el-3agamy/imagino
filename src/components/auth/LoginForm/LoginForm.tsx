"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouteLang } from "@/hooks/useLang";

interface LoginFormValues {
  identifier: string;
}

export default function LoginForm() {
  const lang = useRouteLang();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<LoginFormValues>({
    defaultValues: {
      identifier: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    console.log("Login submit", values);
  }

  const emailValue = watch("identifier");
  const isDisabled = isSubmitting || !emailValue;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 text-sm"
    >
      <header className="space-y-1 text-center">
        <h1 className="text-2xl font-semibold text-foreground">
          Log in or sign up
        </h1>
        <p className="text-xs text-muted-foreground">
          Generate 40 images for free every month!
        </p>
      </header>

      <button
        type="button"
        className="flex h-12 w-full items-center cursor-pointer justify-center gap-2 rounded-md border border-[#E4E4E7] bg-[#F4F4F5] hover:bg-main sm:text-lg font-medium font-semibold text-foreground hover:bg-[#E9E9EB] transition"
      >
        <Image
          src="/assets/icons/google.svg"
          alt="Google"
          width={18}
          height={18}
          className="shrink-0"
        />
        <span>Continue with Google</span>
      </button>

      <div className="flex items-center gap-3 text-muted-foreground">
        <span className="h-px flex-1 bg-[#E4E4E7]" />
        <span>or</span>
        <span className="h-px flex-1 bg-[#E4E4E7]" />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="login-email"
          className="text-xs font-medium text-foreground"
        >
          Email
        </label>
        <input
          id="login-email"
          type="email"
          placeholder=""
          className="h-11 w-full rounded-md border border-[#E4E4E7] bg-white px-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
          autoComplete="email"
          aria-invalid={!!errors.identifier || undefined}
          aria-describedby={errors.identifier ? "login-email-error" : undefined}
          {...register("identifier", {
            required: "Please enter your email",
          })}
        />

        {errors.identifier && (
          <p
            id="login-email-error"
            className="text-[11px] font-medium text-red-500"
            role="alert"
          >
            {errors.identifier.message}
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
        disabled={isDisabled}
        className="mt-1 h-11 w-full cursor-pointer rounded-md bg-main sm:text-lg font-semibold text-white transition shadow-sm hover:bg-main-hover disabled:bg-[#E4E4E7] disabled:text-[#A1A1AA] disabled:shadow-none disabled:cursor-not-allowed disabled:hover:bg-[#E4E4E7]"
      >
        {isSubmitting ? "Continuing…" : "Continue"}
      </button>

      <Link
        href={`/${lang}/auth/register`}
        className="h-11 w-full rounded-md border border-[#E4E4E7] bg-white text-center text-sm font-semibold text-foreground hover:bg-[#eee] transition inline-flex items-center justify-center"
      >
        Sign Up
      </Link>

      <p className="mt-2 text-[13px] leading-snug text-center text-muted-foreground">
        By continuing, you acknowledge that you agree to Pebblely&apos;s{" "}
        <Link
          href={`/${lang}/terms-of-service`}
          className="underline hover:text-foreground"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href={`/${lang}/privacy-policy`}
          className="underline hover:text-foreground"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}

"use client";

import { useRouteLang } from "@/hooks/useLang";
import { Globe2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface VerifyEmailFormProps {
  email: string;
}

interface VerifyEmailValues {
  code: string;
}

export function VerifyEmailForResetForm({ email }: VerifyEmailFormProps) {
  const lang = useRouteLang();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyEmailValues>({
    defaultValues: { code: "" },
  });

  async function onSubmit(values: VerifyEmailValues) {
    router.push(`/${lang}/auth/reset-password`);
    console.log("Verify reset code", values.code);
  }

  function handleResend() {
    console.log("Resend OTP");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
          Verify Email
        </h1>
        <p className="text-xs text-muted-foreground sm:text-sm">
          Enter the code sent to your email
        </p>
      </header>

      <div className="mt-2 space-y-4">
        <div className="rounded-2xl bg-[#F5F5F7] px-4 py-5 text-center text-xs text-muted-foreground sm:text-sm">
          <p>We&apos;ve sent a 6-digit code to</p>
          <p className="mt-1 font-semibold text-foreground">
            {email || "email-name@gmail.com"}
          </p>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="reset-verification-code"
            className="text-xs font-medium text-foreground"
          >
            Verification code
          </label>
          <input
            id="reset-verification-code"
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="000000"
            className="h-11 w-full rounded-lg border border-[#E4E4E7] bg-[#F5F5F7] px-3 text-center text-sm tracking-[0.4em] text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
            aria-invalid={!!errors.code || undefined}
            {...register("code", {
              required: "Code is required",
              minLength: { value: 6, message: "Code must be 6 digits" },
              maxLength: { value: 6, message: "Code must be 6 digits" },
            })}
          />
          {errors.code && (
            <p className="text-[11px] font-medium text-red-500" role="alert">
              {errors.code.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 cursor-pointer w-full rounded-full bg-main text-sm font-semibold text-white shadow-[0_6px_18px_rgba(124,58,237,0.45)] transition hover:bg-main-hover disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Verifying…" : "Verify"}
        </button>

        <button
          type="button"
          onClick={handleResend}
          className="mt-1 cursor-pointer text-center text-xs font-semibold text-foreground hover:underline"
        >
          Resend OTP
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

import { Check } from "lucide-react";
import { StepBaseProps } from "./RegisterDetailsStep";

function RegisterEmailStep({
  register,
  errors,
  isSubmitting,
  emailValue,
}: StepBaseProps & { emailValue: string }) {
  return (
    <div className="mt-4 space-y-5">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F5F3FF]">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-main text-white">
            <Check className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground sm:text-sm">
          We&apos;ve sent a 6-digit code to{" "}
          <span className="font-semibold text-foreground">
            {emailValue || "your email"}
          </span>
        </p>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="register-email-otp"
          className="text-xs font-medium text-foreground"
        >
          Enter OTP
        </label>
        <input
          id="register-email-otp"
          type="text"
          inputMode="numeric"
          maxLength={6}
          placeholder="000000"
          className="h-11 w-full rounded-lg border border-[#E4E4E7] bg-[#F5F5F7] px-3 text-center text-sm tracking-[0.4em] text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
          aria-invalid={!!errors.emailOtp || undefined}
          {...register("emailOtp", {
            required: "Code is required",
            minLength: { value: 6, message: "Code must be 6 digits" },
            maxLength: { value: 6, message: "Code must be 6 digits" },
          })}
        />
        {errors.emailOtp && (
          <p className="text-[11px] font-medium text-red-500" role="alert">
            {errors.emailOtp.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-1 cursor-pointer h-11 w-full rounded-full bg-main text-sm font-semibold text-white shadow-[0_6px_18px_rgba(124,58,237,0.45)] transition hover:bg-main-hover disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Verifying…" : "Verify Email"}
      </button>

      <button
        type="button"
        className="mt-1 cursor-pointer text-center text-xs font-semibold text-foreground hover:underline"
      >
        Resend OTP
      </button>
    </div>
  );
}
export default RegisterEmailStep;

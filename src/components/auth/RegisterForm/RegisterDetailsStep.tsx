import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { AuthInput } from '../Fields/AuthInput';
import { RegisterFormValues } from './RegisterForm';

export interface StepBaseProps {
  register: UseFormRegister<RegisterFormValues>;
  errors: FieldErrors<RegisterFormValues>;
  isSubmitting: boolean;
}

function RegisterDetailsStep({
  register,
  errors,
  isSubmitting,
  passwordValue,
}: StepBaseProps & { passwordValue: string }) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  return (
    <div className="mt-4 space-y-4">
      <AuthInput
        label="Email Address"
        placeholder="you@example.com"
        autoComplete="email"
        required
        error={errors.email?.message}
        {...register('email', {
          required: 'Email is required',
        })}
      />

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="register-password"
            className="text-xs font-medium text-foreground dark:text-[color:var(--card-foreground)]"
          >
            Password
          </label>
        </div>

        <div className="relative">
          <input
            id="register-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Min 8 characters"
            className="h-11 w-full rounded-lg border border-[#E4E4E7] dark:border-[color:var(--border)] bg-[#F5F5F7] dark:bg-[color:var(--input)] px-3 pr-10 text-sm text-foreground dark:text-[color:var(--card-foreground)] placeholder:text-muted-foreground/70 dark:placeholder:text-[color:var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
            autoComplete="new-password"
            aria-invalid={!!errors.password || undefined}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute cursor-pointer inset-y-0 right-2 flex items-center rounded-full p-1.5 text-muted-foreground hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8b5cf6] dark:text-[color:var(--muted-foreground)]"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Eye className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>

        <p className="text-[11px] text-muted-foreground dark:text-[color:var(--muted-foreground)]">
          Must include 1 uppercase, 1 lowercase, and 1 number
        </p>

        {errors.password && (
          <p className="text-[11px] font-medium text-red-500" role="alert">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="register-confirm-password"
            className="text-xs font-medium text-foreground dark:text-[color:var(--card-foreground)]"
          >
            Re-enter Password
          </label>
        </div>

        <div className="relative">
          <input
            id="register-confirm-password"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            className="h-11 w-full rounded-lg border border-[#E4E4E7] dark:border-[color:var(--border)] bg-[#F5F5F7] dark:bg-[color:var(--input)] px-3 pr-10 text-sm text-foreground dark:text-[color:var(--card-foreground)] placeholder:text-muted-foreground/70 dark:placeholder:text-[color:var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
            autoComplete="new-password"
            aria-invalid={!!errors.confirmPassword || undefined}
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) => value === passwordValue || 'Passwords do not match',
            })}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute cursor-pointer inset-y-0 right-2 flex items-center rounded-full p-1.5 text-muted-foreground hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8b5cf6] dark:text-[color:var(--muted-foreground)]"
            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Eye className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>

        {errors.confirmPassword && (
          <p className="text-[11px] font-medium text-red-500" role="alert">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 cursor-pointer h-11 w-full rounded-full bg-main text-sm font-semibold text-white shadow-[0_6px_18px_rgba(124,58,237,0.45)] transition hover:bg-main-hover disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? 'Signing up…' : 'Sign Up'}
      </button>
    </div>
  );
}
export default RegisterDetailsStep;

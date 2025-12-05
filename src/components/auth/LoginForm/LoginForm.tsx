'use client';

import { useRouteLang } from '@/hooks/useLang';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import toast, { Toaster } from 'react-hot-toast';

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
      identifier: '',
    },
  });

  const emailValue = watch('identifier');
  const isDisabled = isSubmitting || !emailValue;

  async function submitLogin(values: LoginFormValues) {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/login`,
      values
    );
    return response.data;
  }

  async function onSubmit(values: LoginFormValues) {
    try {
      const data = await submitLogin(values);
      toast.success('Login successful!');
      console.log('Login response:', data);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const message =
        error?.response?.data?.message || error?.message || 'Something went wrong!';
      toast.error(message);
      console.error('Login error:', error);
    }
  }

  return (
    <>
      <Toaster position="top-center" />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 text-sm login-form">
        <header className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold text-foreground dark:text-[color:var(--card-foreground)]">
            Log in or sign up
          </h1>
          <p className="text-xs text-muted-foreground dark:text-[color:var(--muted-foreground)]">
            Generate 40 images for free every month!
          </p>
        </header>

        <button
          type="button"
          className="social-btn flex h-12 w-full items-center cursor-pointer justify-center gap-2 rounded-md
                     border border-[#E4E4E7] dark:border-[color:var(--border)]
                     bg-[#F4F4F5] dark:bg-[color:var(--card)]
                     hover:bg-main sm:text-lg font-medium font-semibold text-foreground dark:text-[color:var(--card-foreground)]
                     hover:bg-[#E9E9EB] transition"
        >
          <Image src="/assets/icons/google.svg" alt="Google" width={18} height={18} className="shrink-0" />
          <span>Continue with Google</span>
        </button>

        <div className="flex items-center gap-3 text-muted-foreground dark:text-[color:var(--muted-foreground)]">
          <span className="h-px flex-1 bg-[#E4E4E7] dark:bg-[color:var(--border)]" />
          <span>or</span>
          <span className="h-px flex-1 bg-[#E4E4E7] dark:bg-[color:var(--border)]" />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="login-email"
            className="text-xs font-medium text-foreground dark:text-[color:var(--card-foreground)]"
          >
            Email
          </label>
          <input
            id="login-email"
            type="email"
            placeholder="user@example.com"
            className="email-input h-11 w-full rounded-md border border-[#E4E4E7] dark:border-[color:var(--border)]
                       bg-white dark:bg-[color:var(--input)] px-3 text-sm text-foreground dark:text-[color:var(--card-foreground)]
                       placeholder:text-muted-foreground/70 dark:placeholder:text-[color:var(--muted-foreground)]
                       focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
            autoComplete="email"
            aria-invalid={!!errors.identifier || undefined}
            aria-describedby={errors.identifier ? 'login-email-error' : undefined}
            {...register('identifier', {
              required: 'Please enter your email',
            })}
          />
          {errors.identifier && (
            <p id="login-email-error" className="text-[11px] font-medium text-red-500" role="alert">
              {errors.identifier.message}
            </p>
          )}
        </div>

        <div className="-mt-2 text-right">
          <Link
            href={`/${lang}/auth/forgot-password`}
            className="text-[11px] font-semibold text-primary hover:underline dark:text-[color:var(--main-color)]"
          >
            Forget Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isDisabled}
          className="submit-btn mt-1 h-11 w-full cursor-pointer rounded-md bg-main sm:text-lg font-semibold text-white transition shadow-sm hover:bg-main-hover
                     disabled:bg-[#E4E4E7] dark:disabled:bg-[color:var(--border)] disabled:text-[#A1A1AA] disabled:shadow-none disabled:cursor-not-allowed disabled:hover:bg-[#E4E4E7]"
        >
          {isSubmitting ? 'Continuing…' : 'Continue'}
        </button>

        <Link
          href={`/${lang}/auth/register`}
          className="signup-link h-11 w-full rounded-md border border-[#E4E4E7] dark:border-[color:var(--border)]
                     bg-white dark:bg-[color:var(--card)] text-center text-sm font-semibold text-foreground dark:text-[color:var(--card-foreground)]
                     hover:bg-[#eee] dark:hover:bg-[color:var(--card)] transition inline-flex items-center justify-center"
        >
          Sign Up
        </Link>

        <p className="mt-2 text-[13px] leading-snug text-center text-muted-foreground dark:text-[color:var(--muted-foreground)]">
          By continuing, you acknowledge that you agree to Pebblely&apos;s{' '}
          <Link
            href={`/${lang}/terms-of-service`}
            className="underline hover:text-foreground dark:hover:text-[color:var(--card-foreground)]"
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href={`/${lang}/privacy-policy`}
            className="underline hover:text-foreground dark:hover:text-[color:var(--card-foreground)]"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </form>
    </>
  );
}

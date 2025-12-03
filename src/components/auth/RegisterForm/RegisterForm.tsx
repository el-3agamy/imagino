'use client';

import { useRouteLang } from '@/hooks/useLang';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import RegisterDetailsStep from './RegisterDetailsStep';
import RegisterEmailStep from './RegisterEmailStep';
import RegisterPhoneStep from './RegisterPhoneStep';

type RegisterStep = 'details' | 'email' | 'phone';

export interface RegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  emailOtp: string;
  countryCode: string;
  phoneNumber: string;
}

export default function RegisterForm() {
  const lang = useRouteLang();

  const [step, setStep] = useState<RegisterStep>('details');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      emailOtp: '',
      countryCode: '+971 [UAE]',
      phoneNumber: '',
    },
  });

  const passwordValue = watch('password');
  const emailValue = watch('email');

  async function onSubmit(values: RegisterFormValues) {
    if (step === 'details') {
      console.log('Register details submit', values);
      setStep('email');
    } else if (step === 'email') {
      console.log('Verify email OTP', values.emailOtp);
      setStep('phone');
    } else {
      console.log('Phone step submit', values.countryCode, values.phoneNumber);
    }
  }

  const progressWidth = step === 'details' ? 'w-1/3' : step === 'email' ? 'w-2/3' : 'w-full';

  const stepLabelClass = (s: RegisterStep) =>
    `flex-1 text-center text-xs font-medium ${step === s ? 'text-main' : 'text-muted-foreground'}`;

  const subtitle =
    step === 'details'
      ? 'Fill in your details to get started'
      : step === 'email'
      ? 'Verify your email address'
      : 'Verify your phone number';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 register-form">
      <header className="space-y-1 text-center">
        <h1 className="text-xl font-semibold text-foreground sm:text-2xl dark:text-[color:var(--card-foreground)]">
          Create Account
        </h1>
        <p className="text-xs text-muted-foreground sm:text-sm dark:text-[color:var(--muted-foreground)]">
          {subtitle}
        </p>
      </header>

      <div className="mt-2">
        <div className="relative h-1 rounded-full progress-track bg-[#E4E4E7] dark:bg-[color:var(--border)]">
          <div
            className={`absolute left-0 top-0 h-1 rounded-full progress-fill bg-main transition-all duration-300 ${progressWidth}`}
          />
        </div>
        <div className="mt-2 flex justify-between">
          <span title="Details" className={stepLabelClass('details')}>
            Details
          </span>
          <span title="Email" className={stepLabelClass('email')}>
            Email
          </span>
          <span title="Phone" className={stepLabelClass('phone')}>
            Phone
          </span>
        </div>
      </div>

      {step === 'details' && (
        <RegisterDetailsStep
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
          passwordValue={passwordValue}
        />
      )}

      {step === 'email' && (
        <RegisterEmailStep
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
          emailValue={emailValue}
        />
      )}

      {step === 'phone' && (
        <RegisterPhoneStep register={register} errors={errors} isSubmitting={isSubmitting} />
      )}

      <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-muted-foreground dark:text-[color:var(--muted-foreground)]">
        <span className="h-px flex-1 bg-[#E4E4E7] dark:bg-[color:var(--border)]" />
        <span className="font-semibold tracking-wide">ALREADY HAVE AN ACCOUNT?</span>
        <span className="h-px flex-1 bg-[#E4E4E7] dark:bg-[color:var(--border)]" />
      </div>

      <Link
        href={`/${lang}/auth/login`}
        className="h-11 w-full rounded-full border border-[#E4E4E7] dark:border-[color:var(--border)] bg-white dark:bg-[color:var(--card)] text-center text-sm font-semibold text-foreground dark:text-[color:var(--card-foreground)] hover:bg-[#F5F5F7] dark:hover:bg-[color:var(--card)] transition inline-flex items-center justify-center"
      >
        Login
      </Link>
    </form>
  );
}

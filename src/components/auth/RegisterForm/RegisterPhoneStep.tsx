import { ChevronDown } from 'lucide-react';
import { AuthInput } from '../Fields/AuthInput';
import { AuthSelect } from '../Fields/AuthSelect';
import { StepBaseProps } from './RegisterDetailsStep';

function RegisterPhoneStep({ register, errors, isSubmitting }: StepBaseProps) {
  return (
    <div className="mt-4 space-y-4">
      <AuthSelect
        label="Country Code"
        containerClassName="space-y-1.5"
        error={errors.countryCode?.message}
        {...register('countryCode', {
          required: 'Country code is required',
        })}
        id="register-country-code"
        className="h-11 w-full appearance-none rounded-lg border border-[#E4E4E7] dark:border-[color:var(--border)] bg-[#F5F5F7] dark:bg-[color:var(--input)] px-3 pr-9 text-sm text-foreground dark:text-[color:var(--card-foreground)] focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
      >
        <option value="+971 [UAE]">+971 [UAE]</option>
        <option value="+966 [KSA]">+966 [KSA]</option>
        <option value="+974 [Qatar]">+974 [Qatar]</option>
      </AuthSelect>

      <div className="pointer-events-none relative -mt-9 flex justify-end pr-3">
        <ChevronDown
          className="h-4 w-4 translate-y-1/2 text-muted-foreground dark:text-[color:var(--muted-foreground)]"
          aria-hidden="true"
        />
      </div>

      <AuthInput
        label="Phone Number"
        placeholder="501234567"
        autoComplete="tel"
        required
        error={errors.phoneNumber?.message}
        {...register('phoneNumber', {
          required: 'Phone number is required',
        })}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 cursor-pointer h-11 w-full rounded-full bg-main text-sm font-semibold text-white shadow-[0_6px_18px_rgba(124,58,237,0.45)] transition hover:bg-main-hover disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? 'Finishing…' : 'Finish Sign Up'}
      </button>
    </div>
  );
}
export default RegisterPhoneStep;

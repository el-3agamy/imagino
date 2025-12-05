'use client';

import { DashboardLayoutShell } from '@/components/dashboard/DashboardLayoutShell/DashboardLayoutShell';
import { useRouteLang } from '@/hooks/useLang';
import { useAuthStore } from '@/store/authStore';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const loading = useAuthStore((s) => s.loading);
  const lang = useRouteLang();
  const router = useRouter();

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return router.replace(`/${lang}/auth/login`);
  }

  return <DashboardLayoutShell>{children}</DashboardLayoutShell>;
}

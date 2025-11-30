import { DashboardLayoutShell } from '@/components/dashboard/DashboardLayoutShell/DashboardLayoutShell';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayoutShell>{children}</DashboardLayoutShell>;
}

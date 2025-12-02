'use client';

import LangDropdown from '@/components/shared/Navbar/LangDropdown';
import { useRouteLang } from '@/hooks/useLang';
import { Bell, Home, LogOut, Menu } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const ThemeDropdown = dynamic(() => import('@/components/shared/Navbar/ThemeDropdown'), {
  ssr: false,
});

interface DashboardNavbarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  onToggleMobileSidebar: () => void;
}

export default function DashboardNavbar({
  collapsed,
  setCollapsed,
  onToggleMobileSidebar,
}: DashboardNavbarProps) {
  const lang = useRouteLang();

  return (
    <header
      className="sticky top-0 z-40 border-b"
      style={{
        background: 'var(--card)',
        color: 'var(--card-foreground)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="flex h-14 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            aria-label="Toggle sidebar"
            className="inline-flex lg:hidden rounded-md p-1.5"
            style={{
              border: '1px solid var(--border)',
              background: 'var(--card)',
              color: 'var(--card-foreground)',
            }}
          >
            <Menu size={18} />
          </button>

          <button
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="hidden lg:inline-flex rounded-md p-1.5"
            style={{
              border: '1px solid var(--border)',
              background: 'var(--card)',
              color: 'var(--card-foreground)',
            }}
          >
            <Menu size={18} />
          </button>

          <Link
            href={`/${lang}`}
            className="flex items-center gap-2 text-sm font-medium hover:underline"
            style={{ color: 'var(--foreground)' }}
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href={`/${lang}/notifications`}
            aria-label="Notifications"
            className="relative flex items-center justify-center"
            style={{ color: 'var(--foreground)' }}
          >
            <Bell size={20} />
            <span
              className="absolute -top-1 -right-2 rounded-full h-4 w-4 flex items-center justify-center text-[10px]"
              style={{
                background: '#ef4444',
                color: '#fff',
                fontWeight: 600,
              }}
            >
              3
            </span>
          </Link>

          <LangDropdown />

          <div className="hidden md:inline-flex">
            <ThemeDropdown mobile={false} />
          </div>

          <div className="md:hidden">
            <ThemeDropdown mobile />
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium"
            style={{
              border: '1px solid var(--border)',
              background: 'var(--card)',
              color: 'var(--card-foreground)',
            }}
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}

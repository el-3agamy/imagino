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
    <header className="sticky top-0 z-40 bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800">
      <div className="flex h-14 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            aria-label="Toggle sidebar"
            className="inline-flex lg:hidden rounded-md cursor-pointer border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-1.5 hover:bg-gray-50 dark:hover:bg-neutral-800"
          >
            <Menu size={18} />
          </button>

          <button
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="hidden lg:inline-flex rounded-md cursor-pointer border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-1.5 hover:bg-gray-50 dark:hover:bg-neutral-800"
          >
            <Menu size={18} />
          </button>

          <Link
            href={`/${lang}`}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-neutral-200 hover:text-[#7C3BED]"
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
          >
            <Bell size={20} className="text-gray-700 dark:text-neutral-200" />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
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
            className="inline-flex cursor-pointer hover:text-[#EF4343] transition-all duration-300 items-center gap-1.5 rounded-md border border-gray-300 dark:border-neutral-700 px-2.5 py-1.5 text-xs font-medium text-gray-700 dark:text-neutral-200 hover:bg-gray-50 dark:hover:bg-neutral-800"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}

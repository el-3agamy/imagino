'use client';

import { LucideProps } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Dispatch, ForwardRefExoticComponent, RefAttributes, SetStateAction } from 'react';

export interface NavLink {
  href: string;
  label: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
}
interface DashboardSidebarProps {
  collapsed?: boolean;
  navItems: NavLink[];
  setCollapsed?: Dispatch<SetStateAction<boolean>>;
  onNavigate?: () => void;
}

export default function DashboardSidebar({
  collapsed = false,
  onNavigate,
  navItems,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleItemClick = (href: string) => {
    router.push(href);
    if (onNavigate) onNavigate();
  };

  return (
    <aside
      className={`h-screen flex flex-col transition-width duration-300 border-r
        ${collapsed ? 'w-20' : 'w-64'}`}
      style={{ minWidth: collapsed ? 80 : 256 }}
    >
      <div
        className={`flex flex-col items-center gap-3 py-6 px-3
          bg-gray-50 dark:bg-slate-900/80 border-b border-gray-200 dark:border-slate-800`}
      >
        <div
          className={`relative rounded-full overflow-hidden ${
            collapsed ? 'w-10 h-10' : 'w-14 h-14'
          } ring-1 ring-gray-200 dark:ring-slate-700`}
        >
          <Image
            src="/assets/dashboard/profile.webp"
            alt="Profile avatar"
            width={56}
            height={56}
            className="object-cover"
          />
        </div>

        {!collapsed && (
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-900 dark:text-slate-100">
              Ahmed Al Mansoori
            </p>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              ahmed.almansoori@example.com
            </p>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1 bg-white dark:bg-slate-900">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname?.startsWith(item.href);

          return (
            <div key={item.href} className="relative">
              <button
                onClick={() => handleItemClick(item.href)}
                title={collapsed ? item.label : undefined}
                className={`
                  cursor-pointer
                  group relative flex items-center w-full gap-3 rounded-md transition-colors duration-150
                  px-3 py-2 text-sm font-medium text-left
                  ${
                    active
                      ? 'bg-main-hover text-white dark:bg-main-hover dark:text-white'
                      : 'text-main hover:bg-main-hover hover:text-white dark:text-main dark:hover:bg-main-hover dark:hover:text-white'
                  }
                  ${collapsed ? 'justify-center px-0' : ''}
                `}
              >
                <span
                  className={`flex items-center justify-center ${collapsed ? 'w-full' : 'w-6'}`}
                >
                  <Icon
                    className={`${active ? 'text-white' : 'text-main dark:text-main'} h-5 w-5`}
                  />
                </span>

                {!collapsed && <span className="truncate">{item.label}</span>}
              </button>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

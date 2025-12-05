import ThemeProvider from '@/components/shared/ThemeProvider/ThemeProvider';
import type { ReactNode } from 'react';
import './globals.css';
import AppInit from '@/components/shared/AppInit/AppInit';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AppInit />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

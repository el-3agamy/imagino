import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/shared/App-sidebar/App-sidebar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IMAGINO - Gallery',
  description: 'Explore Our Gallery!',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />

        <section>{children}</section>
      </SidebarProvider>
    </>
  );
}

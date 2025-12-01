import HistorySection from '@/components/dashboard/HistorySection/HistorySection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IMAGINO - History',
};

export default function page() {
  return <HistorySection />;
}

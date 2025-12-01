'use client';

import dynamic from 'next/dynamic';
import HistoryListSkeleton from '../HistoryList/HistoryListSkeleton';

const HistoryList = dynamic(() => import('../HistoryList/HistoryList').then((mod) => mod.default), {
  ssr: false,
  loading: () => <HistoryListSkeleton />,
});

export default function HistorySection() {
  return <HistoryList />;
}

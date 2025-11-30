import ProfileSection from '@/components/dashboard/ProfileSection/ProfileSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IMAGINO - Profile Page',
};

export default function page() {
  return <ProfileSection />;
}

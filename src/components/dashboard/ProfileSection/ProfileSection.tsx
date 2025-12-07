'use client';

import dynamic from 'next/dynamic';
import ProfileInfoCardSkeleton from '../ProfileInfoCard/ProfileInfoCardSkeleton';
import { PROFILE } from '@/app/[lang]/dashboard/profile/page';

const ProfileInfoCard = dynamic(
  () => import('../ProfileInfoCard/ProfileInfoCard').then((mod) => mod.default),
  {
    loading: () => <ProfileInfoCardSkeleton />,
    ssr: false,
  }
);

export default function ProfileSection({ profile }: { profile: PROFILE }) {
  return <ProfileInfoCard profile={profile} />;
}

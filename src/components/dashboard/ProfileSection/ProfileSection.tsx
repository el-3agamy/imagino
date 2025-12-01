"use client";

import dynamic from "next/dynamic";
import ProfileInfoCardSkeleton from "../ProfileInfoCard/ProfileInfoCardSkeleton";

const ProfileInfoCard = dynamic(
  () => import("../ProfileInfoCard/ProfileInfoCard").then((mod) => mod.default),
  {
    loading: () => <ProfileInfoCardSkeleton />,
    ssr: false,
  }
);

export default function ProfileSection() {
  return <ProfileInfoCard />;
}

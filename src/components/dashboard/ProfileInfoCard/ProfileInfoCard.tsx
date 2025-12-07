'use client';

import { useState } from 'react';
import type { PROFILE } from '@/app/[lang]/dashboard/profile/page';
import ProfileImageSection from './ProfileImageSection';
import ProfileInfoView from './ProfileInfoView';
import ProfileInfoEditForm from './ProfileInfoEditForm';

export default function ProfileInfoCard({ profile }: { profile: PROFILE }) {
  const [currentProfile, setCurrentProfile] = useState<PROFILE>(profile);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  const handleUpdated = (updated: {
    fullName: string;
    phone?: string | null;
    age?: number | null;
    gender?: string | null;
  }) => {
    setCurrentProfile((prev) => ({
      ...prev,
      fullName: updated.fullName,
      phone: updated.phone ?? prev.phone,
      age: updated.age ?? prev.age,
      gender: updated.gender ?? prev.gender,
    }));
    setIsEditing(false);
  };

  const handleProfileImageChange = (url: string | null) => {
    setCurrentProfile((prev) => ({
      ...prev,
      profileImage: { secure_url: url ? url : '' },
    }));
  };

  return (
    <section
      className="rounded-2xl p-5 shadow-sm"
      style={{
        background: 'var(--card)',
        color: 'var(--card-foreground)',
        border: '1px solid var(--border)',
      }}
    >
      <div className="max-w-2xl mx-auto">
        <ProfileImageSection
          profile={currentProfile}
          onProfileImageChange={handleProfileImageChange}
        />

        {isEditing ? (
          <ProfileInfoEditForm
            profile={currentProfile}
            onCancel={handleCancel}
            onUpdated={handleUpdated}
          />
        ) : (
          <ProfileInfoView profile={currentProfile} onEdit={handleEdit} />
        )}
      </div>
    </section>
  );
}

'use client';

import { useProfileStore } from '@/store/profileStore';
import ProfileImageSection from './ProfileImageSection';
import ProfileInfoView from './ProfileInfoView';
import ProfileInfoEditForm from './ProfileInfoEditForm';

export default function ProfileInfoCard() {
  const profile = useProfileStore((state) => state.profile);
  const isEditing = useProfileStore((state) => state.isEditing);
  const startEditing = useProfileStore((state) => state.startEditing);
  const stopEditing = useProfileStore((state) => state.stopEditing);
  const updateBasicInfo = useProfileStore((state) => state.updateBasicInfo);
  const setProfileImage = useProfileStore((state) => state.setProfileImage);

  if (!profile) {
    return null;
  }

  const handleEdit = () => startEditing();
  const handleCancel = () => stopEditing();

  const handleUpdated = (updated: {
    fullName: string;
    phone?: string | null;
    age?: number | null;
    gender?: string | null;
  }) => {
    updateBasicInfo(updated);
    stopEditing();
  };

  const handleProfileImageChange = (url: string | null) => {
    setProfileImage(url);
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
        <ProfileImageSection profile={profile} onProfileImageChange={handleProfileImageChange} />

        {isEditing ? (
          <ProfileInfoEditForm
            profile={profile}
            onCancel={handleCancel}
            onUpdated={handleUpdated}
          />
        ) : (
          <ProfileInfoView profile={profile} onEdit={handleEdit} />
        )}
      </div>
    </section>
  );
}

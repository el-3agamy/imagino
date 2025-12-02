'use client';

import { useState } from 'react';
import { Mail, Phone, User as UserIcon, Shield } from 'lucide-react';

type Profile = {
  fullName: string;
  email: string;
  phone: string;
};

type InfoFieldProps = {
  label: string;
  icon: React.ElementType;
  value: string;
};

function InfoField({ label, icon: Icon, value }: InfoFieldProps) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-medium text-[color:var(--muted-foreground)]">{label}</p>
      <div
        className="flex items-center gap-2 rounded-md px-3 py-2 border"
        style={{
          background: 'color-mix(in srgb, var(--card) 92%, transparent)',
          borderColor: 'var(--border)',
        }}
      >
        <Icon className="h-4 w-4 text-[color:var(--muted-foreground)]" />
        <span className="text-sm" style={{ color: 'var(--card-foreground)' }}>
          {value}
        </span>
      </div>
    </div>
  );
}

type EditableFieldProps = {
  label: string;
  icon: React.ElementType;
  value: string;
  onChange: (val: string) => void;
};

function EditableField({ label, icon: Icon, value, onChange }: EditableFieldProps) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-medium text-[color:var(--muted-foreground)]">{label}</p>
      <div
        className="flex items-center gap-2 rounded-md px-3 py-2 border"
        style={{
          background: 'color-mix(in srgb, var(--card) 96%, transparent)',
          borderColor: 'var(--border)',
        }}
      >
        <Icon className="h-4 w-4 text-[color:var(--muted-foreground)]" />
        <input
          className="w-full bg-transparent text-sm outline-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            color: 'var(--card-foreground)',
          }}
          aria-label={label}
        />
      </div>
    </div>
  );
}

type ProfileInfoViewProps = {
  profile: Profile;
  onEdit: () => void;
};

function ProfileInfoView({ profile, onEdit }: ProfileInfoViewProps) {
  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold" style={{ color: 'var(--card-foreground)' }}>
          Profile Information
        </h2>

        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition"
          style={{
            border: '1px solid var(--border)',
            background: 'color-mix(in srgb, var(--card) 100%, transparent)',
            color: 'var(--card-foreground)',
          }}
          aria-label="Edit profile"
        >
          <Shield className="h-4 w-4" />
          Edit
        </button>
      </div>

      <div className="space-y-4">
        <InfoField label="Full Name" icon={UserIcon} value={profile.fullName} />
        <InfoField label="Email" icon={Mail} value={profile.email} />
        <InfoField label="Phone Number" icon={Phone} value={profile.phone} />

        <div className="pt-2">
          <p className="mb-2 text-xs font-medium text-[color:var(--muted-foreground)]">Security</p>
          <button
            type="button"
            className="rounded-md px-3 py-2 text-xs font-medium transition"
            style={{
              border: '1px solid var(--border)',
              background: 'color-mix(in srgb, var(--card) 100%, transparent)',
              color: 'var(--card-foreground)',
            }}
          >
            Change Password
          </button>
        </div>
      </div>
    </>
  );
}

type ProfileInfoEditFormProps = {
  draft: Profile;
  setDraft: (p: Profile) => void;
  onSave: () => void;
  onCancel: () => void;
  isSaving: boolean;
};

function ProfileInfoEditForm({
  draft,
  setDraft,
  onSave,
  onCancel,
  isSaving,
}: ProfileInfoEditFormProps) {
  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold" style={{ color: 'var(--card-foreground)' }}>
          Edit Profile
        </h2>
      </div>

      <div className="space-y-4">
        <EditableField
          label="Full Name"
          icon={UserIcon}
          value={draft.fullName}
          onChange={(val) => setDraft({ ...draft, fullName: val })}
        />
        <EditableField
          label="Email"
          icon={Mail}
          value={draft.email}
          onChange={(val) => setDraft({ ...draft, email: val })}
        />
        <EditableField
          label="Phone Number"
          icon={Phone}
          value={draft.phone}
          onChange={(val) => setDraft({ ...draft, phone: val })}
        />

        <div className="flex items-center justify-end gap-2 pt-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md px-3 py-1.5 text-xs font-medium transition"
            style={{
              border: '1px solid var(--border)',
              background: 'color-mix(in srgb, var(--card) 100%, transparent)',
              color: 'var(--card-foreground)',
            }}
            disabled={isSaving}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSave}
            className="rounded-md px-3 py-1.5 text-xs font-medium transition"
            style={{
              background: 'var(--main-color)',
              color: 'rgb(0 0 0)',
            }}
            disabled={isSaving}
            aria-busy={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </>
  );
}

export default function ProfileInfoCard() {
  const [profile, setProfile] = useState<Profile>({
    fullName: 'Ahmed Al Mansoori',
    email: 'ahmed.almansoori@example.com',
    phone: '+971 50 123 4567',
  });

  const [draft, setDraft] = useState<Profile>(profile);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = () => {
    setDraft(profile);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setDraft(profile);
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      // simulate async save (replace with real API call)
      await new Promise((r) => setTimeout(r, 600));
      setProfile(draft);
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
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
        {isEditing ? (
          <ProfileInfoEditForm
            draft={draft}
            setDraft={setDraft}
            onSave={handleSave}
            onCancel={handleCancel}
            isSaving={isSaving}
          />
        ) : (
          <ProfileInfoView profile={profile} onEdit={handleEdit} />
        )}
      </div>
    </section>
  );
}

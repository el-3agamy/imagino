"use client";

import { useState } from "react";
import { Mail, Phone, User as UserIcon, Shield } from "lucide-react";

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
      <p className="text-xs font-medium text-[#6B7280]">{label}</p>
      <div className="flex items-center gap-2 rounded-md border border-main bg-[#F9FAFB] px-3 py-2">
        <Icon className="h-4 w-4 text-[#9CA3AF]" />
        <span className="text-sm text-[#111827]">{value}</span>
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

function EditableField({
  label,
  icon: Icon,
  value,
  onChange,
}: EditableFieldProps) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-medium text-[#6B7280]">{label}</p>
      <div className="flex items-center gap-2 rounded-md border border-main bg-[#F9FAFB] px-3 py-2">
        <Icon className="h-4 w-4 text-[#9CA3AF]" />
        <input
          className="w-full border-none bg-transparent text-sm text-[#111827] outline-none placeholder:text-[#9CA3AF]"
          value={value}
          onChange={(e) => onChange(e.target.value)}
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
        <h2 className="text-lg font-semibold text-[#000000]">
          Profile Information
        </h2>

        <button
          type="button"
          onClick={onEdit}
          className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-main bg-white hover:bg-[#eee] transition-all duration-300 px-3 py-1.5 text-xs font-medium text-[#374151] hover:bg-[#F9FAFB]"
        >
          <Shield className="h-3.5 w-3.5" />
          Edit
        </button>
      </div>

      <div className="space-y-4">
        <InfoField label="Full Name" icon={UserIcon} value={profile.fullName} />
        <InfoField label="Email" icon={Mail} value={profile.email} />
        <InfoField label="Phone Number" icon={Phone} value={profile.phone} />

        <div className="pt-2">
          <p className="mb-2 text-xs font-medium text-[#6B7280]">Security</p>
          <button
            type="button"
            className="rounded-md border border-[#D1D5DB] bg-white px-3 py-2 text-xs font-medium text-[#374151] hover:bg-[#F3F4F6]"
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
        <h2 className="text-lg font-semibold text-[#000000]">Edit Profile</h2>
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
            className="rounded-md border border-main bg-white px-3 py-1.5 text-xs cursor-pointer font-medium text-[#374151] hover:bg-[#F9FAFB]"
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            className="rounded-md bg-main px-3 py-1.5 text-xs font-medium text-white hover:bg-main-hover cursor-pointer transition-all duration-200 disabled:opacity-60"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </>
  );
}


export default function ProfileInfoCard() {
  const [profile, setProfile] = useState<Profile>({
    fullName: "Ahmed Al Mansoori",
    email: "ahmed.almansoori@example.com",
    phone: "+971 50 123 4567",
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

      setProfile(draft);
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="rounded-2xl border border-main bg-white p-5 shadow-sm">
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
    </section>
  );
}

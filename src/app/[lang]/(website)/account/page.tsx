import React from "react";
import ProfileCard from "./profileCard";

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-6 md:p-12">
        <div className="flex justify-center">
          <div className="w-full md:max-w-3xl lg:max-w-4xl">
            <ProfileCard />
          </div>
        </div>
      </div>
    </main>
  );
}

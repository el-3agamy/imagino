import React from "react";
import Section from "../shared/Section/Section";
import { Button } from "../ui/button";

export default function MasonryGallaryLayout() {
  return (
    <Section
      className="flex justify-center items-center h-screen w-full flex-col gap-4 py-0"
      style={{
        backgroundImage: "url('/blogImages/auth_bg.webp')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover", 
        backgroundPosition: "center",
      }}
    >
      <p className="text-white text-2xl font-medium">
        Grow your business with AI
      </p>

      <Button className="bg-amber-300 text-black p-3 hover:bg-amber-400">
        Try Prebbly Free
      </Button>
    </Section>
  );
}

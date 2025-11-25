import React from "react";

export default function Section({
  children,
  className,
  bg,
}: {
  children: React.ReactNode;
  className?: string;
  bg?: boolean;
}) {
  return (
    <section className={`py-32 ${className} ${bg ? " bg-section" : ""}`}>
      {children}
    </section>
  );
}

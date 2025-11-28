import React from "react";

export default function Section({
  children,
  className,
  bg,
  // (Saeid) i add style property so we can insert images as  background easily . 
  style,
}: {
  children: React.ReactNode;
  className?: string;
  bg?: boolean;
  style? : object
}) {
  return (
    <section className={`py-32 ${className} ${bg ? " bg-section" : ""}`}
      style={style}
    >
      {children}
    </section>
  );
}

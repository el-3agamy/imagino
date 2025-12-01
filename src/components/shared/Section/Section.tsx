import React from "react";
import { twMerge } from "tailwind-merge";


export default function Section(

  { children,
    className,
    bg,
    style

  }
    :

    {
      children: React.ReactNode;
      className?: string;
      bg?: boolean;
      style?: React.CSSProperties;
    }
) {
  return (
    <section
    // using tailwind-merge so it easy to override on py-32 to be custom use in all project :(Saeid)
      className={twMerge(
        "py-32",
        className,
        bg && "bg-section"
      )}
      style={style}
    >
      {children}
    </section>
  );
}

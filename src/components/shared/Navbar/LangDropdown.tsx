"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function LangDropdown({ mobile = false }: { mobile?: boolean }) {
  const [lang, setLang] = useState("EN");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    const onScroll = () => setOpen(false);
    window.addEventListener("click", close);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("click", close);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const changeLang = (newLang: string) => {
    setLang(newLang);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((p) => !p);
        }}
        className={`flex items-center gap-1 px-2 py-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 ${
          mobile ? "w-full justify-center" : ""
        }`}
      >
        <span>{lang}</span>
        {!mobile && <ChevronDown className="h-4 w-4" />}
      </button>
      {open && (
        <div
          className={`absolute ${
            mobile ? "top-full left-0 right-0" : "right-0 mt-2"
          } bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-md shadow-lg py-1`}
        >
          {["EN", "AR"].map((lng) => (
            <button
              key={lng}
              className="block w-full text-left px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              onClick={() => changeLang(lng)}
            >
              {lng}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.includes("/auth")) return null;

  const year = new Date().getFullYear();

  return (
    <footer className="bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
        <div>
          <Image
            width={50}
            height={50}
            src="/logo.png"
            alt="Pebblely logo"
            className="h-6 w-auto mb-4"
          />
          <select className="bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-md px-2 py-1">
            <option>English</option>
            <option>العربية</option>
          </select>
          <p className="mt-4 text-neutral-500 dark:text-neutral-400 text-xs">
            Pebblely Pte Ltd © {year}
          </p>
        </div>

        <FooterColumn title="Products" items={["Pebblely", "Pebblely API"]} />
        <FooterColumn
          title="Company"
          items={["TikTok", "Instagram", "Twitter", "小红书", "Contact"]}
        />
        <FooterColumn
          title="Resources"
          items={["FAQ", "Blog", "Gallery", "Privacy", "Terms"]}
        />
        <FooterColumn
          title="Product Categories"
          items={[
            "Skincare & beauty",
            "Beverage",
            "Candle",
            "Soap",
            "Furniture",
            "Jewelry",
            "Necklace",
            "Pet products",
            "Watches",
          ]}
        />
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-semibold mb-3 text-neutral-800 dark:text-neutral-200">
        {title}
      </h3>
      <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
        {items.map((item) => (
          <li key={item}>
            <Link
              href="#"
              className="hover:underline hover:text-neutral-800 dark:hover:text-white"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

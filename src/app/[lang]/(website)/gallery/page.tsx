"use client";

import { useEffect, useState } from "react";
import Section from "@/components/shared/Section/Section";
import Image from "next/image";

export default function Gallery() {
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  useEffect(() => {
    async function getGalleryImages() {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setGalleryImages(data);
    }
    getGalleryImages();
  }, []);

  return (
    <>
      <header className="p-16 text-center">
        <h6 className="mt-2 text-4xl font-bold">Find your next winning shot</h6>
        <p className="py-2 text-[20px]">
          Generating product images using AI can be tricky. But it becomes a lot simpler
          using proven descriptions and reference images tested by businesses around the world.
          Click on your favorite image below, and use the template for your product in Pebblely
        </p>
      </header>

      <Section className="px-16">
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
          {galleryImages.map((img, index) => (
            <div key={index} className="mb-4 break-inside-avoid">
              <Image src={img} width={300} height={300} alt={`gallery_image_${index}`} />
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

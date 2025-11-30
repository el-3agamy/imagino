'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Section from '@/components/shared/Section/Section';
import GalleryTempLayer from '@/components/gallery/GalleryTempLayer/GalleryTempLayer';
import Popup from '@/components/gallery/Popup/Popup';

export default function Gallery() {
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    async function getGalleryImages() {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      setGalleryImages(data);
    }
    getGalleryImages();
  }, []);

  return (
    <>
      {/* header */}
      <header className="p-16 text-center">
        <h6 className="mt-2 text-4xl font-bold">Find your next winning shot</h6>
        <p className="py-2 text-[20px]">
          Click on any image below to preview details like Pebblely.
        </p>
      </header>

      {/* GALLERY GRID */}
      <Section className="px-16">
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
          {galleryImages.map((img, index) => (
            <div
              key={index}
              className="mb-4 break-inside-avoid relative"
              onClick={() => setSelectedImage(img)}
            >
              {/* IMAGE */}
              <Image
                src={img}
                width={300}
                height={300}
                alt={`gallery_image_${index}`}
                className="transition duration-200"
              />

              {/* HOVER TEMP LAYER */}
              <GalleryTempLayer>
                <p className="text-white">
                  dolore culpa, recusandae reprehenderit aperiam perferendis optio atque fugit quam
                  quis et voluptatum. Aperiam?
                </p>
              </GalleryTempLayer>
            </div>
          ))}
        </div>
      </Section>

      {selectedImage && <Popup selectedImage={selectedImage} setSelectedImage={setSelectedImage} />}
    </>
  );
}

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
    let mounted = true;
    async function getGalleryImages() {
      try {
        const res = await fetch('/api/gallery');
        if (!res.ok) return;
        const data = await res.json();
        if (mounted) setGalleryImages(data || []);
      } catch (e) {
        console.error('Failed to load gallery images', e);
      }
    }
    getGalleryImages();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      {/* header */}
      <header className="p-8 md:p-12 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Find your next winning shot</h1>
        <p className="mt-2 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
          Click any image to preview details — similar to the Pebblely experience.
        </p>
      </header>

      {/* gallery grid */}
      <Section className="px-4 md:px-8 lg:px-16 pb-16">
        <div className="gallery-columns">
          {galleryImages.map((img, index) => (
            <div
              key={index}
              className="gallery-item"
              tabIndex={0}
              role="button"
              aria-label={`Open image ${index + 1}`}
              onClick={() => setSelectedImage(img)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setSelectedImage(img);
              }}
            >
              <div className="img-wrap" style={{ aspectRatio: '4 / 5' }}>
                <Image
                  src={img}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover w-full h-full block"
                />
              </div>

              <GalleryTempLayer>
              </GalleryTempLayer>
            </div>
          ))}
        </div>
      </Section>

      {selectedImage && <Popup selectedImage={selectedImage} setSelectedImage={setSelectedImage} />}
    </>
  );
}

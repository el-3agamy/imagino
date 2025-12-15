import { Button } from '@/components/ui/button';
import { useRouteLang } from '@/hooks/useLang';
import { GalleryImageListItem } from '@/types/images';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const excludedTags = ['ugly', 'necklace', 'jewelry', 'fingers', 'hands', 'face'];

const FALLBACK_IMAGE = '/assets/gallery/gallery1.jpg';
export default function Popup({
  selectedImage,
  setSelectedImage,
}: {
  selectedImage: GalleryImageListItem;
  setSelectedImage: (val: GalleryImageListItem | null) => void;
}) {
  const router = useRouter();
  const lang = useRouteLang();
  const image = selectedImage.url || selectedImage.thumbnailUrl || FALLBACK_IMAGE

  const handleClick = () => {
    setSelectedImage(null);

    router.push(`/${lang}/all-features?assetId=${selectedImage._id}`)
  }
  return (
    <div
      className="popup-backdrop"
      role="dialog"
      aria-modal="true"
      onClick={() => setSelectedImage(null)}
    >
      <div className="popup-card" onClick={(e) => e.stopPropagation()} role="document">
        <div className="popup-image">
          <Image
            src={image}
            alt="Selected gallery image"
            width={900}
            height={900}
            className="w-full h-auto object-contain rounded-lg"
            priority
          />
        </div>

        <div className="popup-meta">
          <h3 className="text-xl md:text-2xl font-semibold">
            Around a tanned model{"'"}s neck — red casual top, necklace photography
          </h3>

          <p className="text-sm text-muted-foreground">Excluded from image.</p>

          <div className="tags">
            {excludedTags.map((t) => (
              <span key={t} className="tag-pill">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-3">
            <div className="text-sm text-muted-foreground">Reference image</div>
            <div className="mt-2 w-28 h-28 relative rounded-md overflow-hidden border border-[color:var(--border)]">
              <Image src={image} alt="reference" fill className="object-cover" />
            </div>
          </div>

          <div className="mt-4">
            <div className="text-sm font-medium">Dimensions</div>
            <div className="text-sm">1024 ✕ 1024</div>
          </div>

          <div className="mt-3">
            <div className="text-sm font-medium">Generation mode</div>
            <div className="text-sm">GENERATE+</div>
          </div>

          <div className="popup-actions">
            <Button
              className="w-full bg-[color:var(--main-color)] text-black hover:bg-[color:var(--main-hover-color)]"
              onClick={handleClick}

            >
              Use This Template
            </Button>

            <Button variant="ghost" className="w-full mt-3" onClick={() => setSelectedImage(null)}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

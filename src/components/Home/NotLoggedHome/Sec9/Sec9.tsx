import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';
import Link from 'next/link';

export default function Sec9() {
  return (
    <div className="bg-[#fafafa]">
      <div className="font-semibold text-4xl lg:text-5xl leading-none mb-4 text-center">
        100+ templates to get started with
      </div>
      <div className="grid grid-cols-6 gap-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
          <Dialog key={index}>
            <DialogTrigger className="col-span-2 lg:col-span-1 relative group hover:cursor-zoom-in rounded-2xl overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 bg-black/50 text-white flex items-center justify-center">
                Emerging from rippling water, pink background, shallow depth of field
              </div>
              <Image
                width={500}
                height={500}
                src={'/assets/NotLoggedHome/sec9/armchair-green.jpg'}
                alt="img"
              />
            </DialogTrigger>
            <DialogContent className="w-[90vw] max-w-[90vw] p-0 max-h-[90vh] overflow-y-auto sm:max-w-[90vw] sm:w-[90vw]">
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
                <div className="p-10 grid grid-cols-3 gap-5">
                  <div className="col-span-3 md:col-span-2">
                    <Image
                      width={500}
                      height={500}
                      src={'/assets/NotLoggedHome/sec9/armchair-green.jpg'}
                      alt="img"
                    />
                  </div>
                  <div className="col-span-3 md:col-span-1 flex flex-col gap-3 text-left">
                    <div className="text-lg font-semibold">
                      Emerging from rippling water, pink background, shallow depth of field
                    </div>
                    <div className="text-sm">Excluded from image</div>
                    <Badge variant="secondary">ugly</Badge>
                    <div className="text-sm">Reference image</div>
                    <Image
                      src={'/assets/NotLoggedHome/sec9/armchair-green.jpg'}
                      alt="img"
                      width={50}
                      height={50}
                    />
                    <div>
                      <div className="text-sm">Dimensions</div>
                      <div className="text-sm">1024 ✕ 1024</div>
                    </div>
                    <div>
                      <div className="text-sm">Generation mode</div>
                      <div className="text-sm">GENERATE</div>
                    </div>
                    <Link
                      href={``}
                      className="bg-yellow-400 text-black px-4 py-1.5 rounded-md text-center font-semibold hover:bg-yellow-300 transition"
                    >
                      Use this template
                    </Link>
                  </div>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}

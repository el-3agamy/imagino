import Image from 'next/image';
import Link from 'next/link';

export default function Sec5() {
  return (
    <div className="flex flex-col justify-center items-center gap-10 text-center py-20 bg-[#fde047]">
      {/* sec1 */}
      <div className="flex flex-col gap-5 px-5 md:px-20 lg:px-48">
        <div className="text-3xl md:text-5xl font-bold">
          Generate beautiful AI backgrounds for your products
        </div>
        <div className="flex-3xl">
          Just describe the background you want or pick from 40+ themes. Unlike manual editing,
          <br /> Pebblely will create photos with the appropriate reflections and shadows
          automatically.
        </div>
      </div>
      {/* sec2 */}
      <div className="flex flex-col sm:flex-row w-full lg:px-5">
        <div className="w-full h-full sm:rounded-l-xl overflow-hidden">
          <Image
            width={64}
            height={49}
            src={'/assets/NotLoggedHome/sec5/'}
            alt="A collage of AI product photos by Pebblely"
            className="object-contain"
          />
        </div>
        <div className="w-full sm:w-1/2 aspect-square shrink-0 bg-neutral-200 flex flex-wrap relative sm:rounded-r-xl overflow-hidden">
          <div className="opacity-100 absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center hover:opacity-100 transition duration-300">
            <div className="flex flex-col items-center gap-5 w-full lg:w-1/2 sm:max-w-max m-10 px-30 py-6 sm:p-10 rounded-lg text-center bg-white">
              <div className="text-lg font-semibold">Try this out now!</div>
              <div>
                <span className="hidden md:inline">Click below to create a photo.</span>
                Move or resize the product on the left to get different variations.
              </div>
              <Link
                href={``}
                className="bg-[#fde047] text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-300 transition"
              >
                Surprise me!
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* sec3 */}
      <div>Try with products across various industries yourself</div>
      <div className="flex flex-wrap justify-center items-center gap-3 px-5 md:px-10 lg:px-30">
        <Link
          href={``}
          className="bg-[#fccc14] text-black px-6 py-2 rounded-full hover:bg-[#ebbe0c] transition"
        >
          Skincare
        </Link>
        <Link
          href={``}
          className="bg-[#fccc14] text-black px-6 py-2 rounded-full hover:bg-[#ebbe0c] transition"
        >
          Beauty
        </Link>
        <Link
          href={``}
          className="bg-[#fccc14] text-black px-6 py-2 rounded-full hover:bg-[#ebbe0c] transition"
        >
          Soap
        </Link>
        <Link
          href={``}
          className="bg-[#fccc14] text-black px-6 py-2 rounded-full hover:bg-[#ebbe0c] transition"
        >
          Candle
        </Link>
        <Link
          href={``}
          className="bg-[#fccc14] text-black px-6 py-2 rounded-full hover:bg-[#ebbe0c] transition"
        >
          Furniture
        </Link>
        <Link
          href={``}
          className="bg-[#fccc14] text-black px-6 py-2 rounded-full hover:bg-[#ebbe0c] transition"
        >
          Jewelry
        </Link>
        <Link
          href={``}
          className="bg-[#fccc14] text-black px-6 py-2 rounded-full hover:bg-[#ebbe0c] transition"
        >
          Neclace
        </Link>
        <Link
          href={``}
          className="bg-[#fccc14] text-black px-6 py-2 rounded-full hover:bg-[#ebbe0c] transition"
        >
          Pet Products
        </Link>
        <Link
          href={``}
          className="bg-[#fccc14] text-black px-6 py-2 rounded-full hover:bg-[#ebbe0c] transition"
        >
          Watches
        </Link>
        <Link
          href={``}
          className="bg-[#fccc14] text-black px-6 py-2 rounded-full hover:bg-[#ebbe0c] transition"
        >
          Beverage
        </Link>
      </div>
    </div>
  );
}

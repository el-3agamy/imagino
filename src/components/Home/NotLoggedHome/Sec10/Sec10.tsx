import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

export default function Sec10() {
  return (
    <div className="flex flex-col gap-5 pt-20 bg-[#fde047]">
      <div className="text-center font-semibold px-5 text-4xl lg:text-5xl mb-5 leading-none">
        Join 1,000,000+ creatives who are creating with AI
      </div>
      <div className="flex flex-wrap justify-center items-center gap-5 px-5">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
          <Link
            key={index}
            href={``}
            className="flex flex-col gap-10 p-10 rounded-xl hover:shadow-xl w-full sm:w-80 bg-white"
          >
            <div>
              Pebblely has been a game-changer for my jewelry startup. It allows me to create
              stunning model shots without the cost of hiring professionals. I can create images
              with the right look and feel for my brand and then showcase my work beautifully on my
              website and social media.
            </div>
            <hr />
            <div className="flex justify-start items-center gap-5">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold text-sm">Name</div>
                <div className="text-sm text-gray-500">Job</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div
        className="text-center py-40 mt-40 px-4 md:py-72 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://pebblely.b-cdn.net/samples/auth_bg.jpg')",
        }}
      >
        <div className="text-white text-3xl sm:text-4xl lg:text-6xl font-bold pb-8 drop-shadow-xl">
          Grow your business with AI
        </div>
        <Link
          href={``}
          className="bg-yellow-300 text-black px-4 py-4 rounded-md text-center font-semibold hover:bg-yellow-400 transition"
        >
          Try Pebblely free
        </Link>
      </div>
    </div>
  );
}

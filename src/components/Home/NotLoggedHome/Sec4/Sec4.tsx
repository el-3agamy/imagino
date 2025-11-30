import Image from 'next/image';

export default function Sec4() {
  return (
    <div className="flex flex-col justify-center items-center gap-10 text-left md:text-center py-40 px-5 md:px-20 lg:px-48 bg-[#fafafa]">
      <div className="flex flex-col gap-10">
        <div className="text-3xl md:text-5xl font-bold">Remove any background for free</div>
        <div className="text-xl">
          Simply upload your product, and our AI will automatically remove the background for you.
        </div>
        <div className="text-xl">
          Our AI is trained to remove the background for a wide range of products—in seconds.
        </div>
      </div>

      <div className="w-full">
        <Image
          width={500}
          height={500}
          src={'/assets/NotLoggedHome/sec4/background-removal-examples.jpg'}
          alt="Background removal examples"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}

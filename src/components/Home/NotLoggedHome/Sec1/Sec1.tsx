import Link from "next/link";

export default function Sec1() {
  return (
    <div className="flex flex-col justify-center items-center gap-3 pt-20 pb-10 text-center px-5 md:px-20 lg:px-48">
      <div className="flex justify-center gap-3 px-3 py-1 w-fit border rounded-full border-gray-300 hover:bg-gray-100 hover:cursor-pointer transition duration-300 ease-in-out">
        <div className="px-3 rounded-full bg-gray-200">Latest</div>
        Add logo or badge in blunk
      </div>
      <div className="text-xl md:text-3xl lg:text-6xl font-bold">
        Create AI product photos
        <br /> that help you sell more. <br />
        No Photoshop skills required.
      </div>
      <div className="text-lg">
        Remove backgrounds, generate beautiful photos, and edit with AI—all in
        one tool.
      </div>
      <Link
        href={``}
        className="bg-yellow-400 text-black px-4 py-1.5 rounded-md font-semibold hover:bg-yellow-300 transition"
      >
        Get 40 free photos every month
      </Link>
    </div>
  );
}

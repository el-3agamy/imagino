"use client";
import Image from "next/image";
import sec2img from "../../../../public/assets/NotLoggedHome/sec2/sec2.jpg";

export default function Sec2() {
  return (
    <div className="min-h-96">
      <Image
        src={sec2img}
        alt="A collage of AI product photos by Pebblely"
        className="h-96 md:h-auto object-cover object-left w-full"
      />
    </div>
  );
}

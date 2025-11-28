"use client";
import Image from "next/image";
import settingsMobile from "../../../../public/assets/NotLoggedHome/sec6/settings-mobile.jpg";
import settings from "../../../../public/assets/NotLoggedHome/sec6/settings.jpg";
import multipleProductExamplesMobile from "../../../../public/assets/NotLoggedHome/sec6/multiple-product-examples-mobile.jpg";
import multipleProductExamples from "../../../../public/assets/NotLoggedHome/sec6/multiple-product-examples.jpg";
import referenceImageExample from "../../../../public/assets/NotLoggedHome/sec6/reference-image-example.jpg";
import resizeExamples from "../../../../public/assets/NotLoggedHome/sec6/resize-examples.jpg";
import brandColorExample from "../../../../public/assets/NotLoggedHome/sec6/brand-color-example.jpg";
import amazon from "../../../../public/assets/icons/amazon.png";
import andmore from "../../../../public/assets/icons/andmore.png";
import facebook from "../../../../public/assets/icons/facebook.png";
import ebay from "../../../../public/assets/icons/ebay.png";
import esty from "../../../../public/assets/icons/esty.png";
import instagram from "../../../../public/assets/icons/instagram.png";
import lazada from "../../../../public/assets/icons/lazada.png";
import pintrest from "../../../../public/assets/icons/pintrest.png";
import sene from "../../../../public/assets/icons/sene.png";
import shopee from "../../../../public/assets/icons/shopee.png";
import shopefy from "../../../../public/assets/icons/shopefy.png";
import walmart from "../../../../public/assets/icons/walmart.png";

export default function Sec6() {
  return (
    <div className="flex flex-col justify-center items-center gap-5 text-left md:text-center px-5 md:px-5">
      <div className="text-3xl md:text-5xl font-bold text-center">
        Create elaborate images,
        <br /> without being a graphic designer
      </div>
      <div className="text-center">
        It&apos;s like being a Photoshop pro, without actually spending the time
        to learn Photoshop.
      </div>
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-6 gap-6 text-left">
        {/* card */}
        <div className="col-span-6 lg:col-span-2 bg-neutral-50 flex flex-col rounded-3xl space-y-8">
          <div className="px-8 pt-8 lg:px-12 lg:pt-12">
            <div className="font-medium text-2xl md:text-3xl pb-2">
              Set your canvas size
            </div>
            <div className="text-lg leading-tight">
              You can change the dimensions up to 2048✕2048.
            </div>
          </div>
          <Image
            src={settingsMobile}
            alt="settingsMobile"
            className="lg:hidden pl-10"
          />
          <Image
            src={settings}
            alt="settingsMobile"
            className="hidden lg:block pl-10"
          />
        </div>
        {/* card */}
        <div className="col-span-6 lg:col-span-4 bg-neutral-50 flex flex-col space-y-8 lg:space-y-16 p-8 lg:p-12 rounded-3xl">
          <div className="font-medium text-2xl md:text-3xl pb-2">
            <div className="font-medium text-2xl md:text-3xl pb-2">
              Feature multiple products
            </div>
            <div className="text-lg leading-tight">
              You can place multiple products and props on the canvas, and
              Pebblely will generate suitable backgrounds.
            </div>
          </div>
          <Image
            src={multipleProductExamplesMobile}
            alt="settingsMobile"
            className="lg:hidden pl-10"
          />
          <Image
            src={multipleProductExamples}
            alt="settingsMobile"
            className="hidden lg:block"
          />
        </div>
        {/* card */}
        <div className="col-span-6 lg:col-span-3 bg-neutral-50 flex flex-col items-center p-8 lg:p-12 rounded-3xl space-y-8 lg:space-y-16">
          <div className="font-medium text-2xl md:text-3xl pb-2">
            <div className="font-medium text-2xl md:text-3xl pb-2">
              Set your canvas size
            </div>
            <div className="text-lg leading-tight">
              Besides describing what you want with text, you can use a
              reference image to show the AI what you want.
            </div>
          </div>
          <Image src={referenceImageExample} alt="settingsMobile" />
        </div>
        {/* card */}
        <div className="col-span-6 lg:col-span-3 bg-neutral-50 p-8 lg:p-12 rounded-3xl space-y-8 lg:space-y-16">
          <div className="font-medium text-2xl md:text-3xl pb-2">
            <div className="font-medium text-2xl md:text-3xl pb-2">
              Match your brand colors
            </div>
            <div className="text-lg leading-tight">
              You can use your existing images as reference images to generate
              images of similar colors, reinforcing your branding.
            </div>
          </div>
          <Image src={brandColorExample} alt="settingsMobile" />
        </div>
      </div>
      <div className="bg-neutral-50 gap-10 relative z-10 overflow-hidden py-32">
        <div className="max-w-7xl flex flex-col justify-end lg:grid lg:grid-cols-12 w-full gap-16 mx-auto px-4">
          <div className="col-span-4 text-left w-full space-y-4">
            <div className="mt-2">
              <h1 className="font-semibold text-4xl lg:text-5xl leading-none mb-10">
                Extend your images to any size with AI
              </h1>
            </div>
            <div className="text-xl">
              You can turn a single image into multiple marketing assets.
              <br />
              <br />
              Marketplace listing photos <br />
              Social media content <br />
              Website imagery <br />
              Email banners <br />
              Ad creatives <br />
              And more
            </div>
          </div>
          <div className="col-span-8">
            <Image src={resizeExamples} alt="img" className="w-full h-auto" />
          </div>
        </div>
        <div className="w-full px-4 pt-8">
          <p className="text-center text-xl font-light text-neutral-900">
            Suitable for all marketplaces, platforms, and channels
          </p>
          <div className="max-w-xl xl:max-w-7xl flex flex-wrap justify-center items-center pt-4 gap-x-2 gap-y-1 sm:gap-x-8 sm:gap-y-4 mx-auto">
            <div>
              <Image
                src={amazon}
                alt="icon"
                className="scale-75 sm:scale-100"
              />
            </div>
            <div>
              <Image
                src={ebay}
                alt="icon"
                className="scale-75 sm:scale-100"
              />
            </div>
            <div>
              <Image
                src={esty}
                alt="icon"
                className="scale-75 sm:scale-100"
              />
            </div>
            <div>
              <Image
                src={facebook}
                alt="icon"
                className="scale-75 sm:scale-100"
              />
            </div>
            <div>
              <Image
                src={instagram}
                alt="icon"
                className="scale-75 sm:scale-100"
              />
            </div>
            <div>
              <Image
                src={lazada}
                alt="icon"
                className="scale-75 sm:scale-100"
              />
            </div>
            <div>
              <Image
                src={pintrest}
                alt="icon"
                className="scale-75 sm:scale-100"
              />
            </div>
            <div>
              <Image
                src={sene}
                alt="icon"
                className="scale-75 sm:scale-100"
              />
            </div>
            <div>
              <Image
                src={shopee}
                alt="icon"
                className="scale-75 sm:scale-100"
              />
            </div>
            <div>
              <Image
                src={shopefy}
                alt="icon"
                className="scale-75 sm:scale-100"
              />
            </div>
            <div>
              <Image
                src={walmart}
                alt="icon"
                className="scale-75 sm:scale-100"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

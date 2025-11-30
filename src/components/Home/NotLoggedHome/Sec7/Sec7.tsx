import Image from 'next/image';

export default function Sec7() {
  return (
    <div className="flex flex-col justify-center items-center gap-5 text-left md:text-center py-40 px-5 md:px-5 bg-[#fde047]">
      <div className="text-3xl md:text-5xl font-bold text-center">
        Edit generated images with AI
      </div>
      <div className="text-center">
        Pebblely is more than an AI image generator. It is an AI design tool.
      </div>
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-6 gap-6 text-left">
        {/* card */}
        <div className="p-8 col-span-6 lg:col-span-3 bg-neutral-50 flex flex-col rounded-3xl space-y-8">
          <div className="font-medium text-2xl md:text-3xl pb-2">
            <div className="font-medium text-2xl md:text-3xl pb-2">Remove objects in images</div>
            <div className="text-lg leading-tight">
              You can remove objects or change parts of the image by brushing over them and
              re-generating. This lets you fine-tune your images, without generating from scratch
              again.
            </div>
          </div>
          <Image
            width={500}
            height={500}
            src={'/assets/NotLoggedHome/sec7/remove-object.gif'}
            alt="settingsMobile"
            className="w-full rounded-3xl"
          />
        </div>
        {/* card */}
        <div className="p-8 col-span-6 lg:col-span-3 bg-neutral-50 flex flex-col rounded-3xl space-y-8">
          <div className="font-medium text-2xl md:text-3xl pb-2">
            <div className="font-medium text-2xl md:text-3xl pb-2">Move your product</div>
            <div className="text-lg leading-tight">
              You can re-position, resize, and rotate your product in generated images. Every
              generated image has two layers: the product and the background.
            </div>
          </div>
          <Image
            width={500}
            height={500}
            src={'/assets/NotLoggedHome/sec7/move-product.gif'}
            alt="settingsMobile"
            className="w-full rounded-3xl"
          />
        </div>
        {/* card */}
        <div className="col-span-6 lg:col-span-4 bg-neutral-50 flex flex-col items-center p-8 lg:p-12 rounded-3xl space-y-8">
          <div className="font-medium text-2xl md:text-3xl pb-2">
            <div className="font-medium text-2xl md:text-3xl pb-2">Reuse backgrounds</div>
            <div className="text-lg leading-tight">
              Love a background you generated? You can reuse it for different products by replacing
              the product.
            </div>
          </div>
          <Image
            width={500}
            height={500}
            src={'/assets/NotLoggedHome/sec7/reuse-background-examples-mobile.jpg'}
            alt="settingsMobile"
            className="lg:hidden pl-10"
          />
          <Image
            width={500}
            height={500}
            src={'/assets/NotLoggedHome/sec7/reuse-background-examples.jpg'}
            alt="settingsMobile"
            className="hidden lg:block"
          />
        </div>
        {/* card */}
        <div className="col-span-6 lg:col-span-2 bg-neutral-50 p-8 lg:p-12 rounded-3xl space-y-8">
          <div className="font-medium text-2xl md:text-3xl pb-2">
            <div className="font-medium text-2xl md:text-3xl pb-2">Add logo or badge in bulk</div>
            <div className="text-lg leading-tight">
              Decorate your photos with your logo or a badge to help convert more shoppers.
            </div>
          </div>
          <Image
            width={500}
            height={500}
            src={'/assets/NotLoggedHome/sec7/add-logo-examples.jpg'}
            alt="settingsMobile"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

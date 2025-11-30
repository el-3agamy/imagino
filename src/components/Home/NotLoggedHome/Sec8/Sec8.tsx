import Image from 'next/image';

export default function Sec8() {
  return (
    <div className="flex flex-col justify-center items-center px-5">
      <div>
        <div className="font-semibold text-3xl md:text-5xl leading-none mb-4 text-center">
          Generate product photos at scale
        </div>
        <p className="text-sm md:text-xl text-center">
          As your business grows, you need more content than ever. Use AI to help you scale.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-5">
        {/* card */}
        <div className="col-span-2 lg:col-span-1 bg-neutral-50 p-8 lg:p-10 rounded-3xl space-y-8">
          <div className="font-medium text-2xl md:text-3xl pb-2">
            <div className="font-medium text-2xl md:text-3xl pb-2">
              Bulk generation with our app
            </div>
            <div className="text-lg leading-tight">
              Easily generate product photos with similar or varied backgrounds for up to 25
              products.
            </div>
          </div>
          <Image
            width={500}
            height={500}
            src={'/assets/NotLoggedHome/sec8/bulk-generate-examples.jpg'}
            alt="settingsMobile"
            className="w-full"
          />
        </div>
        {/* card */}
        <div className="col-span-2 lg:col-span-1 bg-neutral-50 p-8 lg:p-10 rounded-3xl space-y-8">
          <div className="font-medium text-2xl md:text-3xl pb-2">
            <div className="font-medium text-2xl md:text-3xl pb-2">
              Programmatic generation with our API
            </div>
            <div className="text-lg leading-tight">
              We have generated up to 200,000 images per day and can go even higher if you need.
            </div>
          </div>
          <div className="flex flex-row gap-2 pt-4">
            <a
              href=""
              className="py-2 px-4 bg-white border border-neutral-200 rounded hover:bg-neutral-100"
            >
              See doc
              <span className="sm:hidden">s</span>
              <span className="hidden sm:inline">umentation</span>
            </a>
            <a
              href=""
              className="py-2 px-4 bg-white border border-neutral-200 rounded hover:bg-neutral-100"
            >
              Get free
              <span className="sm:hidden">API</span>
              <span className="hidden sm:inline">credits</span>
            </a>
          </div>
          <div className="bg-neutral-900 text-white max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-7xl h-[400px] overflow-scroll mt-4 rounded-t-xl">
            <pre>
              <code>
                <pre className="text-left text-sm font-mono">
                 
                  {'  '}
                  {'  '}POST /create-background/v2{'\n\n'}
                  {'  '}
                  {'  '}RequestBody:{'\n'}
                  {'  '}
                  {'  '}
                  {'  '}# &quot;images&quot; - A list of strings, which are Base64 representations
                  or URLs of images{'\n'}
                  {'  '}
                  {'  '}
                  {'  '}images: <span className="text-yellow-300">List[str]</span>
                  {'\n'}
                  {'  '}
                  {'  '}
                  {'  '}# &quot;theme&quot; - One of our 40+ themes. Use our free Get Themes
                  endpoint to retrieve the full list.{'\n'}
                  {'  '}
                  {'  '}
                  {'  '}# This is ignored if `description` is supplied{'\n'}
                  {'  '}
                  {'  '}
                  {'  '}theme:{' '}
                  <span className="text-yellow-300">str = &quot;Surprise me&quot;</span>
                  {'\n'}
                  {'  '}
                  {'  '}
                  {'  '}# &quot;description&quot; - Custom description of the created image{'\n'}
                  {'  '}
                  {'  '}
                  {'  '}description: <span className="text-yellow-300">str = &quot;&quot;</span>
                  {'\n'}
                  {'  '}
                  {'  '}
                  {'  '}# &quot;style_color&quot; - Hex string representing a color e.g.
                  &quot;#FFFFFF&quot;{'\n'}
                  {'  '}
                  {'  '}
                  {'  '}style_color: <span className="text-yellow-300">str = None</span>
                  {'\n'}
                  {'  '}
                  {'  '}
                  {'  '}# &quot;style_image&quot; - Base64 representation or URL of image{'\n'}
                  {'  '}
                  {'  '}
                  {'  '}style_image: <span className="text-yellow-300">str = None</span>
                  {'\n'}
                  {'  '}
                  {'  '}
                  {'  '}# &quot;negative&quot; - A list of comma-separated attributes that should be
                  discouraged from the image{'\n'}
                  {'  '}
                  {'  '}
                  {'  '}negative: <span className="text-yellow-300">str = &quot;&quot;</span>
                  {'\n'}
                  {'  '}
                  {'  '}
                  {'  '}# &quot;generate_plus&quot; - Whether to use the Generate+ pipeline, which
                  takes longer (~15s) with better quality{'\n'}
                  {'  '}
                  {'  '}
                  {'  '}generate_plus: <span className="text-yellow-300">bool = False</span>
                  {'\n'}
                  {'  '}
                  {'  '}
                  {'  '}# &quot;transforms&quot; - A List of Dicts that has the following parameters
                  (all optional):{'\n'}
                  {'  '}
                  {'  '}
                  {'  '}# - &quot;scale_x&quot;: float - Scale the product image horizontally{'\n'}
                  {'  '}
                  {'  '}
                  {'  '}# - &quot;scale_y&quot;: float - Scale the product image vertically{'\n'}
                  {'  '}
                  {'  '}
                  {'  '}# - &quot;x&quot;: int - Translate the product image vertically{'\n'}
                  {'  '}
                  {'  '}
                  {'  '}# - &quot;y&quot;: int - Translate the product image vertically{'\n'}
                  {'  '}
                  {'  '}
                  {'  '}# - &quot;angle&quot;: float - Rotate the product clockwise, in degrees
                  {'\n'}
                  {'  '}
                  {'  '}
                  {'  '}# If no &quot;transforms&quot; is provided or is an empty List, the product
                  images default to being centered in the 512 x 512 canvas{'\n'}
                  {'  '}
                  {'  '}
                  {'  '}transforms: <span className="text-yellow-300">List[Dict] = []</span>
                  {'\n'}
                  {'  '}
                  {'  '}
                  {'  '}# &quot;autoresize&quot; - Use this parameter to automatically resize and
                  center your input image to fit the resulting output{'\n'}
                  {'  '}
                  {'  '}
                  {'  '}autoresize: <span className="text-yellow-300">bool = False</span>
                  {'\n'}
                  {'  '}
                  {'  '}
                  {'  '}# &quot;height&quot;, &quot;width&quot; - Height and width of image, up to a
                  maximum of 2048{'\n'}
                  {'  '}
                  {'  '}
                  {'  '}# If only one dimension is provided, the other dimension defaults to the
                  same value and a square image will be generated{'\n'}
                  {'  '}
                  {'  '}
                  {'  '}height: <span className="text-yellow-300">int = 512</span>
                  {'\n'}
                  {'  '}
                  {'  '}
                  {'  '}width: <span className="text-yellow-300">int = 512</span>
                  {'\n'}
                  {'\n'}
                </pre>
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

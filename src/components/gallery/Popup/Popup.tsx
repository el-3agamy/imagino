import Image from 'next/image'
import { Button } from "@/components/ui/button";

// for more clean code (Saeid) :
 const excludedTags = ["ugly", "necklace", "jewelry", "fingers", "hands", "face"];
export default function Popup({selectedImage , setSelectedImage} : {selectedImage : string  , setSelectedImage : (val:string|null)=>void}) {
  return (
    <>
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white flex gap-4 rounded-2xl shadow-2xl p-6 max-w-[1000px] h-full w-full relative"
            onClick={(e) => e.stopPropagation()}
          >

            <Image
              src={selectedImage}
              width={400}
              height={600}
              alt="popup_image"
              className="rounded-xl mx-auto cursor-zoom-in"
            />

            {/* model info and features (Saeid) : */}
            <div className="mt-4 text-black">

              <h3 className="text-2xl font-semibold mb-2">Around a tanned models neck,
                red casual top, necklace photography</h3>
              <p className="text-gray-600 mb-4">
                Excluded from image. <br /> <br />

                {/* new clean version (saeid) */}

                {
                  excludedTags.map((tag, index) => (
                    <span className=" mx-1 p-1 rounded-[5px] bg-gray-200" key={index}>
                      {
                        tag
                      }
                    </span>
                  ))
                }


              </p>
              <div>
                <p> Reference image
                  <Image src={selectedImage} height={100} width={100} alt={`gallery_img_reference`} />
                </p>
              </div> <br />

              <span>
                <h6 className="font-bold">
                  Dimensions :
                </h6>
                1024 ✕ 1024
              </span> <br />

              <div className="my-2">
                <h6 className="font-bold">
                  Generation mode :
                </h6>
                GENERATE+
              </div>
              <br />


              <div className="">
                <Button className="w-full bg-main hover:bg-main-hover text-black">Use This Templete</Button>
              </div>
            </div>

          </div>
        </div>
    </>
  )
}

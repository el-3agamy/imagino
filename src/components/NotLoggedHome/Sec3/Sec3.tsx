import elemanBeauty from "../../../../public/assets/NotLoggedHome/sec3/eleman-beauty.png";
import enzoChehab from "../../../../public/assets/NotLoggedHome/sec3/enzo-chehab.png";
import evaCandles from "../../../../public/assets/NotLoggedHome/sec3/eva-candles.png";
import homesOf from "../../../../public/assets/NotLoggedHome/sec3/homes-of.png";
import theShoeco from "../../../../public/assets/NotLoggedHome/sec3/the-shoeco.png";

export default function Sec3() {
  return (
    <div className="flex flex-col justify-center items-center gap-5 text-center px-5 md:px-20 lg:px-48">
      <div className="text-lg">
        More than <span className="font-bold">25,000,000</span> images generated
        by creative companies globally
      </div>
      <div className="flex flex-wrap justify-between items-center gap-5 w-full">
        <a href="" className="m-6 md:m-0">
          <img
            src={elemanBeauty.src}
            alt="brand img"
            className="h-10 sm:h-14"
          />
        </a>
        <a href="" className="m-6 md:m-0">
          <img src={enzoChehab.src} alt="brand img" className="h-10 sm:h-14" />
        </a>
        <a href="" className="m-6 md:m-0">
          <img src={evaCandles.src} alt="brand img" className="h-10 sm:h-14" />
        </a>
        <a href="" className="m-6 md:m-0">
          <img src={homesOf.src} alt="brand img" className="h-10 sm:h-14" />
        </a>
        <a href="" className="m-6 md:m-0">
          <img src={theShoeco.src} alt="brand img" className="h-10 sm:h-14" />
        </a>
      </div>
    </div>
  );
}

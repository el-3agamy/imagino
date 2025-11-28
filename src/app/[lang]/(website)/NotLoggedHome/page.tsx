import Sec1 from "@/components/NotLoggedHome/Sec1/Sec1";
import Sec10 from "@/components/NotLoggedHome/Sec10/Sec10";
import Sec2 from "@/components/NotLoggedHome/Sec2/Sec2";
import Sec3 from "@/components/NotLoggedHome/Sec3/Sec3";
import Sec4 from "@/components/NotLoggedHome/Sec4/Sec4";
import Sec5 from "@/components/NotLoggedHome/Sec5/Sec5";
import Sec6 from "@/components/NotLoggedHome/Sec6/Sec6";
import Sec7 from "@/components/NotLoggedHome/Sec7/Sec7";
import Sec8 from "@/components/NotLoggedHome/Sec8/Sec8";
import Sec9 from "@/components/NotLoggedHome/Sec9/Sec9";

export default function NotLoggedHome() {
  return (
    <div className="flex flex-col gap-32">
      <div>
        <Sec1 />
        <Sec2 />
      </div>
      <Sec3 />
      <div>
        <Sec4 />
        <Sec5 />
      </div>
      <Sec6 />
      <Sec7 />
      <Sec8 />
      <Sec9 />
      <Sec10 />
    </div>
  );
}

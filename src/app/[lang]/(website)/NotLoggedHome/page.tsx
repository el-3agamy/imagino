import Sec1 from "@/components/NotLoggedHome/Sec1/Sec1";
import Sec2 from "@/components/NotLoggedHome/Sec2/Sec2";
import Sec3 from "@/components/NotLoggedHome/Sec3/Sec3";
import Sec4 from "@/components/NotLoggedHome/Sec4/Sec4";
import Sec5 from "@/components/NotLoggedHome/Sec5/Sec5";

export default function NotLoggedHome() {
  return (
    <div className="flex flex-col gap-32">
      <Sec1 />
      <Sec2 />
      <Sec3 />
      <Sec4 />
      <Sec5 />
    </div>
  );
}

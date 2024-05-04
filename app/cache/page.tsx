import Image from "next/image";
import dynamic from "next/dynamic";
import MyImage from "./MyImg";


// const MyImage = dynamic(() => import("./MyImg"), {
//   ssr: false,
// });

export default function Page() {
  return (
    <div>
      <h1>Hello Who are you?</h1>
      {/* <img src="/images/lovecopy.png" />
      <Image src={"/images/love.png"} fill={true} alt="" objectFit="cover" /> */}
      <MyImage />
    </div>
  );
}

import delay from "@/app/utils/delay";
import CarsList from "./CarsList";
import HomeStaticComponent from "../HomeStaticComponent";
import LatestNews from "./LatestNews";
import DetailInfo from "./DetailInfo";
import { Suspense } from "react";
import Link from "next/link";

export default async function HomePage() {
  const myDetailId = await delay(1000, "MY-DETAIL-ID");
  return (
    <div>
      <h1 className="font-bold">Home Component</h1>
      <div>Home Page Loaded</div>
      {/* <HomeStaticComponent />
      <LatestNews />
      <CarsList /> */}
      {/* <Suspense fallback={<div>...Detail info loading...</div>}>
        <DetailInfo id={myDetailId} />
      </Suspense> */}
      <div>
        Go To Scholar <Link href="/scholar" className="underline">Scholar Details</Link>
      </div>
    </div>
  );
}

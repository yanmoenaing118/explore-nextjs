"use client";

import Image from "next/image";
import { useState } from "react";

export default function MyImage() {
  const [] = useState(0);
  return (
    <div className="flex">
      <div className="w-[300px] h-[300px]">
        {/* <Image
          src={
            "https://croucher-public.s3.ap-southeast-1.amazonaws.com/pub/publications/key_images/1609/original/Screenshot_2024-02-09_at_8.52.15_AM%281%29.png"
          }
          fill={true}
          objectFit="contain"
          alt="Test"

        />
      </div>{" "}
      <img
        src="https://croucher-public.s3.ap-southeast-1.amazonaws.com/pub/publications/key_images/1609/original/Screenshot_2024-02-09_at_8.52.15_AM%281%29.png"
        alt=""
        width={300}
      /> */}
      <Image src="/images/love.png" width={300} height={200} alt="" />
      </div>
    </div>
  );
}

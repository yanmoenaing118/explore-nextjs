"use client";

import { useEffect } from "react";

export default function HomePage({ headers }: any) {
  useEffect(() => {
    console.log(headers)
  }, [headers])
  return (
    <div>
    
    </div>
  );
}

import { cookies, headers } from "next/headers";
import HomePage from "./components/home/HomePage";
import delay from "./utils/delay";
import { useState } from "react";

export default function Page() {


  cookies();
  return (
    <div>
      <HomePage headers={headers()} />

    </div>
  );
}

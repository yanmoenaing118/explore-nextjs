import { cookies, headers } from "next/headers";
import HomePage from "./components/home/HomePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hello",
  description: "Hello",
};


export default function Page() {


  return (
    <div>
      {/* <HomePage headers={headers()} /> */}

    </div>
  );
}

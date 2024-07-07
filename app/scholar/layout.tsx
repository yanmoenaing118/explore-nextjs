import Link from "next/link";
import { getPosts } from "../utils/getPosts";
import { IoArrowForward, IoHandRight } from "react-icons/io5";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

// export async function generateMetadata() {
//   const posts = await getPosts("/scholar/layout");
//   return {
//     title: posts[0].title,
//   };
// }

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

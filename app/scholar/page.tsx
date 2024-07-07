import { Suspense } from "react";
import delay from "../utils/delay";
import DetailInfo from "../components/home/DetailInfo";
import HomeStaticComponent from "../components/HomeStaticComponent";
import { cookies } from "next/headers";
import { getPosts } from "../utils/getPosts";
import Link from "next/link";

// export async function generateMetadata() {
//   const posts = await getPosts();
//   return {
//     title: posts[0].title,
//   };
// }

export default async function ScholarPage() {
  const allPosts = await getPosts("/scholar/page");

  return (
    <div>
      {allPosts.map((post: any) => (
        <div key={post.id}>
          <Link href={`/scholar/${post.id}`}>{post.title}</Link>
        </div>
      ))}
    </div>
  );
}

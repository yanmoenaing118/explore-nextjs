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
      <h1>Scholar Page</h1>
      <HomeStaticComponent />
      <div>
        <pre>{JSON.stringify(allPosts)}</pre>
      </div>
      <DetailInfo  id="abc"/>
      <div>
        <ul>
          <li>
            <Link href="/scholar/abc">Abc scholar</Link>
            <Link href="/scholar/def">Def scholar</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

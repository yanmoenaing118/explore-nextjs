import { cookies } from "next/headers";
import Posts from "./Posts";



async function getData(p: string) {
  const res = await fetch("http://localhost:8080/api/posts", {
    cache: "no-store"
  });
  // const res1 = await fetch("http://localhost:8080/api/posts");
  // const res2 = await fetch("http://localhost:8080/api/posts");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

type PageProps = {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function Page({ params }: PageProps) {
  const data = await getData(params.slug);
  return (
    <main>
      <Posts posts={data} />
    </main>
  );
}

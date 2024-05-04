import { cookies } from "next/headers";

async function getData(p: string) {
    cookies();
  const res = await fetch("http://localhost:3001/posts", { next: { revalidate: 30}});
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
  }

export default async function Page({ params }: PageProps) {
  const data = await getData(params.slug);
  return <main>{JSON.stringify(data)}</main>;
}


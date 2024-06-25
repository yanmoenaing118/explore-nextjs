import { getPosts } from "@/app/utils/getPosts";

export default async function page() {
  const post = await getPosts('/scholar/[slug]/page');
  return (
    <div>
      scholar slug page
      <div>{JSON.stringify(post)};</div>
    </div>
  );
}

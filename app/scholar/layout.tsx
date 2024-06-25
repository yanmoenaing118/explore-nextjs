
import { getPosts } from "../utils/getPosts";

export async function generateMetadata() {
  const posts = await getPosts("/scholar/layout");
  return {
    title: posts[0].title,
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>scholar navbar</div>
      {children}
    </div>
  );
}

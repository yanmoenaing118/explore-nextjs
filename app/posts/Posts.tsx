import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export default function Posts({ posts }: any) {
  return (
    <div className="max-w-3xl mx-auto ">
      <div className="flex gap-2 items-center justify-end">
        <Link
          href={"/posts/new"}
          className="flex gap-2 items-center px-3 py-2 shadow-md"
        >
          New
          <FaPlus size={"18"} color="gray" />
        </Link>
      </div>
      {posts.map((post: any) => (
        <div key={post.id} className="mb-3 p-3 shadow-sm">
          <Link href={`/posts/${post.id}`}>
            <h4 className="text-lg font-extrabold">{post.title}</h4>
          </Link>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

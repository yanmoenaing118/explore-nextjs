import Link from "next/link";

export default function Header() {
  return (
    <header className="shadow-md py-3 mb-5">
      <div className="max-w-3xl mx-auto flex justify-between">
        <div>
          <Link href={"/"}>Home</Link>
        </div>

        <div>
          <Link href={"/posts"}>Posts</Link>
        </div>
      </div>
    </header>
  );
}

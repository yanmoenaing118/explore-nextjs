import getMyCookie from "@/lib/getMyCookie";
import SignIn from "../components/cookies/auth/signin";
import Link from "next/link";

export default async function page() {
  const pid = await getMyCookie();

  return (
    <div>
      <h1>Learning Cookies in depth</h1>
      <h1>
        MY PID is <Link href={`/${pid}`}>{pid || "Fuckkkkk"}</Link>
      </h1>
      {/* <SignIn /> */}
    </div>
  );
}

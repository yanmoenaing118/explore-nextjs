import getMyCookie from "@/lib/getMyCookie";
import SignIn from "../components/cookies/auth/signin";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function page({searchParams}: {
  searchParams: { [key: string]: string };
}) {
  const pid = await getMyCookie();

  const searchQuery = new URLSearchParams(searchParams).toString();

  // redirect(`/cookiess?${searchQuery}`);

  return (
    <div>
      <h1>Learning Cookies in depth</h1>
      <h1>MY PID is </h1>
      <div>
        {pid.map((key) => {
          return (
            <div key={key.name}>
              {key.name} : {key.value}
            </div>
          );
        })}
      </div>
      <SignIn />
    </div>
  );
}

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function getMyCookie() {
  const pid = cookies().getAll();

  const headersList = headers();
  const url = headersList.get("my-pathname");

  if (!pid) {
    // redirect("/cookiess");
  }

  return pid;
}

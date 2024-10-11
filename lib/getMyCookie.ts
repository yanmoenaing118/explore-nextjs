import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function getMyCookie() {
  const pid = cookies().get("pid")?.value;

  const headersList = headers();
  const url = headersList.get("my-pathname");

  // if (!pid) {
  //   redirect(url || "");
  // }

  return pid;
}

import { cookies } from "next/headers";
import { title } from "process";

type PageProps = {
  params: {
    ppid: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata(data: any) {
  const pid = cookies().get("pid")?.value;
  console.log("---params", data);
  console.log("---searchParams", data);
  return {
    title: pid,
  };
}

export default function layout({ children }: { children: React.ReactNode }) {
  const authCookies = cookies().get("auth")?.value;
  const allCookies = cookies().getAll();
  return (
    <div>
      <div>layout {JSON.stringify(allCookies)}</div>
      {children}
    </div>
  );
}

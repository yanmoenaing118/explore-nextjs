import "./globals.css";

import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import Link from "next/link";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className={"p-6 shadow-md mb-6 flex justify-around"}>
          <Link href="/">Home</Link>
          <Link href="/editor">Editor</Link>
          <Link href="/scholar">Scholar</Link>
        </nav>

        <main className="max-w-[1220px] mx-auto">{children}</main>
      </body>
    </html>
  );
}

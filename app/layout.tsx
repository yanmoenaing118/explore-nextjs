import "./globals.css";

import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import Link from "next/link";
import ReactQueryProvider from "@/feature/react-query-provider/react-query-provider";

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
        <ReactQueryProvider>
          <nav className={"p-6 shadow-md mb-6 flex justify-around"}>
            <Link href="/">Home</Link>
            <Link href="/editor">Editor</Link>
            <Link href="/scholar">Scholar</Link>
          </nav>

          <main className="max-w-lg mx-auto">{children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

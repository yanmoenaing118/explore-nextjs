import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const headears = request.headers;
  const requestCookies = request.cookies.getAll();

  console.log("----requestCookies", requestCookies);

  request.headers.set("my-pathname", request.nextUrl.pathname);

  const res = NextResponse.next();
  res.cookies.set("pid", "fuck");
  console.log("running-middle-ware", res.cookies.get("pid"));
  return res;
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|assets|fav|sitemap.xml|robots.txt).*)",
  ],
};

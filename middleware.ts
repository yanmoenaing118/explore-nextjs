import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers();
  

}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|assets|fav|sitemap.xml|robots.txt).*)",
  ],
};

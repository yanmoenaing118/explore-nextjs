import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // console.log("nextUrl", request.nextUrl);
  // console.log("url", request.url);
  // console.log("cookies", request.cookies.getAll());
  // console.log("cookies", cookies().getAll());
  // console.log(request.headers);
  // console.log(headers());
  // console.log(request.headers.get("cookie"));
  // console.log(request.cookies.get("auth"), cookies().get("auth"));

  // cookies().set("from-middleware", "my middare ware value");

  // return NextResponse.redirect(new URL("/home", request.url));

  // console.log("nextUrl.search", request.nextUrl.search);
  // console.log("nextUrl.searchParams", request.nextUrl.searchParams.get("pid"));

  // const response = NextResponse.next();
  // // response.headers.set("x-test", "x-test-value");

  // if (request.nextUrl.pathname.startsWith("/edit")) {
  //   return NextResponse.rewrite(new URL("/editor", request.url));
  // }

  // if (request.nextUrl.pathname.startsWith("/dashboard")) {
  //   console.log("das");
  //   return NextResponse.redirect(new URL("/scholar/1", request.url));
  // }

  // console.log("middleware");
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        {
          type: "header",
          key: "x-test",
        },
      ],
    },
  ],
};

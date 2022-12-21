import { NextRequest, NextResponse } from "next/server";

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: ["/notes/:path*", "/note-editor/:path*"],
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get("next-auth.session-token");

  // Call our authentication function to check the request
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if the request is for admin routes (except login)
  if (request.nextUrl.pathname.startsWith("/admin") && !request.nextUrl.pathname.startsWith("/admin/login")) {
    // Check for admin token in cookies or headers
    const adminToken =
      request.cookies.get("adminToken")?.value || request.headers.get("authorization")?.replace("Bearer ", "")

    // In a real app, you would validate the JWT token here
    // For demo purposes, we'll check localStorage on the client side
    if (!adminToken) {
      // Redirect to admin login if no token
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}

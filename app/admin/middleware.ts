import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Allow access to login page & API
  if (pathname.startsWith("/admin/login") || pathname.startsWith("/api")) {
    return NextResponse.next()
  }

  // Check cookie
  const token = req.cookies.get("adminToken")?.value

  if (!token) {
    // No token → redirect to login
    return NextResponse.redirect(new URL("/admin/login", req.url))
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!)
    // Token valid → continue
    return NextResponse.next()
  } catch {
    // Invalid token → force login
    return NextResponse.redirect(new URL("/admin/login", req.url))
  }
}

export const config = {
  matcher: ["/admin/:path*"], // Protect all /admin routes
}

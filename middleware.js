import { NextResponse } from "next/server";

export default function middleware(req) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("token");
  const match = pathname.match(/^\/board\/([^/]+)$/);

  if (match && !token) {
    return NextResponse.rewrite(new URL("/login", req.url));
  }

  if (pathname === "/login" && token) {
    return NextResponse.rewrite(new URL("/", req.url));
  }

  return NextResponse.next();
}

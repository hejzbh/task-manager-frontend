import { NextRequest, NextResponse } from "next/server";
import ROUTES from "@/constants/routes";

export default async function middleware(req: NextRequest) {
  // 1) GET pathname
  const { pathname } = req.nextUrl;

  // 2) Check is it protected route
  const isProtectedRoute = pathname.startsWith(ROUTES.DASHBOARD);

  // 3) Get user session
  const session = null;

  // 4) If route is protected but there's no session
  if (isProtectedRoute && !session) {
    // Redirect user to the login
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // 5) Check is auth route
  const isAuthRoute = pathname.startsWith(ROUTES.AUTH);

  // 6) If User trying to access /auth route even he's logged in
  if (isAuthRoute && session) {
    // Redirect user to the dashboard
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, req.url));
  }

  // If everything is okay, proceed user to the page
  return NextResponse.next();
}

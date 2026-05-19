import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isLoginPage = req.nextUrl.pathname === "/login";
  const isRegisterPage = req.nextUrl.pathname === "/register";
  const isManagePage = req.nextUrl.pathname.startsWith("/manage");

  if (isLoginPage) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
    return null;
  }

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isManagePage) {
    const role = req.auth?.user?.role;
    if (role !== "admin" && role !== "manager") {
      // Only admins and managers can access /manage
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
    return null;
  }

  return null;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "property(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  const { userId, sessionId } = await auth();
  const isAdmin = userId === process.env.ADMIN_USERID;

  if (!sessionId) {
    if (!isPublicRoute(request)) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  if (isAdminRoute(request) && !isAdmin) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/(api|trpc)(.*)"],
};
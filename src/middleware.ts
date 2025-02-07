import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
const isPublicRoute = createRouteMatcher(["/", "property(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
export default clerkMiddleware(async (auth, request) => {
  const isAdmin = (await auth()).userId === process.env.ADMIN_USERID;

  if (isAdminRoute(request) && !isAdmin) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!isPublicRoute(request)) await auth.protect();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    //

    "/(api|trpc)(.*)",
  ],
};

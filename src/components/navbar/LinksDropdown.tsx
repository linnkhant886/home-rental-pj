import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuAlignLeft } from "react-icons/lu";
import Link from "next/link";
import { Button } from "../ui/button";
import SignOutLink from "./SignOutLink";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import Usericon from "./Usericon";
import { auth } from "@clerk/nextjs/server";

type NavLink = {
  href: string;
  label: string;
};

export const links: NavLink[] = [
  { href: "/", label: "home" },
  { href: "/favorites ", label: "favorites" },
  { href: "/bookings ", label: "bookings" },
  { href: "/reviews ", label: "reviews" },
  { href: "/reservations ", label: "reservations" },
  { href: "/rentals/create ", label: "create rental" },
  { href: "/admin ", label: "admin" },
  { href: "/rentals", label: "my rentals" },
  { href: "/profile ", label: "profile" },
];

export default async function LinksDropdown() {
  const { userId } =await auth();
  const isAdmin = userId === process.env.ADMIN_USERID;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className=" flex gap-2 max-w-[100px]">
          <LuAlignLeft className="h-6 w-6" />
          <Usericon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="start" sideOffset={10}>
        <SignedOut>
          <DropdownMenuItem>
            <SignInButton mode="modal">
              <button> Login</button>
            </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignUpButton mode="modal">
              <button>Register </button>
            </SignUpButton>
          </DropdownMenuItem>
        </SignedOut>
        <SignedIn>
          {links.map((link) => {
            if (!isAdmin && link.label === "admin") return null;
            return (
              <DropdownMenuItem key={link.href}>
                <Link href={link.href} className=" capitalize w-full ">
                  {link.label}
                </Link>
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutLink />
          </DropdownMenuItem>
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

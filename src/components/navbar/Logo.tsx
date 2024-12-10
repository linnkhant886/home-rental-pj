import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

export default function Logo() {
  return (
    <Button size="icon">
      <Link href="/">
        <Image
          src="/logo.svg"
          width={24}
          height={24}
          alt="Logo"
          className="h-10 w-10 bg-white"
        />
      </Link>
    </Button>
  );
}

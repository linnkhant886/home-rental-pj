import Link from "next/link";
import { Button } from "../ui/button";

export default function Emptysearch({
  heading = "No Property Found",
  message = "Try changing or removing some of your filters.",
  btnText = "Reset Filters",
}: {
  heading?: string;
  message?: string;
  btnText?: string;
}) {
  return (
    <div className=" space-y-2">
      <h1 className=" text-2xl font-semibold">{heading}</h1>
      <p className=" text-muted-foreground">{message}</p>
      <Button asChild>
        <Link href="/">{btnText}</Link>
      </Button>
    </div>
  );
}

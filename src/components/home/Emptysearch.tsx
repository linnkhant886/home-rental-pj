import Link from "next/link";
import { Button } from "../ui/button";

export default function Emptysearch() {
  return (
    <div className=" space-y-2">
      <h1 className=" text-2xl font-semibold">No Property Found</h1>
      <p className=" text-muted-foreground">Try changing or removing some of your filters.</p>
      <Button asChild>
        <Link href="/">Reset Filters</Link>
      </Button>
    </div>
  );
}

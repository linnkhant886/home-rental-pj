"use client";

import { useState } from "react";

export default function DescriptionProperty({
  description,
}: {
  description: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const words = description.split(" ");
  const islongDesc = words.length > 100;

  const toggleShowmore = () => {
    setIsOpen(!isOpen);
  };

  const displayDescription =
    islongDesc && !isOpen ? words.slice(0, 100).join(" ") + "..." : description;

  return (
    <div>
      <h1 className=" font-bold text-xl my-2">Description</h1>
      <p className=" text-muted-foreground leading-loose ">{displayDescription}</p>
      {islongDesc && (
        <button
          onClick={toggleShowmore}
          className=" text-primary hover:border-b-2 border-primary"
        >
          {isOpen ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
}

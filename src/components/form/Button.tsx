"use client";

import { useFormStatus } from "react-dom";
import { Heart, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { SignInButton } from "@clerk/nextjs";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoReload } from "react-icons/io5";

type SubmitButtonProp = {
  className?: string;
  text: string;
  size?: "default" | "sm" | "lg" | "icon";
};

export function SubmitButton({ className, text, size }: SubmitButtonProp) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size={size ? size : "lg"}
      className={`capitalize ${className}`}
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="w-6 h-6  animate-spin" /> Please Wait....
        </>
      ) : (
        text
      )}
    </Button>
  );
}

export const CardSignInButton = () => {
  return (
    <SignInButton mode="modal">
      <button
        className="absolute right-3 top-3 rounded-full bg-white/90 p-1.5 backdrop-blur-sm transition hover:scale-110 active:scale-95"
        aria-label="Add to favorites"
      >
        <Heart className="h-5 w-5 stroke-[1.5]" />
      </button>
    </SignInButton>
  );
};

export const CardSubmitteButton = ({
  isFavourite,
}: {
  isFavourite: boolean;
}) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size={"icon"}
      className="absolute right-3 top-3 rounded-full bg-white/90 text-black hover:bg-white p-1 backdrop-blur-sm transition hover:scale-110 active:scale-95"
      aria-label="Add to favorites"
      disabled={pending}
    >
      {pending ? (
        <>
          <IoReload className=' animate-spin' /> 
        </>
      ) : isFavourite ? (
        <FaHeart  className="text-red-500 "/>
      ) : (
        <FaRegHeart />
      )}
    </Button>
  );
};

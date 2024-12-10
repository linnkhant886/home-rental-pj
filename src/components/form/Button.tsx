"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

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

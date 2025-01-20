'use client';

import { SignInButton, useAuth } from "@clerk/nextjs";
import { SubmitButton } from "../form/Button";

export default function ConfirmBooking() {
  const { userId } = useAuth();

  if (!userId) return (
    <SignInButton mode="modal">
      <SubmitButton  text="Sign in to confirm booking" className="w-full"/>
    </SignInButton>
  )
  return (
    <form className="w-full">
      <SubmitButton text="Confirm Booking" className="w-full"/>
    </form>
  );
}

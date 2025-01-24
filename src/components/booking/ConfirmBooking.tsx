"use client";

import { SignInButton, useAuth } from "@clerk/nextjs";
import { SubmitButton } from "../form/Button";
import { createBooking } from "@/Utils/actions";
import { useProperty } from "@/Utils/store";
import FormContainer from "../form/FormContainter";

export default function ConfirmBooking() {
  
  const { userId } = useAuth();
  const { propertyId, range } = useProperty((state) => state);
  const checkIn = range?.from as Date;
  const checkOut = range?.to as Date;

  if (!userId)
    return (
      <SignInButton mode="modal">
        <SubmitButton text="Sign in to confirm booking" className="w-full" />
      </SignInButton>
    );

  return (
    <FormContainer action={createBooking}>
      <input type="hidden" name="propertyId" value={propertyId} />
      <input type="hidden" name="checkIn" value={checkIn.toISOString()} />
      <input type="hidden" name="checkOut" value={checkOut.toISOString()} />
      <SubmitButton text="Confirm Booking" className="w-full" />
      
    </FormContainer>
  );
}

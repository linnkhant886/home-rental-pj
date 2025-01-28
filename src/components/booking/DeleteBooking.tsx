"use client";
import { deleteBooking } from "@/Utils/actions";
import FormContainer from "../form/FormContainter";
import { CardActionButtons } from "../form/Button";

export default function DeleteBooking({ bookingId }: { bookingId: string }) {

  return (
    <FormContainer action={deleteBooking}>
      <input type="hidden" name="bookingId" value={bookingId} />
      <CardActionButtons actionType="delete"  />

      
    </FormContainer>
  );
}

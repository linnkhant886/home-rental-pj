"use client";
import FormContainer from "../form/FormContainter";
import { deleteRental } from "@/Utils/actions";
import { CardActionButtons } from "../form/Button";

export default function DeleteRental({ rentalId }: { rentalId: string }) {
  return (
    <FormContainer action={deleteRental}>
      <input type="hidden" name="rentalId" value={rentalId} />

      <CardActionButtons actionType="delete" />
    </FormContainer>
  );
}

"use client";
import { deleteBooking } from "@/Utils/actions";
import FormContainer from "../form/FormContainter";
import { FaRegTrashAlt } from "react-icons/fa";
import { Button } from "../ui/button";

export default function DeleteBooking({ bookingId }: { bookingId: string }) {
  return (
    <FormContainer action={deleteBooking}>
      <input type="hidden" name="bookingId" value={bookingId} />

      <Button type="submit" className="text-red-500 hover:bg-red-300 bg-white" size={"icon"}>
        <FaRegTrashAlt />
      </Button>
    </FormContainer>
  );
}

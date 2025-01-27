"use client";
import { deleteBooking } from "@/Utils/actions";
import FormContainer from "../form/FormContainter";
import { SubmitButton } from "../form/Button";

export default function DeleteBooking({ bookingId }: { bookingId: string }) {

  return (
    <FormContainer action={deleteBooking}>
      <input type="hidden" name="bookingId" value={bookingId} />


      <SubmitButton
        className="text-red-500 hover:bg-red-300 bg-white"
        size={"icon"}
        text="Delete"
      />
      

      {/* <Button
        type="submit"
        className="text-red-500 hover:bg-red-300 bg-white"
        size={"icon"}
      >
        {pending ? (
          <>
            <IoReload className="animate-spin text-red-500" />
          </>
        ) : (
          <FaRegTrashAlt size={20} />
        )}
      </Button> */}
    </FormContainer>
  );
}

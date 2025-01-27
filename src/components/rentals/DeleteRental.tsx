"use client";
import FormContainer from "../form/FormContainter";
import { FaRegTrashAlt } from "react-icons/fa";
import { Button } from "../ui/button";
import { deleteRental } from "@/Utils/actions";
import { useFormStatus } from "react-dom";
import { IoReload } from "react-icons/io5";

export default function DeleteRental({ rentalId }: { rentalId: string }) {
  const { pending } = useFormStatus();
  return (
    <FormContainer action={deleteRental}>
      <input type="hidden" name="rentalId" value={rentalId} />

      <Button
        type="submit"
        variant={"ghost"}
        className="text-red-500 hover:text-red-600 bg-white"
      >
        {pending ? (
          <>
            <IoReload className="animate-spin text-red-500" />
          </>
        ) : (
          <FaRegTrashAlt size={20} />
        )}
      </Button>
    </FormContainer>
  );
}

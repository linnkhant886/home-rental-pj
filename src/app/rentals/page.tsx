"use client";

import FormContainer from "@/components/form/FormContainter";
import { Input } from "@/components/ui/input";
import { getUserName } from "@/Utils/actions";

export default function Rentals() {
  return (
    <FormContainer action={getUserName}>
      <Input name="userName" placeholder="Enter your username" />

      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Submit
      </button>
    </FormContainer>
  );
}

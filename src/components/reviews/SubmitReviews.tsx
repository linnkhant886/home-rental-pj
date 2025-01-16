"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import RatingInput from "./RatingInput";
import { Textarea } from "../ui/textarea";
import { SubmitButton } from "../form/Button";
import { createReview } from "@/Utils/actions";
import { useToast } from "@/hooks/use-toast";

export default function SubmitReviews({ propertyId }: { propertyId: string }) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const handleClick = () => setOpen(!open);

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await createReview(formData);
    if (response?.error) {
      toast({
        variant: "destructive",
        description: response.error[0],
      });
    } else {
      toast({
        description: "Review Submitted",
      });
      setOpen(false);
    }
  };
  return (
    <div className=" my-4">
      <Button onClick={handleClick}>Leave a Review</Button>

      {open && (
        <form onSubmit={formSubmit}>
          <div className=" p-6 border mt-4 ">
            <input type="hidden" name="propertyId" value={propertyId} />
            <RatingInput name="rating" />
            <p className="  font-semibold my-2">FeedBack</p>

            <Textarea
              name="comment"
              defaultValue="Amazing Place"
              rows={6}
              className="leading-loose"
            />
            <SubmitButton text="Submit" size="default" className="mt-4" />
          </div>
        </form>
      )}
    </div>
  );
}

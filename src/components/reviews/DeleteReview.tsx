'use client';

import { deleteReview } from "@/Utils/actions";
import { CardActionButtons } from "../form/Button";
import FormContainer from "../form/FormContainter";


export const DeleteReview = ({ reviewId }: { reviewId: string }) => {
    return (
      <FormContainer action={deleteReview}>
        <input type="hidden" name="reviewId" value={reviewId} />
        <CardActionButtons actionType="delete" />
      </FormContainer>
    );
  };
  
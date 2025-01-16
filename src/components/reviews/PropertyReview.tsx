import { fetchReviews } from "@/Utils/actions";
import ReviewCard from "./ReviewCard";

export default async function PropertyReview({
  propertyId,
}: {
  propertyId: string;
}) {
  const reviews = await fetchReviews(propertyId);
  if (reviews.length < 1) return null;
  return (
    <div className="mt-6">
      <h1 className=" text-2xl font-semibold mb-2"> Reviews</h1>

      <div className="grid grid-cols-2 gap-4">
        {reviews.map((review) => {
          const { firstName, profileImage } = review.profile;
          const { rating, comment } = review;

          return (
            <ReviewCard
              key={review.id}
              firstName={firstName}
              rating={rating}
              comment={comment}
              userImage={profileImage}
            />
          );
        })}
      </div>
    </div>
  );
}

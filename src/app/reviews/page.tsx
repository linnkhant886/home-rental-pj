import EmptyList from "@/components/home/EmptyList";
import { DeleteReview } from "@/components/reviews/DeleteReview";
import ReviewCard from "@/components/reviews/ReviewCard";
import { fetchUserReviews } from "@/Utils/actions";

export default async function reviews() {
  const userReview = await fetchUserReviews();

 
  if (!userReview || userReview.length === 0) {
    return (
      <EmptyList
        heading="No Reviews Found"
        message="Add some reviews"
        btnText="Add Review"
      />
    );
  }
  // await new Promise((resolve) => setTimeout(resolve, 8000));
  return (
    <div>
      <h1 className=" text-2xl font-semibold mb-2"> Reviews</h1>

      <div className="grid grid-cols-2 gap-4">
        {userReview.map((review) => {
          const { name } = review.property;
          const { profileImage } = review.profile;
          const { rating, comment } = review;

          return (
            <ReviewCard
              key={review.id}
              firstName={name}
              rating={rating}
              comment={comment}
              userImage={profileImage}
            >
              <DeleteReview reviewId={review.id} />
            </ReviewCard>
          );
        })}
      </div>
    </div>
  );
}

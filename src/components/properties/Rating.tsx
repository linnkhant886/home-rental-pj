import { fetchPropertyRating } from "@/Utils/actions";
import { FaStar } from "react-icons/fa";

export default async function Rating({
  inPage,
  propertyId,
}: {
  inPage?: boolean;
  propertyId: string;
}) {
  const { rating, count } = await fetchPropertyRating(propertyId);
  if(count === 0) return null;

  const countText = count > 1 ? `reviews` : `review`;
  const countValue = `(${count}) ${inPage ? countText : ""}`;
  return (
    <span
      className={`flex justify-center gap-1 items-center  ${
        inPage ? "text-md" : "text-xs"
      }`}
    >
      <FaStar className="w-3 h-3" />
      <span className=" mt-0.5">
        {rating} {countValue}
      </span>
    </span>
  );
}

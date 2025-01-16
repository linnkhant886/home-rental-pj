import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Rating from "./Rating";

export interface ReviewCardProps {
  firstName: string;
  userImage: string;
  rating: number;
  comment: string;
  action?: React.ReactNode;
}

export default function ReviewCard({
  firstName,
  userImage,
  rating,
  comment,
  action,
}: ReviewCardProps) {
  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Image
            width={50}
            height={50}
            src={userImage}
            alt={firstName}
            className=" w-12 h-12 object-cover rounded-full"
          />
          <div>
            <Rating rating={rating} />

            <p className="mt-2">{firstName}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p>{comment}</p>
      </CardContent>
      {action && <div className="absolute right-3 top-3">{action}</div>}
    </Card>
  );
}

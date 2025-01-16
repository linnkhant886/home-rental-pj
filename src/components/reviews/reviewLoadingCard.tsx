import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ReviewCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <Skeleton className="w-14 h-14 rounded-full" />
          <div className="ml-4">
            <Skeleton className="w-[150px] h-8 mb-2" />
            <Skeleton className="w-[100px] h-8" />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

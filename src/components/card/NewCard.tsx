import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;

  className?: string;
}

export default function MetricCard({
  title,
  value,
  icon,
  className,
}: MetricCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:shadow-lg",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/50 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity",
        className
      )}
    >
      <CardContent className="relative p-6 transition-transform hover:-translate-y-0.5">
        {/* Background Accent */}
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-500/5 blur-2xl" />

        {/* Content */}
        <div className="flex justify-between items-center space-x-2">
          <div className="flex gap-2 items-center ">
            <div className="text-orange-500 rounded-lg  p-2 bg-orange-500/10">
              {icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-600">{title}</h3>
          </div>

          <div className="text-3xl font-bold tracking-tight text-gray-800">
            {value}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

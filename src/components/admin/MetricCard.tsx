import { Card, CardContent } from "../ui/card";

interface MetricCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

export default function MetricCard({ title, value, icon }: MetricCardProps) {
  return (
    <Card className="bg-gray-50/90">
      <CardContent className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-2">
          {icon}
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <span className="text-2xl font-bold text-orange-500">{value}</span>
      </CardContent>
    </Card>
  );
}

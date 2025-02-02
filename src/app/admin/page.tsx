import MetricCard from "@/components/admin/MetricCard";
import { Card, CardContent } from "@/components/ui/card";
import { fetchStats } from "@/Utils/actions";
import { Users, Home, Calendar } from "lucide-react";


export default async function AdminDashboard() {
  const stats = await fetchStats();

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard title="Users" value={stats.userCount || 0} icon={<Users />} />
        <MetricCard title="Properties" value={stats.propertiesCount || 0 } icon={<Home />} />
        <MetricCard title="Bookings" value={stats.bookingsCount || 0} icon={<Calendar />} />
      </div>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-2xl font-bold mb-4">Monthly Bookings</h2>
          <div className="h-[300px] flex items-center justify-center text-gray-500">
            Chart goes here
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

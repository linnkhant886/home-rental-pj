import Chart from "@/components/admin/Chart";
import MetricCard from "@/components/admin/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchChartData, fetchStats } from "@/Utils/actions";
import { Users, Home, Calendar } from "lucide-react";

export default async function AdminDashboard() {
  const stats = await fetchStats();
  const chart = await fetchChartData();

  const hasChartData = chart && Array.isArray(chart) && chart.length > 0;

  return (
    <div className="space-y-10">
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          title="Users"
          value={stats.userCount || 0}
          icon={<Users />}
        />
        <MetricCard
          title="Properties"
          value={stats.propertiesCount || 0}
          icon={<Home />}
        />
        <MetricCard
          title="Bookings"
          value={stats.bookingsCount || 0}
          icon={<Calendar />}
        />
      </div>

      {hasChartData && (
        <Card>
          <CardHeader>
            <CardTitle>
              <h2 className="text-2xl font-bold mb-4">Monthly Bookings</h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Chart data={chart} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

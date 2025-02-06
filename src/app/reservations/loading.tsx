"use client";

import { Skeleton } from "@/components/ui/skeleton";

import MetricLoadingCard from "@/components/card/MetricLoadingCard";
import TableLoadingCard from "@/components/card/TableLoacingCard";

export default function Loading() {
  return (
    <div className="space-y-6 p-6">
      {/* Metric Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <MetricLoadingCard />
        <MetricLoadingCard />
        <MetricLoadingCard />
      </div>

      {/* Reservations Title */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-[180px]" />
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <TableLoadingCard />
      </div>
    </div>
  );
}

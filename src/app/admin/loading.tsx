"use client";

import MetricLoadingCard from "@/components/card/MetricLoadingCard";

export default function Loading() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <MetricLoadingCard />
      <MetricLoadingCard />
      <MetricLoadingCard />
    </div>
  );
}

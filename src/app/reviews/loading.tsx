"use client";
import ReviewLoadingCard from "@/components/reviews/reviewLoadingCard";
export default function Loading() {
  return (
    <section className="grid md:grid-cols-2 gap-8 mt-4 ">
      <ReviewLoadingCard />
      <ReviewLoadingCard />
    </section>
  );
}

"use client";

import { Booking } from "@/Utils/store";
import dynamic from "next/dynamic";

const DynamicBookingWarpper = dynamic(
  () => import("@/components/booking/BookingWrapper"),
  { ssr: false }
);

export default function DynamicBookingPage({
  propertyId,
  price,
  bookings,
}: {
  propertyId: string;
  price: number;
  bookings: Booking[];
}) {
  return (
    <DynamicBookingWarpper
      propertyId={propertyId}
      price={price}
      bookings={bookings}
    />
  );
}

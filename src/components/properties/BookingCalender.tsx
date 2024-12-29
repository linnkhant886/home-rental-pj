"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";

export default function BookingCalender() {
  const currentDate = new Date();
  const defaultSelected = {
    from: undefined,
    to: undefined,
  };
  const [range, setrange] = useState<DateRange | undefined>(defaultSelected);
  return (
    <Calendar
      mode="range"
      selected={range}
      onSelect={setrange}
      defaultMonth={currentDate}
      className="w-full"
    />
  );
}

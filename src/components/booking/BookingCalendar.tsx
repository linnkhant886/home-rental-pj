import { defaultSelected } from "@/Utils/calender";
import { useProperty } from "@/Utils/store";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { Calendar } from "../ui/calendar";

export default function BookingCalendar() {
  const currentDate = new Date();

  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

  useEffect(() => {
    useProperty.setState({ range });
  }, [range]);
  return (
    <div className="flex justify-center w-full">
      <Calendar
        mode="range"
        defaultMonth={currentDate}
        selected={range}
        onSelect={setRange}
        className="mb-4"
      />
    </div>
  );
}

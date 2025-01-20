import { useProperty } from "@/Utils/store";
import BookingForm from "./BookingForm";
import ConfirmBooking from "./ConfirmBooking";

export default function BookingContainer() {
  const { range, price } = useProperty((state) => state);

  if (!range || !range.from || !range.to) return null;

  return (
    <div className="w-full ">
      <BookingForm checkIn={range.from} checkOut={range.to} price={price} />
      <ConfirmBooking />
    </div>
  );
}

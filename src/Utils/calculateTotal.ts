import { calculateDaysBetween } from "./calender";

type BookingDetails = {
  checkIn: Date;
  checkOut: Date;
  price: number;
};

export const calculateTotal = ({
  checkIn,
  checkOut,
  price,
}: BookingDetails) => {
  const totalNights = calculateDaysBetween({ checkIn, checkOut });
  const subTotal = totalNights * price;
  const tax = subTotal * 0.1;
  const cleaningFee = 21;
  const serviceFee = 40;
  const total = totalNights + tax + cleaningFee + serviceFee + subTotal;
  return { total, tax, cleaningFee, serviceFee, subTotal, totalNights };
};

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "../ui/separator";
import { calculateTotal } from "@/Utils/calculateTotal";
import { calculateDaysBetween } from "@/Utils/calender";
import { formatCurrency } from "@/Utils/countries";

export default function BookingForm({
  checkIn,
  checkOut,
  price,
}: {
  checkIn: Date;
  checkOut: Date;
  price: number;
}) {
  const { total, tax, cleaningFee, serviceFee, subTotal } = calculateTotal({
    checkIn,
    checkOut,
    price,
  });
  return (
    <Card className="w-full p-4 mb-4"> 
      <CardHeader>
        <CardTitle>Booking Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <FormRow
          label={` $${price} x ${calculateDaysBetween({
            checkIn,
            checkOut,
          })} nights`}
          amount={subTotal}
        />
        <FormRow label="Cleaning Fee" amount={cleaningFee} />
        <FormRow label="Service Fee" amount={serviceFee} />
        <FormRow label="Tax" amount={tax} />
      </CardContent>
      <Separator  />
      <CardTitle className="mt-2 p-4">
        <FormRow label="Booking Total" amount={total} />
      </CardTitle>
    </Card>
  );
}

function FormRow({ label, amount }: { label: string; amount: number }) {
  return (
    <p className="flex justify-between text-sm mb-2">
      <span>{label}</span>
      <span>{formatCurrency(amount)}</span>
    </p>
  );
}

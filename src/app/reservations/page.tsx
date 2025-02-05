import MetricCard from "@/components/admin/MetricCard";
import NewCard from "@/components/card/NewCard";
import Emptysearch from "@/components/home/EmptyList";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchBookingbyUser, fetchReservations } from "@/Utils/actions";
import { formatCurrency, formatDate } from "@/Utils/countries";
import { Calculator, Home, CalendarClock } from "lucide-react";

export default async function Reservations() {
  const userBooking = await fetchBookingbyUser();
  const reservationStats = await fetchReservations();

  if (!userBooking || userBooking.length === 0)
    return (
      <Emptysearch
        heading="No Bookings Found"
        message="Add some bookings"
        btnText="Add Booking"
      />
    );

  return (
    <div className="cursor-pointer">
      <div className=" p-8 w-full">
        <div className="grid gap-4 md:grid-cols-3">
          <NewCard
            title="Properties"
            value={reservationStats.propertyCount || 0}
            icon={<Home size={40} />}
          />
          <NewCard
            title="Nights"
            value={reservationStats.totalNights || 0}
            icon={<CalendarClock size={40} />}
          />
          <NewCard
            title="Total"
            value={formatCurrency(reservationStats.totalIncome || 0)}
            icon={<Calculator size={40} />}
          />
        </div>
      </div>
      <p className="mb-2">Total Reservations: {userBooking.length}</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Property Name</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Nights</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Check In</TableHead>
            <TableHead>Check Out</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userBooking.map((booking, index) => (
            <TableRow key={index}>
              <TableCell>{booking.property.name}</TableCell>
              <TableCell>{booking.property.country}</TableCell>
              <TableCell>{booking.totalNights}</TableCell>
              <TableCell>{booking.orderTotal}</TableCell>
              <TableCell>{formatDate(booking.checkIn)}</TableCell>
              <TableCell>{formatDate(booking.checkOut)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

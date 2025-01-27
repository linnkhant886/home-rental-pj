import DeleteBooking from "@/components/booking/DeleteBooking";
import Emptysearch from "@/components/home/EmptyList";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchBookingbyUser } from "@/Utils/actions";

export default async function BookingsTable() {
  const userBooking = await fetchBookingbyUser();
  // console.log(userBooking);
  if (!userBooking || userBooking.length === 0)
    return (
      
      <Emptysearch
        heading="No Bookings Found"
        message="Add some bookings"
        btnText="Add Booking"
      />
    );
  const formatDate = (dateString: Date) => {
    return dateString.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="cursor-pointer">
      <p>Total Bookings: {userBooking.length}</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Property Name</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Nights</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Check In</TableHead>
            <TableHead>Check Out</TableHead>
            <TableHead>Actions</TableHead>
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
              <TableCell>
                <DeleteBooking bookingId={booking.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

import DeleteRental from "@/components/rentals/DeleteRental";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchRentalsbyUser } from "@/Utils/actions";
import Link from "next/link";
import { MdOutlineEditNote } from "react-icons/md";

export default async function myRental() {
  const userRentals = await fetchRentalsbyUser();

  console.log();
  return (
    <div className="cursor-pointer">
      <p>Total Active Properties: {userRentals.length}</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Property Name</TableHead>
            <TableHead>Nightly Rate</TableHead>
            <TableHead>Nights Booked</TableHead>
            <TableHead>Total Income</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {userRentals.map((rental) => (
            <TableRow key={rental.id}>
              <TableCell>{rental.name}</TableCell>
              <TableCell>{rental.price}</TableCell>
              <TableCell>{rental.totalNights}</TableCell>
              <TableCell>{rental.totalIncome}</TableCell>
              <TableCell className="flex  items-center">
                <Link href={`/rentals/${rental.id}`}>
                  <MdOutlineEditNote size={25} className="text-primary" />
                </Link>
                <DeleteRental rentalId={rental.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RentalimageUpload() {
  return (
    <div className=" space-y-2 ">
      <Label>Image</Label>
      <Input type="file" name="image" className="border p-2 rounded-md mb-3" />
    </div>
  );
}

"use client";

import { SubmitButton } from "@/components/form/Button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { rentalImageUpload } from "@/Utils/actions";
import Image from "next/image";
import { useState } from "react";

interface Props {
  imageUrl: string;
  propertyId: string;
}

export default function RentalImageUpdate({ imageUrl, propertyId }: Props) {
  const [formUpload, setFormUpload] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = async (formData: FormData) => {
    try {
      const respone = await rentalImageUpload(formData);
      if (respone?.error) {
        toast({
          variant: "destructive",
          description: respone.error[0],
        });
      } else {
        toast({
          description: "Image Uploaded",
        });
        setFormUpload(false);
      }
    } catch {
      return { message: "there was an error..." };
    }
  };

  return (
    <div className="mb-4">
      <Image
        width={75}
        height={75}
        alt="profile"
        className="h-28 w-28 rounded object-cover mb-2"
        src={imageUrl}
      />

      <Button variant="default" size={"sm"} onClick={() => setFormUpload(true)}>
        Update Image
      </Button>

      {formUpload && (
        <form
          className="w-[400px] gap-4 rounded-md mt-2"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleImageUpload(formData);
          }}
        >
          <input type="hidden" name="propertyId" value={propertyId} />
          <Input
            type="file"
            name="image"
            className="border p-2 rounded-md mb-3"
            accept="image/*"
          />

          <SubmitButton size={"sm"} text={"Upload"} />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="bg-[#FFF7D1] hover:bg-[#FBF4DB] ml-2"
            onClick={() => setFormUpload(false)}
          >
            Cancel
          </Button>
        </form>
      )}
    </div>
  );
}

"use client";

import { SubmitButton } from "@/components/form/Button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { imageUpload } from "@/Utils/actions";
import { Profile } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

interface Props {
  userProfile: Profile;
}

export default function UpdateImageForm({ userProfile }: Props) {
  const [formUpload, setformUpload] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = async (formData: FormData) => {
    try {
      const respone = await imageUpload(formData);
      if (respone?.error) {
        toast({
          variant: "destructive",
          description: respone.error[0],
        });
      } else {
        toast({
          description: "Image Uploaded",
        });
        setformUpload(false);
      }
    } catch {
      return { message: "there was an error..." };
    }
  };
  return (
    <div className=" mb-4">
      <Image
        width={100}
        height={100}
        alt="profile"
        className="h-32 w-32 rounded-full object-cover mb-2"
        src={userProfile.profileImage}
      />

      <Button variant="default" size={"sm"} onClick={() => setformUpload(true)}>
        Update ProfileImage
      </Button>

      {formUpload && (
        <form
          className=" w-[400px]  gap-4  rounded-md mt-2  "
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleImageUpload(formData);
          }}
        >
          <Input
            type="file"
            name="image"
            className="border p-2 rounded-md mb-3"
          />

          <SubmitButton size={"sm"} text={"Upload"} />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className=" bg-[#FFF7D1] hover:bg-[#FBF4DB] ml-2"
            onClick={() => setformUpload(false)}
          >
            Cancel
          </Button>
        </form>
      )}
    </div>
  );
}

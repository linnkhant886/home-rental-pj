/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { SubmitButton } from "@/components/form/Button";
import FormInput from "@/components/form/FormInput";
import { updateProfileAction } from "@/Utils/actions";
import { useToast } from "@/hooks/use-toast";
import { Profile } from "@prisma/client";
import UpdateImageForm from "./UpdateImageForm";

interface Props {
  userProfile: Profile;
}

export default function UpdateForm({ userProfile }: Props) {
  const { toast } = useToast();
  const handleUpdate = async (formData: FormData) => {
    try {
      const respone = await updateProfileAction(formData);
      if (respone?.error) {
        toast({
          variant: "destructive",
          description: respone.error[0],
        });
      } else {
        toast({
          description: "Profile Update",
        });
      }
    } catch (error) {
      return { message: "there was an error..." };
    }
  };
  return (
    <div>
      <h1 className=" text-2xl font-bold mb-10">User Profile</h1>

      <div className="  gap-4 border p-8 rounded-md ">
        <UpdateImageForm userProfile={userProfile} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleUpdate(formData);
          }}
        >
          <div className="grid md:grid-cols-2 gap-4">
            <FormInput
              name="firstName"
              label="First Name"
              placeholder="First Name"
              defaultValue={userProfile.firstName}
            />
            <FormInput
              name="lastName"
              label="last Name"
              placeholder="Last Name"
              defaultValue={userProfile.lastName}
            />
            <FormInput
              name="userName"
              label="User Name"
              placeholder="UserName"
              defaultValue={userProfile.userName}
            />
          </div>

          <div>
            <SubmitButton className="mt-8" text="Update Profile" />
          </div>
        </form>
      </div>
    </div>
  );
}

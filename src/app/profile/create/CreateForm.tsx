"use client";
import { SubmitButton } from "@/components/form/Button";
import FormInput from "@/components/form/FormInput";
import { createProfileAction } from "@/Utils/actions";
import { useToast } from "@/hooks/use-toast";

export default function CreateForm() {
  const { toast } = useToast();
  const handleCreate = async (formData: FormData) => {
    try {
      const respone = await createProfileAction(formData);
      if (respone?.error) {
        toast({
          variant: "destructive",
          description: respone.error[0],
        });
      } else {
        toast({
          description: "Profile Created",
        });
      }
    } catch (error) {
      console.log(error);
      return { message: "there was an error..." };
    }
  };
  return (
    <div>
      <h1 className=" text-2xl font-bold mb-10">New User</h1>
      <form
        className="  gap-4 border p-8 rounded-md "
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          handleCreate(formData);
        }}
      >
        <div className="grid md:grid-cols-2 gap-4">
          <FormInput
            name="firstName"
            label="First Name"
            placeholder="First Name"
          />
          <FormInput
            name="lastName"
            label="last Name"
            placeholder="Last Name"
          />
          <FormInput name="userName" label="User Name" placeholder="UserName" />
        </div>

        <div>
          <SubmitButton className="mt-8" text="Create Profile" />
        </div>
      </form>
    </div>
  );
}

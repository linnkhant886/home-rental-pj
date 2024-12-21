"use client";
import CategoriesInput from "@/components/form/CategoriesInput";
import CountriesInput from "@/components/form/CountriesInput";
import Description from "@/components/form/Description";
import FormInput from "@/components/form/FormInput";
import RentalimageUpload from "../../../components/form/RentalimageUpload";
import CounterInput from "@/components/form/CounterInput";
import AmenitiesInput from "@/components/form/AmenitiesInput";
import { SubmitButton } from "@/components/form/Button";
import { createProperty } from "@/Utils/actions";
import { useToast } from "@/hooks/use-toast";

export default function CreatepropertyForm() {
  const { toast } = useToast();

  const handleCreate = async (formData: FormData) => {
    try {
      const respone = await createProperty(formData);
      if (respone?.error) {
        toast({
          variant: "destructive",
          description: respone.error[0],
        });
      } else {
        toast({
          description: "Property Created",
        });
      }
    } catch {
      return { message: "there was an error..." };
    }
  };
  return (
    <div>
      <h1 className=" text-2xl font-semibold mb-10">Create Property</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          handleCreate(formData);
        }}
        className=" border p-8"
      >
        <p>General Info</p>
        <div className=" grid md:grid-cols-2 gap-4">
          <FormInput name="name" label="Name (20Limit)" type="text" />
          <FormInput name="tagline" label="TagLine (30Limit)" type="text" />
          <FormInput
            name="price"
            type="number"
            label="Price ($)"
            defaultValue="100"
          />

          <CategoriesInput />
          <div className="col-span-2">
            <Description
              name="description"
              label="Description(10-1000 words)"
            />
          </div>
          <CountriesInput />
          <RentalimageUpload />
          <h1 className=" text-xl mt-2">Rental Details</h1>
          <div className=" col-span-2">
            <CounterInput detail="guests" />
            <CounterInput detail="bedrooms" />
            <CounterInput detail="baths" />
            <CounterInput detail="beds" />
          </div>
          <h1 className=" text-xl mt-2">Amenities</h1>
          <div className="col-span-2 ">
            <AmenitiesInput />
          </div>
        </div>
        <SubmitButton size="lg" className="mt-4" text="Create Property" />
      </form>
    </div>
  );
}

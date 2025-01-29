import AmenitiesInput from "@/components/form/AmenitiesInput";
import { SubmitButton } from "@/components/form/Button";
import CategoriesInput from "@/components/form/CategoriesInput";
import CounterInput from "@/components/form/CounterInput";
import CountriesInput from "@/components/form/CountriesInput";
import Description from "@/components/form/Description";
import FormContainer from "@/components/form/FormContainter";
import FormInput from "@/components/form/FormInput";
import RentalimageUpdate from "@/components/form/RentalImageUpdate";
import { editRental, propertyDetail } from "@/Utils/actions";
import { Amenity } from "@/components/form/AmenitiesInput";

type Params = Promise<{ id: string }>;




export default async function EditProperty({ params }: { params: Params }) {
  const { id } = await params;
  // console.log('id of property', id);
  const propertyDetails = await propertyDetail(id);

  if (!propertyDetails) {
    return <h1>Property Not Found</h1>;
  }

  const { name, price, tagline, description, image, category, country } =
    propertyDetails;
  const { guests, bedrooms, baths, beds  } = propertyDetails;
  const defaultAmenities: Amenity[] = JSON.parse(propertyDetails.amenities);


  return (
    <div>
      <h1 className=" text-2xl font-semibold mb-4">EditProperty</h1>

      <div className="container mx-auto p-10 border-2 border-gray-100 rounded-md">
        <div>
          <RentalimageUpdate imageUrl={image} propertyId={id} />

          <FormContainer action={editRental}>
            <div className=" grid md:grid-cols-2 gap-4">
              <FormInput
                name="name"
                label="Name (20Limit)"
                type="text"
                defaultValue={name}
              />
              <FormInput
                name="tagline"
                label="TagLine (30Limit)"
                type="text"
                defaultValue={tagline}
              />
              <FormInput
                name="price"
                type="number"
                label="Price ($)"
                defaultValue={`${price}`}
              />

              <CategoriesInput category={category} />
              <CountriesInput country={country} />

              <div className="col-span-2">
                <Description
                  name="description"
                  label="Description(10-1000 words)"
                  defaultValue={description}
                />
              </div>
              <div className=" col-span-2">
                <CounterInput detail="guests" defaultValue={guests} />
                <CounterInput detail="bedrooms" defaultValue={bedrooms} />
                <CounterInput detail="baths" defaultValue={baths} />
                <CounterInput detail="beds" defaultValue={beds} />
              </div>
              <h1 className=" text-xl mt-2">Amenities</h1>
              <div className="col-span-2 ">
                <AmenitiesInput  defaultValue={defaultAmenities}/>
              </div>

              <SubmitButton size="lg" className="mt-4" text="Create Property" />
            </div>
          </FormContainer>
        </div>
      </div>
    </div>
  );
}

import FavouriteToggleForm from "@/components/card/FavouriteToggleForm";
import Amenities from "@/components/properties/Amenities";
import BreadCrumb from "@/components/properties/BreadCrumb";
import DescriptionProperty from "@/components/properties/DescriptionProperty";
import PropertyPage from "@/components/properties/DynamicMap";
import ImageContainer from "@/components/properties/ImageContainer";
import Rating from "@/components/properties/Rating";
import ShareButton from "@/components/properties/ShareButton";
import Userinfo from "@/components/properties/Userinfo";
import PropertyReview from "@/components/reviews/PropertyReview";
import SubmitReviews from "@/components/reviews/SubmitReviews";
import { Separator } from "@/components/ui/separator";
import { findExistingReview, propertyDetail } from "@/Utils/actions";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import DynamicBookingPage from "@/components/booking/ီိDynamicBooking";

type Params = Promise<{ id: string }>;


export default async function PropertyDetailPage(props: { params: Params }) {
  const params = await props.params;
  const { id } = params;
  const property = await propertyDetail(id);
  if (!property) redirect("/");

  const { userId } = await auth();

  const notOwnerofProperty = userId !== property.profile?.clerkId;
  const allowReview =
    notOwnerofProperty && userId && !(await findExistingReview(property.id));

  const firstName = property.profile?.firstName;
  const userImage = property.profile?.profileImage;
  // console.log(review)
  return (
    <div>
      <BreadCrumb name={property.name} />
      <div className=" flex justify-between my-2">
        <header className=" text-5xl font-semibold">{property.name}</header>
        <div className=" flex items-center gap-2">
          <ShareButton propertyId={property.id} name={property.name} />
          <FavouriteToggleForm propertyId={property.id} />
        </div>
      </div>
      <ImageContainer image={property.image} name={property.name} />
      <section className=" lg:grid lg:grid-cols-12 mt-10 gap-x-4">
        <div className=" lg:col-span-8 ">
          <div className="flex gap-x-4">
            <p className=" text-xl font-semibold">{property.name}</p>

            <p>
              <Rating inPage={true} propertyId={property.id} />
            </p>
          </div>
          <p className=" mt-2 text-muted-foreground">
            <span> {property.guests} guests .</span>
            <span> {property.bedrooms} bedrooms .</span>
            <span> {property.beds} beds .</span>
            <span> {property.baths} baths</span>
          </p>
          <div>
            <Userinfo firstName={firstName} userImage={userImage} />
          </div>

          <Separator className="my-4" />
          <DescriptionProperty description={property.description} />
          <Amenities amenities={property.amenities} />
          <PropertyPage countryName={property.country} />
        </div>

        <div className=" lg:col-span-4 flex flex-col items-center w-full  mx-auto">
          {/* <BookingCalender />
           */}
          <DynamicBookingPage
            propertyId={property.id}
            price={property.price}
            bookings={property.bookings}
          />
        </div>
      </section>
      {allowReview && <SubmitReviews propertyId={property.id} />}
      <PropertyReview propertyId={property.id} />
    </div>
  );
}

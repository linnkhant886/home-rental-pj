import { HiBadgeCheck } from "react-icons/hi";

type Amenity = {
  name: string;
  selected: boolean;
};

export default function Amenities({ amenities }: { amenities: string }) {
  const amenitieArray: Amenity[] = JSON.parse(amenities);
  const noamenities = amenitieArray.length === 0;

  if (noamenities) return null;

  return (
    <div className="mt-4">
      <h1 className=" font-bold text-xl my-2">What this place offers</h1>
      <div className=" grid grid-cols-2 ">
        {amenitieArray.map((amenity) => (
          <div key={amenity.name} className=" flex items-center my-1 gap-2">
            <p className=" flex gap-2">
              <HiBadgeCheck size={20} className="text-primary" />
              {amenity.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

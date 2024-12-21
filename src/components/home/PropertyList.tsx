import PropertyCard from "../card/PropertyCard";
import { PropertyCardProps } from "./PropertyContainer";

export default function PropertyList({
  propertyList,
}: {
  propertyList: PropertyCardProps[];
}) {
  // console.log(propertyList);
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {propertyList.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}

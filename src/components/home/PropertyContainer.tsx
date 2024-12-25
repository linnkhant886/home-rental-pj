import { fetchProperty } from "@/Utils/actions";
import Emptysearch from "./EmptyList";
import PropertyList from "./PropertyList";

export type PropertyCardProps = {
  image: string;
  id: string;
  name: string;
  tagline: string;
  country: string;
  price: number;
};

export default async function PropertyContainer({
  category,
  search,
}: {
  category?: string;
  search?: string;
}) {
  const propertyList: PropertyCardProps[] = await fetchProperty({
    category,
    search,
  });
  if (propertyList.length === 0) return <Emptysearch />;
  return <PropertyList propertyList={propertyList} />;
}

import EmptyList from "@/components/home/EmptyList";
import { PropertyCardProps } from "@/components/home/PropertyContainer";
import PropertyList from "@/components/home/PropertyList";
import { fetchFavorites } from "@/Utils/actions";

export default async function Favorites() {
  const favorite: PropertyCardProps[] = await fetchFavorites();

  if (favorite.length === 0)
    return (
      <EmptyList
        heading="No Favorites Found"
        message="Add some favorites"
        btnText="Add Favorite"
      />
    );
  return <PropertyList propertyList={favorite} />;
}

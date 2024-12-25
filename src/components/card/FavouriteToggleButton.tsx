import { auth } from "@clerk/nextjs/server";
import { CardSignInButton } from "../form/Button";
import FavouriteToggleForm from "./FavouriteToggleForm";
import prisma from "@/Utils/prisma";

export default async function FavouriteToggleButton({
  propertyId,
}: {
  propertyId: string;
}) {
  const authResult = await auth();
  const { userId } = authResult;

  if (!userId) return <CardSignInButton />;
  const favoriteId = await prisma.favorite.findFirst({
    where: {
      propertyId,
      profileId: userId,
    },
    select: {
      id: true,
    },
  });
  return (
    <FavouriteToggleForm
      favoriteId={favoriteId?.id }
      propertyId={propertyId}
    />
  );
}

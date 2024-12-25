"use client";

import { addFavorite } from "@/Utils/actions";
import { CardSubmitteButton } from "../form/Button";
import { useToast } from "@/hooks/use-toast";

export default function FavouriteToggleForm({
  favoriteId,
  propertyId,
}: {
  favoriteId?: string;
  propertyId: string;
}) {
  const { toast } = useToast();

  const handleCreate = async (propertyId: string, favoriteId?: string) => {
    try {
      const response = await addFavorite({ favoriteId, propertyId });
      if(response.message) {
        toast({ description: response.message })
      }else {
        toast({
          variant: "destructive",
          description: response.error,
        });
      };
    } catch  {
      return { message: "there was an error..." };
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCreate(propertyId, favoriteId);
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardSubmitteButton isFavourite={favoriteId ? true : false} />
    </form>
  );
}

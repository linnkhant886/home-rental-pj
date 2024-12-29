"use server";

import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { imageSchema, profileSchema, propertySchema } from "./schems";
import { z } from "zod";
import prisma from "./prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { uploadImage } from "./supabase";

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("You must be logged in to access this route");
  }
  if (!user.privateMetadata.hasProfile) redirect("/profile/create");
  return user;
};

export const fetchProfile = async () => {
  const user = await getAuthUser();

  const profile = await prisma.profile.findUnique({
    where: {
      clerkId: user.id,
    },
  });
  if (!profile) return redirect("/profile/create");
  return profile;
};

export const createProfileAction = async (formData: FormData) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Please login to create a profile");

    const rawData = Object.fromEntries(formData);
    const validatedFields = profileSchema.parse(rawData);

    await prisma.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? "",
        ...validatedFields,
      },
    });
    // return console.log(clerkClient);
    const clerk = await clerkClient();

    await clerk.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log(err);
      const errorMessages = err.errors.map((item) => item.message);
      return { error: errorMessages };
    }
    return { error: "Something went wrong , please contact support" };
  }
  redirect("/");
};

export const updateProfileAction = async (formData: FormData) => {
  try {
    const user = await getAuthUser();

    const rawData = Object.fromEntries(formData);
    const validatedFields = profileSchema.parse(rawData);

    await prisma.profile.update({
      where: {
        clerkId: user.id,
      },
      data: {
        ...validatedFields,
      },
    });
    revalidatePath("/profile");
  } catch (err) {
    if (err instanceof z.ZodError) {
      // console.log(err);
      const errorMessages = err.errors.map((item) => item.message);
      return { error: errorMessages };
    }
    return { error: "Something went wrong , please contact support" };
  }
  redirect("/profile");
};

export const imageUpload = async (formData: FormData) => {
  try {
    const user = await getAuthUser();
    const image = formData.get("image") as File;
    const validatedFile = imageSchema.parse(image);
    const fullpath = await uploadImage(validatedFile);

    await prisma.profile.update({
      where: {
        clerkId: user.id,
      },
      data: {
        profileImage: fullpath,
      },
    });
    revalidatePath("/profile");
  } catch {
    return { error: "Something went wrong , please contact support" };
  }
};

export const createProperty = async (formData: FormData) => {
  try {
    // return console.log(formData);

    const user = await getAuthUser();

    const rawData = Object.fromEntries(formData);
    const file = formData.get("image") as File;
    const validatedFields = propertySchema.parse(rawData);
    const validateFile = imageSchema.parse(file);
    const fullpath = await uploadImage(validateFile);

    await prisma.property.create({
      data: {
        ...validatedFields,
        image: fullpath,
        profileId: user.id,
      },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      const errorMessages = err.errors.map((item) => item.message);
      return { error: errorMessages };
    }
    return { error: "Something went wrong , please contact support" };
  }
  redirect("/");
};

export const fetchProperty = async ({
  search = "",
  category,
}: {
  search?: string;
  category?: string;
}) => {
  const property = await prisma.property.findMany({
    where: {
      category,
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          tagline: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },
    select: {
      id: true,
      name: true,
      tagline: true,
      image: true,
      price: true,
      country: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return property;
};

export const addFavorite = async ({
  favoriteId,
  propertyId,
}: {
  favoriteId?: string;
  propertyId: string;
}) => {
  const user = await getAuthUser();
  try {
    if (favoriteId) {
      await prisma.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
      revalidatePath("/");
    } else {
      await prisma.favorite.create({
        data: {
          propertyId,
          profileId: user.id,
        },
      });
    }
    revalidatePath("/");

    return { message: favoriteId ? "Removed from Faves" : "Added to Faves" };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
};

export const fetchFavorites = async () => {
  const user = await getAuthUser();
  const favorites = await prisma.favorite.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      property: {
        select: {
          id: true,
          name: true,
          tagline: true,
          image: true,
          price: true,
          country: true,
        },
      },
    },
  });
  return favorites.map((item) => item.property);
};

export const propertyDetail = async (propertyId: string) => {
  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
    include: {
      profile: true,
    },
  });
  return property;
};

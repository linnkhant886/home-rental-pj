"use server";

import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { profileSchema } from "./schems";
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
    // console.log(user);
    if (!user) throw new Error("Please login to create a profile");

    const rawData = Object.fromEntries(formData);
    const validatedFields = profileSchema.parse(rawData);
    // console.log(validatedFields);
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
    const fullpath = await uploadImage(image);

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

"use server";

import { clerkClient, currentUser } from "@clerk/nextjs/server";
import {
  imageSchema,
  profileSchema,
  propertySchema,
  reviewSchema,
} from "./schems";
import { z } from "zod";
import prisma from "./prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { uploadImage } from "./supabase";
import { calculateTotal } from "./calculateTotal";
import { formatDate } from "./countries";

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
      bookings: {
        select: {
          checkIn: true,
          checkOut: true,
        },
      },
    },
  });
  return property;
};

export const createReview = async (formData: FormData) => {
  // return console.log(formData);
  try {
    const user = await getAuthUser();
    const rawData = Object.fromEntries(formData);
    const validatedFields = reviewSchema.parse(rawData);
    const ratingasNumber = validatedFields.rating as number;

    await prisma.review.create({
      data: {
        ...validatedFields,
        rating: ratingasNumber,
        profileId: user.id,
      },
    });
    revalidatePath(`/property/${validatedFields.propertyId}`);
  } catch (err) {
    if (err instanceof z.ZodError) {
      const errorMessages = err.errors.map((item) => item.message);
      return { error: errorMessages };
    }
    return { error: "Something went wrong , please contact support" };
  }
};

export const fetchReviews = async (propertyId: string) => {
  const reviews = await prisma.review.findMany({
    where: {
      propertyId,
    },
    include: {
      profile: {
        select: {
          firstName: true,
          profileImage: true,
        },
      },
    },
  });
  return reviews;
};

export const fetchUserReviews = async () => {
  const user = await getAuthUser();
  const reviews = await prisma.review.findMany({
    where: {
      profileId: user.id,
    },
    include: {
      property: {
        select: {
          name: true,
        },
      },
      profile: {
        select: {
          profileImage: true,
        },
      },
    },
  });
  return reviews;
};

export const deleteReview = async (
  prevState: { message: string; error: string }, // Add prevState parameter
  formData: FormData
) => {
  const user = await getAuthUser();
  const reviewId = formData.get("reviewId") as string;
  try {
    await prisma.review.delete({
      where: {
        profileId: user.id,
        id: reviewId,
      },
    });

    revalidatePath("/reviews");
    return { message: "Review deleted successfully", error: "" };
  } catch {
    return {
      message: "",
      error: "Something went wrong , please contact support",
    };
  }
};

export async function fetchPropertyRating(propertyId: string) {
  const result = await prisma.review.groupBy({
    by: ["propertyId"],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: {
      propertyId,
    },
  });

  // empty array if no reviews
  return {
    rating: result[0]?._avg.rating?.toFixed(1) ?? 0,
    count: result[0]?._count.rating ?? 0,
  };
}

export const findExistingReview = async (propertyId: string) => {
  const user = await getAuthUser();
  const review = await prisma.review.findFirst({
    where: {
      profileId: user.id,
      propertyId,
    },
  });
  return review;
};

export const createBooking = async (
  prevState: { message: string; error: string; redirectUrl?: string }, // Add redirectUrl to the state
  formData: FormData
) => {
  try {
    const user = await getAuthUser();
    if (!user) {
      return { message: "", error: "User not authenticated" }; // Return error if user is not authenticated
    }

    // Extract form data
    const propertyId = formData.get("propertyId")?.toString();
    const checkIn = formData.get("checkIn")?.toString();
    const checkOut = formData.get("checkOut")?.toString();

    // Validate input
    if (!propertyId || !checkIn || !checkOut) {
      return { message: "", error: "Missing required fields" }; // Return error if input is invalid
    }

    // Fetch property details
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      select: { price: true },
    });

    if (!property) {
      return { message: "", error: "Property not found" }; // Return error if property is not found
    }

    // Calculate total cost
    const { total, totalNights } = calculateTotal({
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      price: property.price,
    });

    // Create booking
    await prisma.booking.create({
      data: {
        profileId: user.id,
        propertyId,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        orderTotal: total,
        totalNights,
      },
    });

    // Return success message and redirect URL
    return {
      message: "Booking created successfully!",
      error: "",
      redirectUrl: "/bookings", // Redirect to a success page with booking ID
    };
  } catch (err) {
    console.error(err);
    return {
      message: "",
      error: "Something went wrong. Please contact support.",
    }; // Return error if something goes wrong
  }
};

export const fetchBookingbyUser = async () => {
  const user = await getAuthUser();
  const bookings = await prisma.booking.findMany({
    where: {
      profileId: user.id,
    },
    include: {
      property: {
        select: {
          name: true,
          country: true,
        },
      },
    },
    orderBy: {
      checkIn: "desc",
    },
  });
  return bookings;
};

export const getUserName = async (prevState: unknown, formData: FormData) => {
  const userName = formData.get("userName")?.toString().trim();

  if (!userName) {
    return { message: "Username is required" };
  }

  // Simulate some processing
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { message: `Hello, ${userName}!` };
};

export const deleteBooking = async (
  prevState: { message: string; error: string }, // Add prevState parameter
  formData: FormData
) => {
  const user = await getAuthUser();

  const bookingId = formData.get("bookingId")?.toString();
  try {
    await prisma.booking.delete({
      where: {
        profileId: user.id,
        id: bookingId,
      },
    });
    // 100ms delay
    revalidatePath("/bookings");

    return { message: "Booking deleted successfully", error: "" };
  } catch {
    return {
      message: "",
      error: "Something went wrong , please contact support",
    };
  }
};

export const fetchRentalsbyUser = async () => {
  const user = await getAuthUser();

  const properties = await prisma.property.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      id: true,
      name: true,
      price: true,
      bookings: {
        select: {
          totalNights: true,
          orderTotal: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Add totalIncome and totalNights calculation for each property
  return properties.map((property) => {
    const totalNights = property.bookings.reduce(
      (sum, booking) => sum + booking.totalNights,
      0
    );

    const totalIncome = property.bookings.reduce(
      (sum, booking) => sum + booking.orderTotal,
      0
    );

    return {
      ...property,
      totalIncome,
      totalNights,
    };
  });
};

export const deleteRental = async (
  prevState: { message: string; error: string },
  formData: FormData
) => {
  const user = await getAuthUser();
  const rentalId = formData.get("rentalId") as string;
  try {
    await prisma.property.delete({
      where: {
        profileId: user.id,
        id: rentalId,
      },
    });
    revalidatePath("/rentals");
    return { message: "Rental deleted successfully", error: "" };
  } catch {
    return {
      message: "",
      error: "Something went wrong , please contact support",
    };
  }
};

export const edieetRental = async (
  prevState: { message: string; error: string; redirectUrl?: string },
  formData: FormData
) => {
  try {
    // console.log("Form Data:", formData);
    const rawData = Object.fromEntries(formData);
    const validatedFields = propertySchema.parse(rawData);
    const amenities = formData.getAll("amenities") as string[];
    const propertyId = formData.get("propertyId") as string;

    await prisma.property.update({
      where: {
        id: propertyId,
      },
      data: {
        ...validatedFields,
      },
    });

    const UpdateamenitiesArray = JSON.parse(amenities.join(","));
    const OrginalAmenities = await prisma.property.findFirst({
      where: {
        id: propertyId,
      },
      select: {
        amenities: true,
      },
    });
    const existingAmenities = JSON.parse(OrginalAmenities?.amenities ?? "[]");

    const isSame =
      existingAmenities.length === UpdateamenitiesArray.length &&
      existingAmenities.every((amenities: { name: string }) =>
        UpdateamenitiesArray.includes(String(amenities.name))
      );

    if (!isSame) {
      await prisma.property.update({
        where: {
          id: propertyId,
        },
        data: {
          amenities: JSON.stringify(UpdateamenitiesArray),
        },
      });
    }
    revalidatePath("/rentals");
    return {
      message: "Rental updated successfully!",
      error: "",
    };
  } catch (error) {
    console.error("Error updating rental:", error);
    return {
      message: "",
      error: "Failed to update rental. Please try again.",
    };
  }
};

export const editRental = async (
  prevState: { message: string; error: string; redirectUrl?: string },
  formData: FormData
) => {
  try {
    // console.log("Form Data:", formData);
    const user = await getAuthUser();
    const rawData = Object.fromEntries(formData);
    const validatedFields = propertySchema.parse(rawData);
    const propertyId = formData.get("propertyId") as string;

    await prisma.property.update({
      where: {
        id: propertyId,
        profileId: user.id,
      },
      data: {
        ...validatedFields,
      },
    });

    revalidatePath("/rentals");
    return {
      message: "Rental updated successfully!",
      error: "",
    };
  } catch (error) {
    console.error("Error updating rental:", error);
    return {
      message: "",
      error: "Failed to update rental. Please try again.",
    };
  }
};

export const rentalImageUpload = async (formData: FormData) => {
  try {
    // return console.log(formData);

    const image = formData.get("image") as File;
    const propertyId = formData.get("propertyId") as string;
    const validatedFile = imageSchema.parse(image);
    const fullpath = await uploadImage(validatedFile);

    await prisma.property.update({
      where: {
        id: propertyId,
      },
      data: {
        image: fullpath,
      },
    });
    revalidatePath("/rentals");
  } catch (err) {
    if (err instanceof z.ZodError) {
      const errorMessages = err.errors.map((item) => item.message);
      return { error: errorMessages };
    }
    return { error: "Something went wrong , please contact support" };
  }
};

export const fetchStats = async () => {
  const userCount = await prisma.profile.count();
  const propertiesCount = await prisma.property.count();
  const bookingsCount = await prisma.booking.count();

  return { userCount, propertiesCount, bookingsCount };
};

export const fetchChartData = async () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 6);
  const sixMonthsAgo = date;

  const bookings = prisma.booking.findMany({
    where: {
      createdAt: {
        gte: sixMonthsAgo,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const bookingPerMonth = (await bookings).reduce((total, currentvalue) => {
    const date = formatDate(currentvalue.createdAt, true);
    const existingEntry = total.find((entry) => entry.date === date);
    if (existingEntry) {
      existingEntry.count += 1;
    } else {
      total.push({ date, count: 1 });
    }

    return total;
  }, [] as Array<{ date: string; count: number }>);

  return bookingPerMonth;
};

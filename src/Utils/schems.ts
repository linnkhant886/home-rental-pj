import * as z from "zod";
const MAX_FILE_SIZE = 50 * 1024 * 1024; 

export const profileSchema = z.object({
  // firstName: z.string().max(5, { message: 'max length is 5' }),
  firstName: z.string().min(2, { message: "min length of first name 2" }),
  lastName: z.string().min(2, { message: "min length of last name is 2" }),
  userName: z.string().min(2, { message: "min length of user name is 2" }),
});

export const propertySchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "name must be at least 2 characters.",
    })
    .max(100, {
      message: "name must be less than 100 characters.",
    }),
  tagline: z
    .string()
    .min(2, {
      message: "tagline must be at least 2 characters.",
    })
    .max(100, {
      message: "tagline must be less than 100 characters.",
    }),
  price: z.coerce.number().int().min(0, {
    message: "price must be a positive number.",
  }),
  category: z.string(),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(" ").length;
      return wordCount >= 10 && wordCount <= 1000;
    },
    {
      message: "description must be between 10 and 1000 words.",
    }
  ),
  country: z.string(),
  guests: z.coerce.number().int().min(0, {
    message: "guest amount must be a positive number.",
  }),
  bedrooms: z.coerce.number().int().min(0, {
    message: "bedrooms amount must be a positive number.",
  }),
  beds: z.coerce.number().int().min(0, {
    message: "beds amount must be a positive number.",
  }),
  baths: z.coerce.number().int().min(0, {
    message: "bahts amount must be a positive number.",
  }),
  amenities: z.string(),
});

export const imageSchema = z
  .instanceof(File) // Ensure it's a File instance
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: "File size must be under 50MB.",
  })
  .refine((file) => file.type.startsWith("image/"), {
    message: "Only image files are allowed.",
  });



export const reviewSchema = z.object({
  propertyId: z.string(),
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().min(10).max(1000),
});


export const bookingSchema = z.object({
  checkIn: z.string(),
  checkOut: z.string(),
  propertyId: z.string(),
  orderTotal: z.coerce.number().int().min(0),
  totalNights: z.coerce.number().int().min(1),
})
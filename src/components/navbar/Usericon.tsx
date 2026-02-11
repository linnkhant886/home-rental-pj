import prisma from "@/Utils/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { LuUser } from "react-icons/lu";

export default async function Usericon() {
  const user = await currentUser();
  if (!user) return null;

  let profileImage: { profileImage: string } | null = null;
  try {
    profileImage = await prisma.profile.findUnique({
      where: { clerkId: user.id },
      select: { profileImage: true },
    });
  } catch (error) {
    console.error("Usericon profile query failed:", error);
  }

  if (profileImage?.profileImage)
    return (
      // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
      <img
        src={profileImage?.profileImage}
        className="h-6 w-6 rounded-full object-cover"
      />
    );
  return (
    <>
      <LuUser className="h-6 w-6 " />
    </>
  );
}

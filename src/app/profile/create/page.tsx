import { currentUser } from "@clerk/nextjs/server";
import CreateForm from "./CreateForm";
import { redirect } from "next/navigation";
import prisma from "@/Utils/prisma";

export default async function CreateProfile() {
  const user = await currentUser();

  if (!user) redirect("/");

  const profile = await prisma.profile.findUnique({
    where: { clerkId: user.id },
    select: { id: true },
  });

  if (profile) redirect("/");

  return <CreateForm />;
}

import { currentUser } from "@clerk/nextjs/server";
import CreateForm from "./CreateForm";
import { redirect } from "next/navigation";

export default async function CreateProfile() {
  const user = await currentUser();
  if (user?.privateMetadata?.hasProfile) redirect("/");
  return <CreateForm />;
}

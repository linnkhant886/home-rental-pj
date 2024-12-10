import { fetchProfile } from "@/Utils/actions";
import UpdateForm from "./UpdateForm";

export default async function profile() {
  const userProfile = await fetchProfile();
  return <UpdateForm userProfile={userProfile} />;
}

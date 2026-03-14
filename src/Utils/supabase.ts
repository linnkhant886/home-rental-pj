import { createClient } from "@supabase/supabase-js";

const bucket = "temp-home-away";
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_KEY in environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export const uploadImage = async (image: File) => {
  const timeStamp = Date.now();
  const newName = `${timeStamp}-${image.name}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(newName, image, { cacheControl: "3600", upsert: false });

  if (error) {
    throw new Error(`Supabase upload failed: ${error.message}`);
  }

  if (!data) {
    throw new Error("Supabase upload failed: no data returned");
  }

  const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(data.path);

  if (!publicUrlData?.publicUrl) {
    throw new Error("Supabase upload failed: unable to generate public URL");
  }

  return publicUrlData.publicUrl;
};

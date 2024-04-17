import supabase, { supabaseUrl } from "./supabase";

// https://rththeyfwdxqcojnywul.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

async function createCabin(cabin) {
  // if image is a string, it means user is duplicating an already existing
  // cabin, because in supabase database image is just a string, otherwise
  // it should be a file (which is an object probably) from a file list
  const isDuplicating = typeof cabin.image === "string";
  const imageName = `${Math.random()}-${cabin.image?.name}`.replaceAll("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. create cabin (provide image path to supabase table)
  const { data, error: cabinCreationError } = await supabase
    .from("cabins")
    .insert([{ ...cabin, image: isDuplicating ? cabin.image : imagePath }])
    .select()
    .single();

  if (cabinCreationError) {
    console.error(
      "Database Error: Failed to Create Cabin:",
      cabinCreationError
    );
    throw new Error("Failed to Create Cabin.");
  }

  // if the user is duplicating the cabin, it means there's no need to upload
  // a new image, so that data are immediately returned to preemptively
  // terminate the execution of the function
  if (isDuplicating) return data;

  // 2. upload image (file) to supabase storage bucket if creation is successful
  const { error: imageUploadError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabin.image, {
      cacheControl: "3600",
      upsert: false,
    });

  if (imageUploadError) {
    // because a cabin without an image doesn't provide sufficient information
    // about the cabin so that after imageUploadError occurs, it's deleted
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error("Database Error: Failed to Upload Image:", imageUploadError);
    throw new Error("Failed to Upload Image and Create Cabin.");
  }
  return data;
}

async function readCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error("Database Error: Failed to Fetch Cabins:", error);
    throw new Error("Failed to Fetch Cabins.");
  }

  return data;
}

async function updateCabin(cabin) {
  const isOldImage = cabin.image?.startsWith(supabaseUrl);
  const imageName = `${Math.random()}-${cabin.image?.name}`.replaceAll("/", "");
  const imagePath = isOldImage
    ? cabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .update({ ...cabin, image: imagePath })
    .eq("id", cabin.id)
    .select()
    .single();

  if (error) {
    console.error("Database Error: Failed to Update Cabin:", error);
    throw new Error("Failed to Update Cabin.");
  }

  // if it is old image, it means no need to upload a new image file
  // so that here inverts isOldImage value, when isOldImage is true or
  // undefined, do not upload image file to supabase storage buckect
  if (!isOldImage) {
    // 2. upload image (file) to supabase storage bucket if update is successful and the user uploads a new image
    const { error: imageUploadError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, cabin.image, {
        cacheControl: "3600",
        upsert: false,
      });

    if (imageUploadError) {
      console.error(
        "Database Error: Failed to Upload Image:",
        imageUploadError
      );
      throw new Error("Failed to Upload Image and Create Cabin.");
    }
  }

  return data;
}

async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error("Database Error: Failed to Delete Cabin:", error);
    throw new Error("Failed to Delete Cabin.");
  }
}

export { createCabin, readCabins, updateCabin, deleteCabin };

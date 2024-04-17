import supabase from "./supabase";

export async function readSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error("Database Error: Failed to Fetch Settings:", error);
    throw new Error("Failed to Fecth Settings.");
  }

  return data;
}

export async function updateSetting(setting) {
  // in supbase database settings table, there's just one setting with an id
  // of 1
  const onlyOneSettingId = 1;

  const { data, error } = await supabase
    .from("settings")
    .update(setting)
    .eq("id", onlyOneSettingId)
    .single();

  if (error) {
    console.error("Database Error: Failed to Update Settings", error);
    throw new Error("Failed to Update Settings");
  }

  return data;
}

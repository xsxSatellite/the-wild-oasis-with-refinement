import supabase, { supabaseUrl } from "./supabase";

async function createUser({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    console.error("Database Error: Failed to Create User:", error);
    throw new Error("Failed to Create User.");
  }

  return data;
}

async function readCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Database Error: Failed to Fetch User:", error);
    throw new Error("Failed to Fetch User.");
  }

  return data?.user;
}

async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. update password OR fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error: firstUpdateError } = await supabase.auth.updateUser(
    updateData
  );

  if (firstUpdateError) {
    console.error(
      "Database Error: Failed to Update User Account (First Round):",
      firstUpdateError
    );
    throw new Error("Failed to Update User Account (First Round).");
  }

  if (!avatar) return data;

  // 2. upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) {
    console.error("Database Error: Failed to Upload Avatar:", storageError);
    throw new Error("Failed to Upload Avatar.");
  }

  // 3. update avatar in the user
  const { data: userWithAvatar, error: secondUpdateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (secondUpdateError) {
    console.error(
      "Database Error: Failed to Update Account (Second Round):",
      secondUpdateError
    );
    throw new Error("Failed to Update Account (Second Round).");
  }

  return userWithAvatar;
}

async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Database Error: Failed to Log In User:", error);
    throw new Error("Failed to Log In user.");
  }

  return data;
}

async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Database Error: Failted to Log Out User:", error);
    throw new Error("Failed to Log Out User.");
  }
}

export { login, logout, createUser, readCurrentUser, updateCurrentUser };

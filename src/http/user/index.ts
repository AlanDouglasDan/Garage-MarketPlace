import { LoginData, SignupData } from "store/user/types";

import { supabase } from "core/supabase";

export const signUp = async (data: SignupData): Promise<any> => {
  const { fullName, email, phone, password } = data;

  // Sign up a user (with email/password) and create a profile
  const { data: user, error: authError } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (authError) {
    throw new Error(authError.message);
  }

  // After the user signs up, insert their profile into 'profiles' table
  const { error: profileError } = await supabase.from("profiles").insert([
    {
      id: user?.user?.id, // This ties the profile to the user
      full_name: fullName,
      email,
      phone,
      avatar_url: "", // Default value, can be updated later
      is_host: true, // Optional, set the default role
    },
  ]);

  if (profileError) {
    throw new Error(profileError.message);
  }

  return user;
};

export const logIn = async (data: LoginData): Promise<any> => {
  const { email, password } = data;

  const { data: user, error: authError } =
    await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

  if (authError) {
    throw new Error(authError.message);
  }

  return user;
};

export const getUser = async (): Promise<any> => {
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userData && userData.user) {
    // Fetch the profile from the profiles table using user_id
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select()
      .eq("id", userData.user.id) // Match profile with user_id
      .single(); // Expecting a single record (user profile)

    if (profileError) {
      throw new Error(profileError.message);
    } else {
      return profile;
    }
  }

  if (userError) {
    throw new Error(userError.message);
  }
};

export const updateUser = async (data: any): Promise<any> => {
  const { data: user, error } = await supabase.from("profiles").upsert([data]);

  if (error) {
    throw new Error(error.message);
  }

  return user;
};

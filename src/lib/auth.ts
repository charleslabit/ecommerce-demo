"use server";
import { signIn, signOut } from "@/auth";

export const login = async (provider: string) => {
  await signIn(provider, { redirectTo: "/" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};

//  Handle Guest Login (No Authentication)
export const guestLogin = async () => {
  return {
    user: {
      name: "Guest User",
      email: "guest@example.com",
    },
  };
};

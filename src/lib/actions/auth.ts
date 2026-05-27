"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function loginAction(prevState: any, formData: FormData) {
  try {
    const credentials = Object.fromEntries(formData);
    await signIn("credentials", {
      ...credentials,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." };
        default:
          return { error: "Something went wrong." };
      }
    }
    throw error;
  }
}

import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export async function registerAction(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const affiliation = formData.get("affiliation") as string;

  if (!name || !email || !password || !affiliation) {
    return { error: "All fields are required." };
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existingUser) {
    return { error: "User already exists with this email." };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const id = `user_${uuidv4()}`;

  await db.insert(users).values({
    id,
    name,
    email,
    passwordHash,
    role: "viewer", // Default role
    affiliation: affiliation as any,
  });

  return { success: true };
}

export async function logoutAction() {
  await signOut({ redirectTo: "/login" });
}

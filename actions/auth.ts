"use server";

import { signIn } from "@/auth";
import { createUser, CreateUserType, LoginUserType } from "@/data/auth";
import { AuthError } from "next-auth";

export async function createUserAction(data: CreateUserType) {
  const response = await createUser(data);
  return response;
}

export async function loginUserAction(data: LoginUserType) {
  try {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    return { success: "Login successful" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
      }
    }

    return { error: "Something went wrong" };
  }
}

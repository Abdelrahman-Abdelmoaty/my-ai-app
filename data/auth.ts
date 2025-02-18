import prisma from "@/lib/prisma";
import { compare, hash } from "bcryptjs";
import * as z from "zod";

const CreateUserSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters long"),
  name: z
    .string()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters long")
    .max(100, "Name must be less than 100 characters"),
});

export type CreateUserType = z.infer<typeof CreateUserSchema>;

export async function createUser({ email, password, name }: CreateUserType) {
  try {
    // validate the data
    const validatedFields = CreateUserSchema.safeParse({ email, password, name });
    if (!validatedFields.success) {
      return { error: "Invalid fields", errors: validatedFields.error.flatten().fieldErrors };
    }

    // check if user already exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      return { error: "User already exists" };
    }

    // hash the password
    const hashedPassword = await hash(password, 12);

    // create the user
    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    return {
      success: "User created successfully",
      user: newUser,
    };
  } catch (error) {
    console.error(error);
    return { error: "Internal server error" };
  }
}

const LoginUserSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginUserType = z.infer<typeof LoginUserSchema>;

export async function loginUser({ email, password }: LoginUserType) {
  try {
    // validate the data
    const validatedFields = LoginUserSchema.safeParse({ email, password });
    if (!validatedFields.success) {
      return { error: "Invalid fields", errors: validatedFields.error.flatten().fieldErrors };
    }

    // check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { error: "User does not exist" };
    }

    // check if password is correct
    const passwordsMatch = await compare(password, user.password);
    if (!passwordsMatch) {
      return { error: "Invalid password" };
    }

    return {
      success: "Login successful",
      user,
    };
  } catch (error) {
    console.error(error);
    return { error: "Internal server error" };
  }
}

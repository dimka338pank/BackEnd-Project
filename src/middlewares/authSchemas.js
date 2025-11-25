import * as z from "zod";

const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PasswordLettersRegex = /[a-zA-Z]/;

export const RegistrationUserSchema = z.object({
    email: z.string()
        .trim()
        .min(1, "Email is required")
        .regex(EmailRegex, { message: "Invalid email" }),

    name: z.string().trim().min(2, "Invalid username: minimum 2 characters"),

  password: z.string()
        .min(8, "Invalid password: minimum 8 characters")
        .regex(PasswordLettersRegex, "Invalid password: must include letters"),
});

export const LoginUserSchema = z.object({
	email: z.string()
        .trim()
        .min(1, "Email is required")
        .regex(EmailRegex, { message: "Invalid email" }),
	  password: z.string()
        .min(8, "Invalid password: minimum 8 characters")
        .regex(PasswordLettersRegex, "Invalid password: must include letters"),
});
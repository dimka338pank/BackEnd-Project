import * as z from "zod";
const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
const PasswordLettersRegex = /[a-zA-Z]/;

export const UpdateProfileSchema = z.object({
    username: z.string({ required_error: "Name is required"})
    .trim()
    .min(2, "Invalid username: minimum 2 characters"),

    email: z.string()
        .trim()
        .regex(EmailRegex, { message: "Invalid email" })
        .optional(), 
    
    password: z.string()
        .min(8, "Invalid password: minimum 8 characters")
        .regex(PasswordLettersRegex, "Invalid password: must include letters")
        .optional(), 
});
export const CreateTaskSchema = z.object({
    title: z.string()
    .min(2, "Invalid title: minimum 2 characters"),
    description: z.string()
    .optional(),
});
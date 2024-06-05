import * as z from "zod";

export const SignupSchema = z.object({
    username: z.string().min(2).max(15).trim(),
    email: z.string().email(),
    password: z.string().min(8).max(30)
})

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3).max(30)
})
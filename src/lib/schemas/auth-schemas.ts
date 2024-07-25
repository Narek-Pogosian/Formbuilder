import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(1, "Password is required").trim(),
});

export const registerSchema = signInSchema
  .extend({
    firstName: z.string().min(2, { message: "First name is required" }),
    lastName: z.string().min(2, { message: "Last name is required" }),
    confirmPassword: z
      .string()
      .min(2, { message: "Confirm password is required" }),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    { message: "Passwords don't match" },
  );

export type SignInSchemaType = z.infer<typeof signInSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;

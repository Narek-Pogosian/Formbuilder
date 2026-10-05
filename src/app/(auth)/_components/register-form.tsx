"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/server/auth/client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import z from "zod";

export const registerSchema = z
  .object({
    email: z.email().trim(),
    password: z.string().trim().min(6, { error: "Password needs to be atleast 6 characters long" }),
    name: z.string().trim().min(1, { error: "Name is required" }),
    confirmPassword: z
      .string()
      .trim()
      .min(6, { error: "Password needs to be at least 6 characters long" }),
  })
  .refine((vals) => vals.password === vals.confirmPassword, {
    error: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    shouldUnregister: true,
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof registerSchema>) {
    if (isLoading) return;

    setIsLoading(true);
    setError("");

    await authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          location.replace("/");
          setIsLoading(false);
        },
        onError: (ctx) => {
          setError(ctx.error.message || ctx.error.statusText);
          setIsLoading(false);
        },
      }
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="name">Full name</FieldLabel>

            <Input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="John Doe"
              required
              {...field}
              aria-invalid={fieldState.invalid}
            />

            {fieldState.invalid && <FieldError error={fieldState.error?.message} />}
          </Field>
        )}
      />

      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="email">Email address</FieldLabel>

            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
              required
              {...field}
              aria-invalid={fieldState.invalid}
            />

            {fieldState.invalid && <FieldError error={fieldState.error?.message} />}
          </Field>
        )}
      />

      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="password">Password</FieldLabel>

            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="Create a password"
              required
              {...field}
              aria-invalid={fieldState.invalid}
            />

            {fieldState.invalid && <FieldError error={fieldState.error?.message} />}
          </Field>
        )}
      />

      <Controller
        name="confirmPassword"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>

            <Input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Confirm your password"
              required
              {...field}
              aria-invalid={fieldState.invalid}
            />

            {fieldState.invalid && <FieldError error={fieldState.error?.message} />}
          </Field>
        )}
      />

      {error && (
        <Alert variant="danger">
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}

      <Button type="submit" className="w-full" aria-disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isLoading ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}

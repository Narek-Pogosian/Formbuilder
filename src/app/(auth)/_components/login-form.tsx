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

const loginSchema = z.object({
  email: z.email().trim(),
  password: z.string().trim().min(6, { error: "Password needs to be atleast 6 characters long" }),
});

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    if (isLoading) return;

    setIsLoading(true);
    setError("");

    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onError: (ctx) => {
          setError(ctx.error.message || ctx.error.statusText);
          setIsLoading(false);
        },
        onSuccess: () => {
          location.replace("/");
          setIsLoading(false);
        },
      }
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="email">Email address</FieldLabel>
            {/* <FieldDescription>
              Enter the email address associated with your account.
            </FieldDescription> */}
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
            {/* <FieldDescription> Enter your account password.</FieldDescription> */}

            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
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

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}

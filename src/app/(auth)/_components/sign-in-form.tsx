"use client";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  signInSchema,
  type SignInSchemaType,
} from "@/lib/schemas/auth-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

function SignInForm() {
  const router = useRouter();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isError, setIsError] = useState(false);

  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit() {
    if (isSigningIn) return;

    setIsSigningIn(true);
    setIsError(false);
    const res = await signIn("credentials", {
      email: form.getValues().email,
      password: form.getValues().password,
      redirect: false,
    });
    setIsSigningIn(false);

    if (res?.ok) {
      router.push("/");
      router.refresh();
    } else {
      setIsError(true);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} autoComplete="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="******" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isError && (
          <Alert>
            <AlertDescription>Something went wrong.</AlertDescription>
          </Alert>
        )}

        <Button type="submit" className="mt-2" aria-disabled={isSigningIn}>
          {isSigningIn ? "Loading..." : "Sign in"}
        </Button>

        <div className="text-center text-sm font-semibold">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline">
            Register here
          </Link>
        </div>
      </form>
    </Form>
  );
}

export default SignInForm;

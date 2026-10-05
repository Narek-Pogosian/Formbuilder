import Link from "next/link";
import RegisterForm from "../_components/register-form";

export default function RegisterPage() {
  return (
    <>
      <h1 className="mb-1 text-center text-3xl font-bold tracking-tight">Create your account</h1>
      <p className="mb-8 text-center text-sm text-muted-foreground">
        Create an account to get started and access all available features.
      </p>

      <RegisterForm />

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          replace
          className="text-primary-text underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </>
  );
}

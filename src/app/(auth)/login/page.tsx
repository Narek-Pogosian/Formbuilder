import Link from "next/link";
import LoginForm from "../_components/login-form";

export default function LoginPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to access your account and continue where you left off.
        </p>
      </div>

      <LoginForm />

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          replace
          className="text-primary-text underline-offset-4 hover:underline"
        >
          Create one
        </Link>
      </p>
    </>
  );
}

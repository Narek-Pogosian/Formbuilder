import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1 className="mb-4 text-4xl font-bold">Welcome to the Landing Page</h1>
      <p className="text-lg text-muted-foreground">
        This is the main landing page of our application.
      </p>

      <Link href="/login" className="mt-4 text-lg font-medium text-primary hover:underline">
        Go to Login
      </Link>
      <Link href="/register" className="mt-4 text-lg font-medium text-primary hover:underline">
        Go to Register
      </Link>

      <Link href="/editor" className="mt-4 text-lg font-medium text-primary hover:underline">
        Go to Editor
      </Link>
    </div>
  );
}

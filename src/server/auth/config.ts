import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth";
import { headers } from "next/headers";
import { cache } from "react";
import { db } from "@/server/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 6,
  },
  socialProviders: {},
});

export type Session = typeof auth.$Infer.Session;

export const getServerSession = cache(async () => {
  return await auth.api.getSession({ headers: await headers() });
});

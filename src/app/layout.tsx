import "@/globals.css";
import { Providers } from "@/components/providers";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Create, customize, and analyze surveys effortlessly with Insights.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

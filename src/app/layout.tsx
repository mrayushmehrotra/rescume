import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { TRPCProvider } from "@/components/providers/trpc-provider";
import "./globals.css";

const geist = localFont({
  src: [
    {
      path: "../../public/GeistMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/GeistMono-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "Rescume — AI-Powered Resume Tailoring",
  description:
    "Instantly rewrite and tailor your resume for any job description using AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${geist.variable} dark h-full antialiased`}
        suppressHydrationWarning
      >
        <head>
          <link rel="favicon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          />
        </head>
        <body
          className="min-h-full flex flex-col bg-background text-foreground tracking-tight"
          suppressHydrationWarning
        >
          <TRPCProvider>
            {children}
          </TRPCProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

import { auth } from "@/auth";
import { Layout } from "@/container/";
import { QueryProvider, ThemeProvider } from "@/providers";
import "@mantine/carousel/styles.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./global.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Charles Kenneth Labit",
  description: "Front End Developer",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/next.svg" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <QueryProvider>
          <ThemeProvider>
            <NuqsAdapter>
              <Layout session={session}>{children}</Layout>
            </NuqsAdapter>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

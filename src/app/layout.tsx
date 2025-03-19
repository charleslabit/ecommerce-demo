import { auth } from "@/auth";
import { Layout } from "@/container/";
import { QueryProvider, ThemeProvider } from "@/providers";
import "@mantine/carousel/styles.css";
import "@mantine/core/styles.css";
import "@mantine/core/styles.layer.css";
import "@mantine/dropzone/styles.css";
import "@mantine/notifications/styles.css";
import "mantine-datatable/styles.layer.css";
import "./layout.css";

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
  title: "CK Mart",
  description:
    "CK Mart is an online store offering a wide range of high-quality products. Discover the best deals and shop easily on this e-commerce platform.",
  keywords: [
    "e-commerce",
    "buy products online",
    "online shopping",
    "front-end developer portfolio",
    "React e-commerce",
    "Next.js e-commerce demo",
    "buy electronics",
    "home decor",
    "fashion items",
    "shopping cart",
    "web development portfolio",
    "mantine ui e-commerce",
  ],
  authors: [
    {
      name: "Charles Labit",
      url: "https://charleslabit-portfolio.vercel.app/",
    },
  ],
  metadataBase: new URL("https://ecommerce-demo-orpin.vercel.app/"),

  openGraph: {
    title: "CK Mart | E-Commerce Store for Quality Products",
    description:
      "Shop the latest and greatest products on CK Mart, your one-stop online store for electronics, fashion, and more. Fast, reliable, and secure.",
    url: "https://charleslabit-portfolio.vercel.app/",
    siteName: "CK Mart",
    images: [
      {
        url: "https://charleslabit-portfolio.vercel.app/default/ck-profile.png",
        width: 1200,
        height: 630,
        alt: "Charles Kenneth Labit Cover",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CK Mart | Shop Quality Products Online",
    description:
      "Find the best deals on electronics, fashion, and home goods at CK Mart. Start shopping now for top-notch products delivered to your door.",
    images: [
      "https://charleslabit-portfolio.vercel.app/default/ck-profile.png",
    ],
  },

  // Robots Meta Tag (Controls indexing behavior)
  robots: {
    index: true, // Allow search engines to index
    follow: true, // Allow following links
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  console.log("sess", session);
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

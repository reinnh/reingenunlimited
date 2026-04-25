import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Reingen | Premium Web Engineering & Digital Infrastructure",
    template: "%s | Reingen",
  },
  description: "We build scalable, high-performance web systems, e-commerce platforms, and digital infrastructure for modern businesses.",
  keywords: ["Web Engineering", "Next.js", "React", "Digital Infrastructure", "E-commerce Development", "Software Agency", "Reingen"],
  authors: [{ name: "Reingen Limited" }],
  creator: "Reingen Limited",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://reingen.xyz",
    siteName: "Reingen",
    title: "Reingen | Premium Web Engineering",
    description: "Building scalable, high-performance web systems and digital infrastructure.",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Reingen Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reingen | Premium Web Engineering",
    description: "Building scalable, high-performance web systems and digital infrastructure.",
    images: ["/logo.jpg"],
  },
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  manifest: "/site.webmanifest",
};

import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased no-scrollbar`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster theme="dark" richColors position="top-right" />
      </body>
    </html>
  );
}

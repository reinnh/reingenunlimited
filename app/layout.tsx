import type { Metadata, Viewport } from "next";
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
  metadataBase: new URL("https://reingen.xyz"),
  title: {
    default: "Reingen | Premium Web Engineering & Digital Infrastructure",
    template: "%s | Reingen",
  },
  description: "We architect the future of the web. Reingen engineers scalable, high-performance web systems, bespoke e-commerce platforms, and resilient digital infrastructure for modern businesses.",
  applicationName: "Reingen Limited",
  keywords: [
    "Web Engineering",
    "Next.js",
    "React",
    "Digital Infrastructure",
    "E-commerce Development",
    "Software Agency",
    "Reingen",
    "Custom Web Applications",
    "Enterprise Software",
    "UI/UX Design",
    "Full-Stack Development",
    "High-Performance Web Systems"
  ],
  authors: [{ name: "Reingen Limited", url: "https://reingen.xyz" }],
  creator: "Reingen Limited",
  publisher: "Reingen Limited",
  generator: "Next.js",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://reingen.xyz",
    siteName: "Reingen",
    title: "Reingen | Premium Web Engineering & Digital Infrastructure",
    description: "Building scalable, high-performance web systems, robust e-commerce platforms, and digital infrastructure for forward-thinking brands.",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Reingen - Premium Web Engineering",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@reingen",
    creator: "@reingen",
    title: "Reingen | Premium Web Engineering",
    description: "Building scalable, high-performance web systems and robust digital infrastructure.",
    images: {
      url: "/logo.jpg",
      alt: "Reingen Logo",
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon-precomposed.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  category: "technology",
  classification: "Web Development Agency",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#050816" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  colorScheme: "dark light",
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

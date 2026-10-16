import type { Metadata, Viewport } from "next";
import { Syne, DM_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import { SITE_URL, SITE_NAME, LOCALE_BCP47, LOCALE_OG, SOCIAL, abs } from "@/lib/site";

const syne = Syne({
  variable: "--syne-var",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const dmMono = DM_Mono({
  variable: "--dm-mono-var",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const dmSans = DM_Sans({
  variable: "--dm-sans-var",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#F8F7F3",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: SITE_NAME + " | Full-Stack Developer in Gujarat, India",
    template: "%s | " + SITE_NAME,
  },
  description: "Nitrajsinh Solanki — full-stack developer in Gujarat, India. Next.js, React, .NET, Angular, Flutter. Hackathon prize winner with live client projects.",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  formatDetection: { email: false, address: false, telephone: false },
  // Declare the brand favicon explicitly so browsers have a stable root icon
  // reference, including when a visitor opens the resume PDF directly.
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon", sizes: "any" }],
    shortcut: [{ url: "/favicon.ico", type: "image/x-icon" }],
  },
  openGraph: {
    type: "profile",
    firstName: "Nitrajsinh",
    lastName: "Solanki",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: LOCALE_OG,
    title: SITE_NAME + " | Full-Stack Developer in Gujarat, India",
    description: "Full-stack developer in Gujarat, India: Next.js, React, .NET, Angular, Flutter.",
    images: [{ url: abs("/opengraph-image"), width: 1200, height: 630, alt: SITE_NAME + ", full-stack developer" }],
  },
  twitter: {
    card: "summary_large_image",
    creator: SOCIAL.xHandle,
    title: SITE_NAME + " | Full-Stack Developer",
    description: "Full-stack developer in Gujarat, India.",
    images: [abs("/opengraph-image")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang={LOCALE_BCP47}
      className={`${syne.variable} ${dmMono.variable} ${dmSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[#F8F7F3] text-[#17191D] antialiased">
        {children}
      </body>
    </html>
  );
}
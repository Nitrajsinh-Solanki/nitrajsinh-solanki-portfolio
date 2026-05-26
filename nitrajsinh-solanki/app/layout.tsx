import type { Metadata } from "next";
import { Syne, DM_Mono, DM_Sans } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Nitrajsinh Solanki — Full-Stack Developer",
  description:
    "Software Engineer Intern at VeloxCore. MERN Stack & Full-Stack Developer based in Gujarat, India.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmMono.variable} ${dmSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[#070B14] text-[#E2DDD5] antialiased">
        {children}
      </body>
    </html>
  );
}
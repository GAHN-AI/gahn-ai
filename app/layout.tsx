import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import SitePresence from "@/components/SitePresence";
import "./globals.css";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GAHN AI",
  description:
    "Explore GAHN AI's five Learning Worlds and planned curricula for digital careers, school subjects, study skills, and books. Join early access while the learning platform is in development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-[16px] leading-[1.5]">
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SitePresence />
        {children}
      </body>
    </html>
  );
}

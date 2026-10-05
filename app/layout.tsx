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
    "Private AI learning for careers, school, skills, books, and almost any topic, with clear step by step teaching in your preferred language.",
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
        <SitePresence />
        {children}
      </body>
    </html>
  );
}

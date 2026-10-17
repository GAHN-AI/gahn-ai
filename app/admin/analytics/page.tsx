import type { Metadata } from "next";
import { getAuthenticatedUser } from "@/lib/serverAuth";
import { notFound, redirect } from "next/navigation";
import LiveAnalyticsDashboard from "@/components/LiveAnalyticsDashboard";

export const metadata: Metadata = {
  title: "Live Analytics | GAHN AI",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminAnalyticsPage() {
  const { user, error: sessionError } = await getAuthenticatedUser();

  if (sessionError || !user) {
    redirect("/login");
  }

  const adminEmails = (process.env.ADMIN_EMAIL ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  if (!user.email || !adminEmails.includes(user.email.toLowerCase())) {
    notFound();
  }

  return <LiveAnalyticsDashboard />;
}

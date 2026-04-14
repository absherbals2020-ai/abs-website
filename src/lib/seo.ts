import type { Metadata } from "next";

export function buildMetadata(title: string, description: string, path = "/"): Metadata {
  const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return {
    title,
    description,
    alternates: { canonical: `${base}${path}` },
    openGraph: {
      title,
      description,
      url: `${base}${path}`,
      siteName: "ABS Herbals",
      type: "website",
    },
  };
}

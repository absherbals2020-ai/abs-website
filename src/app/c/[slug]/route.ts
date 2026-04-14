import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const link = await prisma.campaignLink.findUnique({ where: { slug } });
  if (!link) return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"));

  const url = new URL(link.targetPath, process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000");
  url.searchParams.set("utm_source", link.source);
  url.searchParams.set("utm_medium", link.medium);
  url.searchParams.set("utm_campaign", link.campaign);
  if (link.couponCode) url.searchParams.set("coupon", link.couponCode);
  return NextResponse.redirect(url);
}

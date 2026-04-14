import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const [products, categories] = await Promise.all([
    prisma.product.findMany({ select: { slug: true, updatedAt: true }, where: { isActive: true } }),
    prisma.category.findMany({ select: { slug: true, updatedAt: true }, where: { isActive: true } }),
  ]);

  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/shop`, lastModified: new Date() },
    ...products.map((p) => ({ url: `${base}/product/${p.slug}`, lastModified: p.updatedAt })),
    ...categories.map((c) => ({ url: `${base}/category/${c.slug}`, lastModified: c.updatedAt })),
  ];
}

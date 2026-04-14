import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function StoreLayout({ children }: { children: React.ReactNode }) {
  const [setting, categories, announcement, popup] = await Promise.all([
    prisma.siteSetting.findUnique({ where: { id: "site" } }),
    prisma.category.findMany({ where: { isActive: true }, take: 8 }),
    prisma.announcementBar.findFirst({ where: { enabled: true }, orderBy: { createdAt: "desc" } }),
    prisma.popupBanner.findFirst({ where: { enabled: true }, orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <>
      {announcement && <div className="bg-green-800 py-2 text-center text-xs text-white">{announcement.message}</div>}
      <header className="border-b border-green-200 bg-white">
        <div className="container-app flex items-center justify-between py-4">
          <Link href="/" className="text-xl font-bold text-green-800">{setting?.brandName || "ABS Herbals"}</Link>
          <nav className="flex gap-4 text-sm">
            <Link href="/shop">Shop All</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/admin">Admin</Link>
          </nav>
        </div>
        <div className="container-app flex flex-wrap gap-2 pb-3 text-xs">
          {categories.map((c) => (
            <Link key={c.id} href={`/category/${c.slug}`} className="rounded-full bg-green-100 px-3 py-1">{c.name}</Link>
          ))}
        </div>
      </header>
      <main className="container-app py-6">{children}</main>
      {popup && (
        <div className="container-app mb-4">
          <div className="rounded-lg border border-green-200 bg-green-50 p-4">
            <p className="font-semibold">{popup.title}</p>
            <p className="text-sm">{popup.subtitle}</p>
            {popup.buttonLink && <Link className="text-sm text-green-700" href={popup.buttonLink}>{popup.buttonText || "View Offer"}</Link>}
          </div>
        </div>
      )}
      <footer className="mt-10 border-t border-green-200 bg-white">
        <div className="container-app py-6 text-sm">© {new Date().getFullYear()} ABS Herbals</div>
      </footer>
    </>
  );
}

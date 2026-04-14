import Link from "next/link";
import { adminLogout } from "./actions";

const links = [
  ["Dashboard", "/admin"],
  ["Homepage", "/admin/homepage"],
  ["Banners", "/admin/banners"],
  ["Announcements", "/admin/announcements"],
  ["Popups", "/admin/popups"],
  ["Offers", "/admin/offers"],
  ["Discounts", "/admin/discounts"],
  ["Coupons", "/admin/coupons"],
  ["Products", "/admin/products"],
  ["Categories", "/admin/categories"],
  ["Orders", "/admin/orders"],
  ["Settings", "/admin/settings"],
] as const;

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-app py-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">ABS Herbals Admin</h1>
        <form action={adminLogout}><button className="rounded border px-3 py-1 text-sm" type="submit">Logout</button></form>
      </div>
      <nav className="mb-6 flex flex-wrap gap-2">
        {links.map(([label, href]) => (
          <Link key={href} href={href} className="rounded bg-green-100 px-3 py-1 text-sm">{label}</Link>
        ))}
      </nav>
      {children}
    </div>
  );
}

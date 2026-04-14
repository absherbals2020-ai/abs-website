import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [products, orders, coupons, offers] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.coupon.count({ where: { isActive: true } }),
    prisma.offerCampaign.count({ where: { isActive: true } }),
  ]);

  return (
    <section className="grid gap-4 md:grid-cols-4">
      <div className="card"><p className="text-sm">Products</p><p className="text-2xl font-bold">{products}</p></div>
      <div className="card"><p className="text-sm">Orders</p><p className="text-2xl font-bold">{orders}</p></div>
      <div className="card"><p className="text-sm">Active Coupons</p><p className="text-2xl font-bold">{coupons}</p></div>
      <div className="card"><p className="text-sm">Active Offers</p><p className="text-2xl font-bold">{offers}</p></div>
    </section>
  );
}

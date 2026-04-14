import { prisma } from "@/lib/prisma";
import { saveCoupon } from "../actions";

export default async function AdminCouponsPage() {
  const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <section className="space-y-5">
      <div className="card space-y-2">
        <h2 className="text-xl font-bold">Coupons</h2>
        {coupons.map((coupon) => (
          <div key={coupon.id} className="rounded border p-2 text-sm">
            {coupon.code} - {coupon.discountType} {Number(coupon.discountValue)} - {coupon.isActive ? "Active" : "Inactive"}
          </div>
        ))}
      </div>
      <form action={saveCoupon} className="card grid gap-2 md:grid-cols-2">
        <input name="id" className="rounded border p-2" placeholder="Coupon ID (optional update)" />
        <input name="code" className="rounded border p-2" required placeholder="Coupon code" />
        <input name="discountType" className="rounded border p-2" placeholder="PERCENT/FLAT" />
        <input name="discountValue" type="number" className="rounded border p-2" placeholder="Value" />
        <input name="minOrderAmount" type="number" className="rounded border p-2" placeholder="Minimum order amount" />
        <input name="usageLimit" type="number" className="rounded border p-2" placeholder="Usage limit" />
        <input name="expiresAt" type="date" className="rounded border p-2" />
        <input name="campaignSource" className="rounded border p-2" placeholder="Campaign source" />
        <label className="flex items-center gap-2"><input name="isActive" type="checkbox" defaultChecked /> Active</label>
        <button className="btn-primary w-fit" type="submit">Save Coupon</button>
      </form>
    </section>
  );
}

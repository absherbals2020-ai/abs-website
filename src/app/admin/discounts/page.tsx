import { prisma } from "@/lib/prisma";
import { saveDiscount } from "../actions";

export default async function AdminDiscountPage() {
  const rules = await prisma.discountRule.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <section className="space-y-5">
      <div className="card space-y-2">
        <h2 className="text-xl font-bold">Discount Rules</h2>
        {rules.map((rule) => (
          <div key={rule.id} className="rounded border p-2 text-sm">
            {rule.name} - {rule.scope} - {rule.discountType} {Number(rule.discountValue)}
          </div>
        ))}
      </div>
      <form action={saveDiscount} className="card grid gap-2 md:grid-cols-2">
        <input name="id" className="rounded border p-2" placeholder="Rule ID (optional update)" />
        <input name="name" className="rounded border p-2" required placeholder="Rule Name" />
        <input name="scope" className="rounded border p-2" placeholder="PRODUCT/CART" />
        <input name="discountType" className="rounded border p-2" placeholder="PERCENT/FLAT" />
        <input name="discountValue" type="number" className="rounded border p-2" placeholder="Discount value" />
        <input name="minCartAmount" type="number" className="rounded border p-2" placeholder="Minimum cart amount" />
        <label className="flex items-center gap-2"><input name="isActive" type="checkbox" defaultChecked /> Active</label>
        <button className="btn-primary w-fit" type="submit">Save Rule</button>
      </form>
    </section>
  );
}

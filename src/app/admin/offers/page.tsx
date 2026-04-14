import { prisma } from "@/lib/prisma";
import { saveOffer } from "../actions";

export default async function AdminOffersPage() {
  const offers = await prisma.offerCampaign.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <section className="space-y-5">
      <div className="card space-y-2">
        <h2 className="text-xl font-bold">Offers</h2>
        {offers.map((offer) => (
          <div key={offer.id} className="rounded border p-2 text-sm">{offer.name} ({offer.type}) - {offer.isActive ? "Active" : "Inactive"}</div>
        ))}
      </div>
      <form action={saveOffer} className="card grid gap-2 md:grid-cols-2">
        <input name="id" className="rounded border p-2" placeholder="Offer ID (optional update)" />
        <input name="name" className="rounded border p-2" required placeholder="Offer Name" />
        <input name="type" className="rounded border p-2" placeholder="festival / limited-time / combo / shipping" />
        <input name="discount" type="number" className="rounded border p-2" placeholder="Discount value" />
        <textarea name="description" className="rounded border p-2 md:col-span-2" placeholder="Description" />
        <label className="flex items-center gap-2"><input name="isActive" type="checkbox" defaultChecked /> Active</label>
        <button className="btn-primary w-fit" type="submit">Save Offer</button>
      </form>
    </section>
  );
}

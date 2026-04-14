import { prisma } from "@/lib/prisma";
import { savePopupBanner } from "../actions";

export default async function AdminPopupPage() {
  const popups = await prisma.popupBanner.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <section className="space-y-4">
      <div className="card space-y-2">
        <h2 className="text-xl font-bold">Popup Banners</h2>
        {popups.map((popup) => (
          <div key={popup.id} className="rounded border p-2 text-sm">{popup.title} - {popup.enabled ? "Enabled" : "Disabled"}</div>
        ))}
      </div>
      <form action={savePopupBanner} className="card grid gap-2 md:grid-cols-2">
        <input name="id" className="rounded border p-2" placeholder="Popup ID (optional update)" />
        <input name="title" className="rounded border p-2" placeholder="Title" />
        <input name="subtitle" className="rounded border p-2" placeholder="Subtitle" />
        <input name="imageUrl" className="rounded border p-2 md:col-span-2" required placeholder="Image URL" />
        <input name="buttonText" className="rounded border p-2" placeholder="Button text" />
        <input name="buttonLink" className="rounded border p-2" placeholder="Button link" />
        <label className="flex items-center gap-2"><input name="enabled" type="checkbox" defaultChecked /> Enabled</label>
        <button className="btn-primary w-fit" type="submit">Save Popup</button>
      </form>
    </section>
  );
}

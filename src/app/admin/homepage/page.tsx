import { prisma } from "@/lib/prisma";
import { saveHomeSection } from "../actions";

export default async function AdminHomepagePage() {
  const sections = await prisma.homeSection.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <section className="space-y-5">
      <div className="card">
        <h2 className="text-xl font-bold">Homepage Blocks (Drag-and-drop alternative: sort order)</h2>
        <p className="text-sm">Change `sortOrder` to rearrange blocks. Toggle enable to show/hide.</p>
        <div className="mt-3 space-y-2">
          {sections.map((s) => (
            <div key={s.id} className="rounded border p-2 text-sm">
              <strong>{s.title || s.key}</strong> ({s.type}) - Enabled: {s.enabled ? "Yes" : "No"} - Order: {s.sortOrder}
            </div>
          ))}
        </div>
      </div>

      <form action={saveHomeSection} className="card grid gap-2 md:grid-cols-2">
        <h3 className="md:col-span-2 text-lg font-semibold">Add or Update Section</h3>
        <input name="id" className="rounded border p-2" placeholder="Section ID (optional for update)" />
        <input name="key" className="rounded border p-2" required placeholder="Unique key (e.g. trust-section)" />
        <input name="type" className="rounded border p-2" required placeholder="Type (hero/products/offers...)" />
        <input name="sortOrder" type="number" className="rounded border p-2" defaultValue={10} />
        <input name="title" className="rounded border p-2" placeholder="Title" />
        <input name="subtitle" className="rounded border p-2" placeholder="Subtitle" />
        <textarea name="payload" className="md:col-span-2 rounded border p-2" defaultValue={"{}"} />
        <label className="flex items-center gap-2"><input name="enabled" type="checkbox" defaultChecked /> Enabled</label>
        <button type="submit" className="btn-primary w-fit">Save Section</button>
      </form>
    </section>
  );
}

import { prisma } from "@/lib/prisma";
import { createBanner, updateBanner } from "../actions";

export default async function AdminBannersPage() {
  const banners = await prisma.banner.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <section className="space-y-5">
      <div className="card space-y-2">
        <h2 className="text-xl font-bold">Manage Banners</h2>
        {banners.map((b) => (
          <form key={b.id} action={updateBanner} className="rounded border p-3 text-sm grid gap-2 md:grid-cols-2">
            <input type="hidden" name="id" value={b.id} />
            <input name="placement" className="rounded border p-2" defaultValue={b.placement} />
            <input name="title" className="rounded border p-2" defaultValue={b.title || ""} />
            <input name="subtitle" className="rounded border p-2" defaultValue={b.subtitle || ""} />
            <input name="imageUrl" className="rounded border p-2 md:col-span-2" defaultValue={b.imageUrl} required />
            <input name="buttonText" className="rounded border p-2" defaultValue={b.buttonText || ""} />
            <input name="buttonLink" className="rounded border p-2" defaultValue={b.buttonLink || ""} />
            <label className="flex items-center gap-2">
              <input name="enabled" type="checkbox" defaultChecked={b.enabled} /> Enabled
            </label>
            <button type="submit" className="btn-primary w-fit">Update Banner</button>
          </form>
        ))}
      </div>

      <form action={createBanner} className="card grid gap-2 md:grid-cols-2">
        <h3 className="md:col-span-2 text-lg font-semibold">Create New Banner</h3>
        <input name="placement" className="rounded border p-2" placeholder="Placement (hero/promo/popup)" defaultValue="hero" />
        <input name="title" className="rounded border p-2" placeholder="Title" />
        <input name="subtitle" className="rounded border p-2" placeholder="Subtitle" />
        <input name="imageUrl" className="rounded border p-2 md:col-span-2" required placeholder="Image URL or uploaded path" />
        <input name="buttonText" className="rounded border p-2" placeholder="Button text" />
        <input name="buttonLink" className="rounded border p-2" placeholder="Button link" />
        <label className="flex items-center gap-2"><input name="enabled" type="checkbox" defaultChecked /> Enabled</label>
        <button type="submit" className="btn-primary w-fit">Create Banner</button>
      </form>
    </section>
  );
}

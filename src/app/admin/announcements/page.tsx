import { prisma } from "@/lib/prisma";
import { saveAnnouncement } from "../actions";

export default async function AdminAnnouncementPage() {
  const announcements = await prisma.announcementBar.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <section className="space-y-4">
      <div className="card space-y-2">
        <h2 className="text-xl font-bold">Announcement Bar</h2>
        {announcements.map((a) => (
          <div key={a.id} className="rounded border p-2 text-sm">{a.message} - {a.enabled ? "Enabled" : "Disabled"}</div>
        ))}
      </div>
      <form action={saveAnnouncement} className="card grid gap-2 md:grid-cols-2">
        <input name="id" className="rounded border p-2" placeholder="Announcement ID (optional update)" />
        <input name="message" required className="rounded border p-2 md:col-span-2" placeholder="Announcement message" />
        <input name="link" className="rounded border p-2 md:col-span-2" placeholder="Optional link" />
        <label className="flex items-center gap-2"><input name="enabled" type="checkbox" defaultChecked /> Enabled</label>
        <button className="btn-primary w-fit" type="submit">Save Announcement</button>
      </form>
    </section>
  );
}

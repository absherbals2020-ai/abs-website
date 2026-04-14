import { prisma } from "@/lib/prisma";
import { saveCampaignLink, saveSiteSettings } from "../actions";

export default async function AdminSettingsPage() {
  const [settings, links] = await Promise.all([
    prisma.siteSetting.findUnique({ where: { id: "site" } }),
    prisma.campaignLink.findMany({ orderBy: { createdAt: "desc" } }),
  ]);
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Site & Marketing Settings</h2>
      <form action={saveSiteSettings} className="card grid gap-2 md:grid-cols-2">
        <input name="brandName" className="rounded border p-2" defaultValue={settings?.brandName || "ABS Herbals"} placeholder="Brand name" />
        <input name="whatsappPhone" className="rounded border p-2" defaultValue={settings?.whatsappPhone || ""} placeholder="WhatsApp number" />
        <input name="facebookUrl" className="rounded border p-2" defaultValue={settings?.facebookUrl || ""} placeholder="Facebook URL" />
        <input name="instagramUrl" className="rounded border p-2" defaultValue={settings?.instagramUrl || ""} placeholder="Instagram URL" />
        <input name="youtubeUrl" className="rounded border p-2" defaultValue={settings?.youtubeUrl || ""} placeholder="YouTube URL" />
        <input name="mapsUrl" className="rounded border p-2" defaultValue={settings?.mapsUrl || ""} placeholder="Google Maps URL" />
        <input name="metaPixelId" className="rounded border p-2" defaultValue={settings?.metaPixelId || ""} placeholder="Meta Pixel ID" />
        <input name="gaMeasurement" className="rounded border p-2" defaultValue={settings?.gaMeasurement || ""} placeholder="Google Analytics ID" />
        <input name="gtmId" className="rounded border p-2" defaultValue={settings?.gtmId || ""} placeholder="Google Tag Manager ID" />
        <input name="supportEmail" type="email" className="rounded border p-2" defaultValue={settings?.supportEmail || ""} placeholder="Support email" />
        <button className="btn-primary w-fit" type="submit">Save Settings</button>
      </form>
      <div className="card space-y-2">
        <h3 className="text-lg font-semibold">Campaign Links</h3>
        {links.map((link) => (
          <div key={link.id} className="rounded border p-2 text-sm">
            /{link.slug} {"->"} {link.targetPath} ({link.source}/{link.campaign})
          </div>
        ))}
      </div>
      <form action={saveCampaignLink} className="card grid gap-2 md:grid-cols-2">
        <input name="id" className="rounded border p-2" placeholder="Campaign ID (optional update)" />
        <input name="name" className="rounded border p-2" placeholder="Campaign name" required />
        <input name="slug" className="rounded border p-2" placeholder="Short slug (for /c/slug)" required />
        <input name="source" className="rounded border p-2" placeholder="utm_source" required />
        <input name="medium" className="rounded border p-2" placeholder="utm_medium" required />
        <input name="campaign" className="rounded border p-2" placeholder="utm_campaign" required />
        <input name="targetPath" className="rounded border p-2" placeholder="/shop" required />
        <input name="couponCode" className="rounded border p-2" placeholder="Optional coupon code" />
        <button className="btn-primary w-fit" type="submit">Save Campaign Link</button>
      </form>
    </section>
  );
}

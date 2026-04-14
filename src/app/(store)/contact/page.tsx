export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";

export default async function ContactPage() {
  const settings = await prisma.siteSetting.findUnique({ where: { id: "site" } });
  return (
    <section className="card space-y-2">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <p>Email: {settings?.supportEmail || "support@absherbals.com"}</p>
      <p>WhatsApp: {settings?.whatsappPhone || "Update from admin settings"}</p>
    </section>
  );
}

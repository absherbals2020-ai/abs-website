"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function subscribeEmail(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  if (!email) return;
  await prisma.emailSubscriber.upsert({
    where: { email },
    update: {},
    create: { email },
  });
  revalidatePath("/");
}

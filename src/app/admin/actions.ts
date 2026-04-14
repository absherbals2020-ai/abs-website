"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { createAdminSession, clearAdminSession, verifyPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function adminLogin(formData: FormData) {
  const email = String(formData.get("email") || "").toLowerCase().trim();
  const password = String(formData.get("password") || "");
  const admin = await prisma.adminUser.findUnique({ where: { email } });

  if (!admin || !admin.isActive) throw new Error("Invalid login.");
  const ok = await verifyPassword(password, admin.passwordHash);
  if (!ok) throw new Error("Invalid login.");

  await createAdminSession({ sub: admin.id, email: admin.email, role: admin.role });
  redirect("/admin");
}

export async function adminLogout() {
  await clearAdminSession();
  redirect("/admin/login");
}

function getBannerPayload(formData: FormData) {
  return {
    placement: String(formData.get("placement") || "hero").trim(),
    title: String(formData.get("title") || "").trim(),
    subtitle: String(formData.get("subtitle") || "").trim(),
    imageUrl: String(formData.get("imageUrl") || "").trim(),
    buttonText: String(formData.get("buttonText") || "").trim(),
    buttonLink: String(formData.get("buttonLink") || "").trim(),
    enabled: formData.get("enabled") === "on",
  };
}

async function createBannerFromPayload(payload: ReturnType<typeof getBannerPayload>) {
  const lastBanner = await prisma.banner.findFirst({ orderBy: { sortOrder: "desc" } });
  const nextSortOrder = (lastBanner?.sortOrder || 0) + 1;
  await prisma.banner.create({ data: { ...payload, sortOrder: nextSortOrder } });
}

export async function createBanner(formData: FormData) {
  const payload = getBannerPayload(formData);
  await createBannerFromPayload(payload);
  revalidatePath("/");
  revalidatePath("/admin/banners");
  redirect("/admin/banners");
}

export async function updateBanner(formData: FormData) {
  const id = String(formData.get("id") || "").trim();
  const payload = getBannerPayload(formData);

  if (!id) {
    await createBannerFromPayload(payload);
    revalidatePath("/");
    revalidatePath("/admin/banners");
    redirect("/admin/banners");
  }

  const existingBanner = await prisma.banner.findUnique({ where: { id } });
  if (existingBanner) {
    await prisma.banner.update({ where: { id }, data: payload });
  } else {
    await createBannerFromPayload(payload);
  }

  revalidatePath("/");
  revalidatePath("/admin/banners");
  redirect("/admin/banners");
}

export async function saveCategory(formData: FormData) {
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "");
  const slug = slugify(String(formData.get("slug") || name), { lower: true, strict: true });
  const data = {
    name,
    slug,
    description: String(formData.get("description") || ""),
    imageUrl: String(formData.get("imageUrl") || ""),
    isFeatured: formData.get("isFeatured") === "on",
    isActive: formData.get("isActive") === "on",
  };

  if (id) await prisma.category.update({ where: { id }, data });
  else await prisma.category.create({ data });
  revalidatePath("/shop");
  revalidatePath("/admin/categories");
}

export async function saveProduct(formData: FormData) {
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "");
  const slug = slugify(String(formData.get("slug") || name), { lower: true, strict: true });
  const categoryId = String(formData.get("categoryId") || "");

  const data = {
    name,
    slug,
    shortDescription: String(formData.get("shortDescription") || ""),
    description: String(formData.get("description") || ""),
    benefits: String(formData.get("benefits") || ""),
    usageInstructions: String(formData.get("usageInstructions") || ""),
    ingredients: String(formData.get("ingredients") || ""),
    price: Number(formData.get("price") || 0),
    discountPrice: Number(formData.get("discountPrice") || 0) || null,
    stock: Number(formData.get("stock") || 0),
    categoryId,
    isFeatured: formData.get("isFeatured") === "on",
    isBestSeller: formData.get("isBestSeller") === "on",
    isNewArrival: formData.get("isNewArrival") === "on",
    isActive: formData.get("isActive") === "on",
    seoTitle: String(formData.get("seoTitle") || ""),
    seoDescription: String(formData.get("seoDescription") || ""),
  };

  if (id) await prisma.product.update({ where: { id }, data });
  else await prisma.product.create({ data });
  revalidatePath("/shop");
  revalidatePath("/admin/products");
}

export async function saveHomeSection(formData: FormData) {
  const id = String(formData.get("id") || "");
  const key = String(formData.get("key") || "");
  const data = {
    key,
    type: String(formData.get("type") || ""),
    title: String(formData.get("title") || ""),
    subtitle: String(formData.get("subtitle") || ""),
    enabled: formData.get("enabled") === "on",
    sortOrder: Number(formData.get("sortOrder") || 0),
    payload: JSON.parse(String(formData.get("payload") || "{}")),
  };

  if (id) await prisma.homeSection.update({ where: { id }, data });
  else await prisma.homeSection.create({ data });
  revalidatePath("/");
  revalidatePath("/admin/homepage");
}

export async function saveOffer(formData: FormData) {
  const id = String(formData.get("id") || "");
  const data = {
    name: String(formData.get("name") || ""),
    type: String(formData.get("type") || "festival"),
    description: String(formData.get("description") || ""),
    discount: Number(formData.get("discount") || 0) || null,
    isActive: formData.get("isActive") === "on",
  };
  if (id) await prisma.offerCampaign.update({ where: { id }, data });
  else await prisma.offerCampaign.create({ data });
  revalidatePath("/");
  revalidatePath("/admin/offers");
}

export async function saveDiscount(formData: FormData) {
  const id = String(formData.get("id") || "");
  const data = {
    name: String(formData.get("name") || ""),
    scope: String(formData.get("scope") || "PRODUCT"),
    discountType: String(formData.get("discountType") || "PERCENT"),
    discountValue: Number(formData.get("discountValue") || 0),
    minCartAmount: Number(formData.get("minCartAmount") || 0) || null,
    isActive: formData.get("isActive") === "on",
  };
  if (id) await prisma.discountRule.update({ where: { id }, data });
  else await prisma.discountRule.create({ data });
  revalidatePath("/admin/discounts");
}

export async function saveCoupon(formData: FormData) {
  const id = String(formData.get("id") || "");
  const data = {
    code: String(formData.get("code") || "").toUpperCase(),
    discountType: String(formData.get("discountType") || "PERCENT"),
    discountValue: Number(formData.get("discountValue") || 0),
    minOrderAmount: Number(formData.get("minOrderAmount") || 0) || null,
    usageLimit: Number(formData.get("usageLimit") || 0) || null,
    expiresAt: formData.get("expiresAt") ? new Date(String(formData.get("expiresAt"))) : null,
    isActive: formData.get("isActive") === "on",
    campaignSource: String(formData.get("campaignSource") || ""),
  };
  if (id) await prisma.coupon.update({ where: { id }, data });
  else await prisma.coupon.create({ data });
  revalidatePath("/");
  revalidatePath("/admin/coupons");
}

export async function updateOrderStatus(formData: FormData) {
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "PENDING");
  await prisma.order.update({ where: { id }, data: { status } });
  revalidatePath("/admin/orders");
}

export async function saveSiteSettings(formData: FormData) {
  await prisma.siteSetting.upsert({
    where: { id: "site" },
    update: {
      brandName: String(formData.get("brandName") || "ABS Herbals"),
      whatsappPhone: String(formData.get("whatsappPhone") || ""),
      facebookUrl: String(formData.get("facebookUrl") || ""),
      instagramUrl: String(formData.get("instagramUrl") || ""),
      youtubeUrl: String(formData.get("youtubeUrl") || ""),
      mapsUrl: String(formData.get("mapsUrl") || ""),
      metaPixelId: String(formData.get("metaPixelId") || ""),
      gaMeasurement: String(formData.get("gaMeasurement") || ""),
      gtmId: String(formData.get("gtmId") || ""),
      supportEmail: String(formData.get("supportEmail") || ""),
    },
    create: {
      id: "site",
      brandName: String(formData.get("brandName") || "ABS Herbals"),
    },
  });
  revalidatePath("/");
  revalidatePath("/admin/settings");
}

export async function saveAnnouncement(formData: FormData) {
  const id = String(formData.get("id") || "");
  const data = {
    message: String(formData.get("message") || ""),
    link: String(formData.get("link") || ""),
    enabled: formData.get("enabled") === "on",
  };
  if (id) await prisma.announcementBar.update({ where: { id }, data });
  else await prisma.announcementBar.create({ data });
  revalidatePath("/");
  revalidatePath("/admin/announcements");
}

export async function savePopupBanner(formData: FormData) {
  const id = String(formData.get("id") || "");
  const data = {
    title: String(formData.get("title") || ""),
    subtitle: String(formData.get("subtitle") || ""),
    imageUrl: String(formData.get("imageUrl") || ""),
    buttonText: String(formData.get("buttonText") || ""),
    buttonLink: String(formData.get("buttonLink") || ""),
    enabled: formData.get("enabled") === "on",
  };
  if (id) await prisma.popupBanner.update({ where: { id }, data });
  else await prisma.popupBanner.create({ data });
  revalidatePath("/");
  revalidatePath("/admin/popups");
}

export async function saveCampaignLink(formData: FormData) {
  const id = String(formData.get("id") || "");
  const data = {
    name: String(formData.get("name") || ""),
    slug: String(formData.get("slug") || ""),
    source: String(formData.get("source") || ""),
    medium: String(formData.get("medium") || ""),
    campaign: String(formData.get("campaign") || ""),
    targetPath: String(formData.get("targetPath") || "/"),
    couponCode: String(formData.get("couponCode") || "") || null,
  };
  if (id) await prisma.campaignLink.update({ where: { id }, data });
  else await prisma.campaignLink.create({ data });
  revalidatePath("/admin/settings");
}

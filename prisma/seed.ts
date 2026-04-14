import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Admin@123", 10);

  await prisma.adminUser.upsert({
    where: { email: "admin@absherbals.com" },
    update: {},
    create: {
      email: "admin@absherbals.com",
      name: "ABS Admin",
      passwordHash,
    },
  });

  const category = await prisma.category.upsert({
    where: { slug: "herbal-powders" },
    update: {},
    create: {
      name: "Herbal Powders",
      slug: "herbal-powders",
      description: "Traditional herbal powder blends.",
      isFeatured: true,
    },
  });

  await prisma.product.upsert({
    where: { slug: "nilavembu-kudineer-powder" },
    update: {},
    create: {
      name: "Nilavembu Kudineer Powder",
      slug: "nilavembu-kudineer-powder",
      shortDescription: "Siddha wellness herbal powder",
      description: "Premium quality Siddha preparation for daily wellness routines.",
      benefits: "Supports immunity and seasonal wellness.",
      usageInstructions: "Mix with warm water twice daily after meals.",
      ingredients: "Nilavembu and supporting herbs",
      price: 299,
      discountPrice: 249,
      stock: 100,
      isFeatured: true,
      isBestSeller: true,
      isNewArrival: true,
      categoryId: category.id,
      images: {
        create: [{ imageUrl: "/placeholder-product.jpg", altText: "Herbal powder" }],
      },
    },
  });

  await prisma.homeSection.createMany({
    data: [
      { key: "hero", type: "hero", title: "ABS Herbals", subtitle: "Pure Siddha and Ayurvedic wellness", sortOrder: 1, payload: { placement: "hero" } },
      { key: "featured-categories", type: "categories", title: "Featured Categories", sortOrder: 2, payload: { featuredOnly: true } },
      { key: "best-sellers", type: "products", title: "Best Sellers", sortOrder: 3, payload: { filter: "bestSeller" } },
      { key: "offers", type: "offers", title: "Special Offers", sortOrder: 4, payload: {} },
      { key: "coupon-highlight", type: "coupon", title: "Coupon Deals", sortOrder: 5, payload: {} },
    ],
    skipDuplicates: true,
  });

  await prisma.banner.createMany({
    data: [
      {
        placement: "hero",
        title: "Natural Wellness for Every Family",
        subtitle: "Siddha, Ayurvedic and Herbal care",
        imageUrl: "/placeholder-banner.jpg",
        buttonText: "Shop Now",
        buttonLink: "/shop",
        enabled: true,
        sortOrder: 1,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.siteSetting.upsert({
    where: { id: "site" },
    update: {},
    create: { id: "site", brandName: "ABS Herbals" },
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

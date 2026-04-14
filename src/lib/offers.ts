import { prisma } from "./prisma";

export async function getActiveOffers() {
  const now = new Date();
  return prisma.offerCampaign.findMany({
    where: {
      isActive: true,
      OR: [{ startDate: null }, { startDate: { lte: now } }],
      AND: [{ OR: [{ endDate: null }, { endDate: { gte: now } }] }],
    },
    orderBy: { createdAt: "desc" },
  });
}

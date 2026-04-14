import { prisma } from "./prisma";

export async function validateCoupon(code: string, subtotal: number) {
  const coupon = await prisma.coupon.findUnique({
    where: { code: code.toUpperCase() },
  });

  if (!coupon || !coupon.isActive) return { valid: false, reason: "Invalid coupon" };
  if (coupon.expiresAt && coupon.expiresAt < new Date()) {
    return { valid: false, reason: "Coupon expired" };
  }
  if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
    return { valid: false, reason: "Coupon usage limit reached" };
  }
  if (coupon.minOrderAmount && subtotal < Number(coupon.minOrderAmount)) {
    return { valid: false, reason: "Minimum order amount not reached" };
  }

  const value = Number(coupon.discountValue);
  const discount =
    coupon.discountType === "PERCENT" ? Math.min(subtotal, (subtotal * value) / 100) : Math.min(subtotal, value);

  return { valid: true, discount, coupon };
}

import { prisma } from "@/lib/prisma";
import { validateCoupon } from "@/lib/coupon";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ coupon?: string }>;
}) {
  const params = await searchParams;
  const products = await prisma.product.findMany({ where: { isActive: true }, take: 3 });
  const subtotal = products.reduce((sum, p) => sum + Number(p.discountPrice || p.price), 0);
  const couponResult = params.coupon ? await validateCoupon(params.coupon, subtotal) : null;
  const discount = couponResult && couponResult.valid ? couponResult.discount : 0;
  const safeDiscount = Number(discount || 0);
  const total = subtotal - safeDiscount;

  return (
    <section className="grid gap-6 md:grid-cols-2">
      <div className="card">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <p className="mt-2 text-sm">Cash on Delivery and WhatsApp-assisted orders enabled.</p>
        <form className="mt-4 space-y-3">
          <input className="w-full rounded border p-2" placeholder="Full Name" />
          <input className="w-full rounded border p-2" placeholder="Phone Number" />
          <textarea className="w-full rounded border p-2" placeholder="Address" />
          <button className="btn-primary" type="button">Place Order</button>
        </form>
      </div>
      <div className="card">
        <h2 className="font-semibold">Order Summary</h2>
        <p className="mt-2">Subtotal: Rs {subtotal.toFixed(2)}</p>
        <p>Discount: Rs {safeDiscount.toFixed(2)}</p>
        <p className="mt-2 text-lg font-bold">Total: Rs {total.toFixed(2)}</p>
      </div>
    </section>
  );
}

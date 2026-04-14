export const dynamic = "force-dynamic";

import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <section>
      <h1 className="mb-4 text-3xl font-bold">Shop All Products</h1>
      <div className="grid gap-4 md:grid-cols-4">
        {products.map((product) => (
          <article key={product.id} className="card">
            <h2 className="font-semibold">{product.name}</h2>
            <p className="text-sm text-green-700">{product.category.name}</p>
            <p className="mt-2">Rs {Number(product.discountPrice || product.price)}</p>
            <Link className="mt-2 inline-block text-sm text-green-700" href={`/product/${product.slug}`}>View details</Link>
          </article>
        ))}
      </div>
    </section>
  );
}

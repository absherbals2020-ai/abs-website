import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true, images: true },
  });
  if (!product) notFound();

  const related = await prisma.product.findMany({
    where: { categoryId: product.categoryId, id: { not: product.id }, isActive: true },
    take: 4,
  });

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <section className="card">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-sm text-green-700">{product.category.name}</p>
        <p className="mt-3 text-xl font-semibold">Rs {Number(product.discountPrice || product.price)}</p>
        <div className="mt-4 flex gap-2">
          <Link href="/checkout" className="btn-primary">Buy Now</Link>
          <Link href="/checkout" className="rounded border border-green-700 px-4 py-2">Add to Cart</Link>
        </div>
      </section>
      <section className="card space-y-3">
        <h2 className="font-semibold">Description</h2>
        <p>{product.description}</p>
        <h3 className="font-semibold">Benefits</h3>
        <p>{product.benefits}</p>
        <h3 className="font-semibold">Usage</h3>
        <p>{product.usageInstructions}</p>
        <h3 className="font-semibold">Ingredients</h3>
        <p>{product.ingredients}</p>
      </section>
      <section className="card md:col-span-2">
        <h3 className="font-semibold">Related Products</h3>
        <div className="mt-3 grid gap-3 md:grid-cols-4">
          {related.map((item) => (
            <Link className="rounded border border-green-200 p-3" href={`/product/${item.slug}`} key={item.id}>
              {item.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

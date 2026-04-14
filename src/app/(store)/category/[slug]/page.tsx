import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await prisma.category.findUnique({
    where: { slug },
    include: { products: { where: { isActive: true } } },
  });
  if (!category) notFound();

  return (
    <section>
      <h1 className="text-3xl font-bold">{category.name}</h1>
      <p className="mt-2 text-sm">{category.description}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {category.products.map((product) => (
          <article className="card" key={product.id}>
            <h2 className="font-semibold">{product.name}</h2>
            <p>Rs {Number(product.discountPrice || product.price)}</p>
            <Link className="text-green-700 text-sm" href={`/product/${product.slug}`}>View product</Link>
          </article>
        ))}
      </div>
    </section>
  );
}

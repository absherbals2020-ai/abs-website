import { prisma } from "@/lib/prisma";
import { saveProduct } from "../actions";

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({ include: { category: true }, orderBy: { createdAt: "desc" } }),
    prisma.category.findMany({ where: { isActive: true } }),
  ]);

  return (
    <section className="space-y-5">
      <div className="card space-y-2">
        <h2 className="text-xl font-bold">Products</h2>
        {products.map((p) => (
          <div key={p.id} className="rounded border p-2 text-sm">
            {p.name} - {p.category.name} - Rs {Number(p.discountPrice || p.price)} - Stock {p.stock}
          </div>
        ))}
      </div>
      <form action={saveProduct} className="card grid gap-2 md:grid-cols-2">
        <input name="id" className="rounded border p-2" placeholder="Product ID (optional update)" />
        <input name="name" className="rounded border p-2" required placeholder="Product name" />
        <input name="slug" className="rounded border p-2" placeholder="Slug optional" />
        <select name="categoryId" className="rounded border p-2" required defaultValue="">
          <option value="" disabled>Select category</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <input name="price" type="number" className="rounded border p-2" required placeholder="Price" />
        <input name="discountPrice" type="number" className="rounded border p-2" placeholder="Discount price" />
        <input name="stock" type="number" className="rounded border p-2" placeholder="Stock" />
        <input name="seoTitle" className="rounded border p-2" placeholder="SEO title" />
        <textarea name="shortDescription" className="rounded border p-2 md:col-span-2" placeholder="Short description" />
        <textarea name="description" className="rounded border p-2 md:col-span-2" placeholder="Description" />
        <textarea name="benefits" className="rounded border p-2 md:col-span-2" placeholder="Benefits" />
        <textarea name="usageInstructions" className="rounded border p-2 md:col-span-2" placeholder="Usage instructions" />
        <textarea name="ingredients" className="rounded border p-2 md:col-span-2" placeholder="Ingredients" />
        <textarea name="seoDescription" className="rounded border p-2 md:col-span-2" placeholder="SEO description" />
        <label className="flex items-center gap-2"><input name="isFeatured" type="checkbox" /> Featured</label>
        <label className="flex items-center gap-2"><input name="isBestSeller" type="checkbox" /> Best Seller</label>
        <label className="flex items-center gap-2"><input name="isNewArrival" type="checkbox" /> New Arrival</label>
        <label className="flex items-center gap-2"><input name="isActive" type="checkbox" defaultChecked /> Active</label>
        <button className="btn-primary w-fit" type="submit">Save Product</button>
      </form>
    </section>
  );
}

import { prisma } from "@/lib/prisma";
import { saveCategory } from "../actions";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <section className="space-y-5">
      <div className="card space-y-2">
        <h2 className="text-xl font-bold">Categories</h2>
        {categories.map((category) => (
          <div key={category.id} className="rounded border p-2 text-sm">
            {category.name} ({category.slug}) - {category.isActive ? "Active" : "Inactive"}
          </div>
        ))}
      </div>
      <form action={saveCategory} className="card grid gap-2 md:grid-cols-2">
        <input name="id" className="rounded border p-2" placeholder="Category ID (optional update)" />
        <input name="name" className="rounded border p-2" required placeholder="Name" />
        <input name="slug" className="rounded border p-2" placeholder="Slug (optional)" />
        <input name="imageUrl" className="rounded border p-2" placeholder="Image URL" />
        <textarea name="description" className="rounded border p-2 md:col-span-2" placeholder="Description" />
        <label className="flex items-center gap-2"><input name="isFeatured" type="checkbox" /> Featured</label>
        <label className="flex items-center gap-2"><input name="isActive" type="checkbox" defaultChecked /> Active</label>
        <button className="btn-primary w-fit" type="submit">Save Category</button>
      </form>
    </section>
  );
}

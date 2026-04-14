import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getActiveOffers } from "@/lib/offers";
import { subscribeEmail } from "@/app/(store)/actions";

export default async function HomeSections() {
  const [sections, banners, categories, products, coupons, offers, settings, testimonials] = await Promise.all([
    prisma.homeSection.findMany({ where: { enabled: true }, orderBy: { sortOrder: "asc" } }),
    prisma.banner.findMany({ where: { enabled: true }, orderBy: { sortOrder: "asc" } }),
    prisma.category.findMany({ where: { isActive: true }, take: 6 }),
    prisma.product.findMany({ where: { isActive: true }, take: 8 }),
    prisma.coupon.findMany({ where: { isActive: true }, take: 3 }),
    getActiveOffers(),
    prisma.siteSetting.findUnique({ where: { id: "site" } }),
    prisma.testimonial.findMany({ where: { enabled: true }, take: 4 }),
  ]);

  return (
    <div className="space-y-6">
      {sections.map((section) => {
        if (section.type === "hero") {
          return (
            <section key={section.id} className="card">
              <div className="grid gap-4 md:grid-cols-2">
                {banners
                  .filter((b) => b.placement === "hero")
                  .map((banner) => (
                    <div key={banner.id} className="rounded-lg bg-green-50 p-6">
                      <h2 className="text-2xl font-bold">{banner.title}</h2>
                      <p className="mt-2">{banner.subtitle}</p>
                      {banner.buttonLink && <Link className="btn-primary mt-4 inline-block" href={banner.buttonLink}>{banner.buttonText || "Explore"}</Link>}
                    </div>
                  ))}
              </div>
            </section>
          );
        }
        if (section.type === "categories") {
          return (
            <section key={section.id} className="card">
              <h3 className="text-xl font-semibold">{section.title || "Categories"}</h3>
              <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                {categories.map((category) => (
                  <Link href={`/category/${category.slug}`} key={category.id} className="rounded border border-green-200 bg-white p-3 hover:bg-green-50">
                    {category.name}
                  </Link>
                ))}
              </div>
            </section>
          );
        }
        if (section.type === "products") {
          return (
            <section key={section.id} className="card">
              <h3 className="text-xl font-semibold">{section.title || "Products"}</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-4">
                {products.map((product) => (
                  <article key={product.id} className="rounded border border-green-100 p-3">
                    <h4 className="font-semibold">{product.name}</h4>
                    <p className="text-sm">Rs {Number(product.discountPrice || product.price)}</p>
                    <Link href={`/product/${product.slug}`} className="text-sm text-green-700">View product</Link>
                  </article>
                ))}
              </div>
            </section>
          );
        }
        if (section.type === "offers") {
          return (
            <section key={section.id} className="card">
              <h3 className="text-xl font-semibold">{section.title || "Offers"}</h3>
              <div className="mt-3 space-y-2">
                {offers.map((offer) => (
                  <div className="rounded bg-green-50 p-3" key={offer.id}>
                    <p className="font-medium">{offer.name}</p>
                    <p className="text-sm">{offer.description}</p>
                  </div>
                ))}
              </div>
            </section>
          );
        }
        if (section.type === "coupon") {
          return (
            <section key={section.id} className="card">
              <h3 className="text-xl font-semibold">{section.title || "Coupons"}</h3>
              <div className="mt-3 flex flex-wrap gap-3">
                {coupons.map((coupon) => (
                  <div key={coupon.id} className="rounded bg-white px-4 py-2 border border-green-200">
                    <p className="font-bold">{coupon.code}</p>
                    <p className="text-xs">Save {Number(coupon.discountValue)} ({coupon.discountType})</p>
                  </div>
                ))}
              </div>
            </section>
          );
        }
        if (section.type === "whatsapp") {
          return (
            <section key={section.id} className="card">
              <h3 className="text-xl font-semibold">WhatsApp Orders</h3>
              <a className="btn-primary mt-3 inline-block" href={`https://wa.me/${settings?.whatsappPhone || ""}`}>Order on WhatsApp</a>
            </section>
          );
        }
        if (section.type === "testimonials") {
          return (
            <section key={section.id} className="card">
              <h3 className="text-xl font-semibold">Customer Reviews</h3>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {testimonials.map((item) => (
                  <blockquote key={item.id} className="rounded bg-green-50 p-3">
                    <p>{item.content}</p>
                    <footer className="mt-2 text-sm font-semibold">{item.name}</footer>
                  </blockquote>
                ))}
              </div>
            </section>
          );
        }

        return null;
      })}
      <section className="card">
        <h3 className="text-xl font-semibold">Stay Updated</h3>
        <form action={subscribeEmail} className="mt-3 flex flex-wrap gap-2">
          <input name="email" required type="email" className="rounded border p-2" placeholder="Email address" />
          <button className="btn-primary" type="submit">Subscribe</button>
        </form>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          {settings?.facebookUrl && <a href={settings.facebookUrl}>Facebook</a>}
          {settings?.instagramUrl && <a href={settings.instagramUrl}>Instagram</a>}
          {settings?.youtubeUrl && <a href={settings.youtubeUrl}>YouTube</a>}
          {settings?.mapsUrl && <a href={settings.mapsUrl}>Google Maps</a>}
        </div>
      </section>
    </div>
  );
}

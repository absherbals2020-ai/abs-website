import { prisma } from "@/lib/prisma";
import { updateOrderStatus } from "../actions";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({ include: { items: true }, orderBy: { createdAt: "desc" } });
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Orders</h2>
      {orders.length === 0 && <div className="card">No orders yet.</div>}
      {orders.map((order) => (
        <div key={order.id} className="card">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-semibold">{order.orderNumber}</p>
              <p className="text-sm">{order.customerName} - {order.customerPhone}</p>
              <p className="text-sm">Total Rs {Number(order.totalAmount)}</p>
            </div>
            <form action={updateOrderStatus} className="flex items-center gap-2">
              <input name="id" type="hidden" value={order.id} />
              <select name="status" className="rounded border p-2" defaultValue={order.status}>
                <option>PENDING</option><option>CONFIRMED</option><option>SHIPPED</option><option>DELIVERED</option><option>CANCELLED</option>
              </select>
              <button className="btn-primary" type="submit">Update</button>
            </form>
          </div>
        </div>
      ))}
    </section>
  );
}

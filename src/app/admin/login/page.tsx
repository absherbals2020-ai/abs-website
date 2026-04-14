import { adminLogin } from "../actions";

export default function AdminLoginPage() {
  return (
    <main className="container-app py-12">
      <div className="mx-auto max-w-md card">
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <p className="mt-2 text-sm">Default seed login: admin@absherbals.com / Admin@123</p>
        <form action={adminLogin} className="mt-4 space-y-3">
          <input name="email" type="email" className="w-full rounded border p-2" required placeholder="Email" />
          <input name="password" type="password" className="w-full rounded border p-2" required placeholder="Password" />
          <button type="submit" className="btn-primary">Login</button>
        </form>
      </div>
    </main>
  );
}

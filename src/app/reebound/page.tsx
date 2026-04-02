import { NavPill } from "@/components/layout/nav-pill";

export default function ReeboundPage() {
  return (
    <main className="flex min-h-screen flex-col bg-black text-white p-24">
      <NavPill />
      <div className="flex-1 flex flex-col items-center justify-center mt-32">
        <h1 className="text-4xl md:text-6xl font-serif mb-4 tracking-tight">Reebound</h1>
        <p className="text-neutral-400 text-lg">App overview and features coming soon.</p>
      </div>
    </main>
  );
}

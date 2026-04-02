import { NavPill } from "@/components/layout/nav-pill";

export default function RevostepPage() {
  return (
    <main className="flex min-h-screen flex-col bg-black text-white p-24">
      <NavPill />
      <div className="flex-1 flex flex-col items-center justify-center mt-32">
        <h1 className="text-4xl md:text-6xl font-serif mb-4 tracking-tight">Revostep</h1>
        <p className="text-neutral-400 text-lg">Detailed product information coming soon.</p>
      </div>
    </main>
  );
}

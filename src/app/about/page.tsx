import { NavPill } from "@/components/layout/nav-pill";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col bg-black text-white px-6">
      <NavPill />
      
      <div className="flex-1 flex flex-col items-center justify-center mt-40 mb-32 max-w-4xl mx-auto text-center">
        <div className="mb-6 flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.02] px-3 py-1">
           <span className="font-mono text-[10px] uppercase tracking-wider text-[#14b8a6]">Upstart & Progress</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-serif mb-8 tracking-tight leading-tight">
          Our Story & <br/> Future Roadmap
        </h1>
        
        <p className="text-[#8a9bb3] text-xl md:text-2xl font-light leading-relaxed max-w-2xl">
          From a 4th-year engineering project to a next-generation mobility company. Discover how LimbRise started, what we've engineered so far, and where we're heading next.
        </p>
        
        <div className="mt-16 p-12 border border-white/10 rounded-3xl bg-[#0a0a0a] w-full relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#14b8a6] to-transparent opacity-50"></div>
          <h2 className="text-2xl font-medium text-white mb-4">Page under construction</h2>
          <p className="text-neutral-500 mb-8">We are currently compiling our journey, milestones, and technical roadmap to share with you very soon.</p>
          
          <Link href="/" className="group inline-flex items-center gap-3 rounded-full bg-white/[0.05] border border-white/10 text-white px-6 py-3 text-sm font-medium transition-all hover:bg-white/[0.1] hover:border-white/20">
            Return to Homepage
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </main>
  );
}

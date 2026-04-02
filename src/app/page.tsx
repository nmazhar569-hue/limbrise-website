import { ParticleTextEffect } from "@/components/ui/particle-text-effect";
import { NavPill } from "@/components/layout/nav-pill";
import { ShinyButton } from "@/components/ui/shiny-button";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { MetricsTicker } from "@/components/ui/metrics-ticker";
import { FeatureCard } from "@/components/ui/feature-card";
import { CodeBlock } from "@/components/ui/code-block";
import { LimbRiseLogo } from "@/components/ui/limbrise-logo";
import { Box, Smartphone, ArrowRight, Eye, Target, Linkedin, Instagram, Mail } from "lucide-react";
import Link from "next/link";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black text-white selection:bg-primary/30">
      <ScrollIndicator />

      {/* 1. Fixed Navigation Pill */}
      <NavPill />

      {/* 2. Hero Section wrapped in ZoomParallax */}
      <section className="relative w-full bg-black">
        <ZoomParallax images={[]}>
          {/* Removed Ambient Radial Gradients mapped to LimbRise Colors to keep background pure black */}


          {/* Layer 1: Particle Text Effect covering full screen */}
          <div className="absolute inset-0 z-0 w-full h-full pointer-events-auto">
            <ParticleTextEffect />
          </div>


        </ZoomParallax>

        {/* Transition text — appears in the black gap at the tail end of the zoom scroll */}
        <div className="absolute bottom-0 left-0 right-0 h-screen flex flex-col items-center justify-center text-center px-6 z-20 pointer-events-none">
          <p className="max-w-3xl text-2xl md:text-4xl font-light leading-relaxed text-white/90 tracking-[-0.02em]" style={{ textShadow: '0 0 40px rgba(0,0,0,0.9), 0 0 80px rgba(0,0,0,0.6)' }}>
            <span className="text-[#14b8a6] font-medium">LimbRise</span> helps people regain confidence with better mobility support and smarter recovery tools designed to keep progress moving.
          </p>
          <p className="mt-6 max-w-2xl text-lg md:text-xl font-light leading-relaxed text-neutral-400 tracking-[-0.01em]" style={{ textShadow: '0 0 30px rgba(0,0,0,0.9), 0 0 60px rgba(0,0,0,0.5)' }}>
            We bring advanced, integrated products that make recovery guidance clear and mobility support seamless.
          </p>
        </div>
      </section>

      {/* Products & Services Section */}
      <section className="relative z-10 flex w-full flex-col items-center bg-black px-6 py-32">
        <h3 className="mb-16 font-serif text-3xl md:text-5xl tracking-tight text-white text-center">
          Products and Services
        </h3>

        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
          
          {/* Card 1: Revostep */}
          <Link href="/revostep" className="group relative flex h-[480px] cursor-pointer flex-col justify-end overflow-hidden rounded-[24px] bg-[#0c1017] p-8 transition-transform duration-500 hover:-translate-y-2">
            {/* Background Image / Overlay */}
            <div className="absolute inset-0 z-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/revostep-product.jpg" 
                alt="Revostep prototype" 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1017] via-[#0c1017]/80 to-transparent"></div>
            </div>

            {/* Icon Container */}
            <div className="absolute left-8 top-8 z-20 flex size-12 items-center justify-center rounded-[14px] bg-white/[0.03] border border-white/10 backdrop-blur-md transition-colors duration-300 group-hover:bg-white/[0.08]">
              <Box className="size-5 text-white/80" />
            </div>

            {/* Content */}
            <div className="relative z-20 flex flex-col gap-3">
              <h4 className="text-[28px] font-semibold tracking-tight text-white">Revostep</h4>
              <p className="text-[15px] leading-relaxed text-[#8a9bb3]">
                A next-generation mechanical mobility device that distrubutes forces into muscles, helping users stay active throughout recovery, reduce atrophy, and move naturally while healing.
              </p>
              
              <div className="mt-2 flex items-center gap-2 text-[14px] font-medium text-[#6e7d94] transition-colors duration-300 group-hover:text-white">
                Explore <ArrowRight className="size-4" />
              </div>
            </div>
          </Link>

          {/* Card 2: Reebound */}
          <Link href="/reebound" className="group relative flex h-[480px] cursor-pointer flex-col justify-end overflow-hidden rounded-[24px] bg-[#0c1017] p-8 transition-transform duration-500 hover:-translate-y-2">
            {/* Background Image / Overlay */}
            <div className="absolute inset-0 z-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/reebound-app.png" 
                alt="Reebound app" 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1017] via-[#0c1017]/80 to-transparent"></div>
            </div>

            {/* Icon Container */}
            <div className="absolute left-8 top-8 z-20 flex size-12 items-center justify-center rounded-[14px] bg-white/[0.03] border border-white/10 backdrop-blur-md transition-colors duration-300 group-hover:bg-white/[0.08]">
              <Smartphone className="size-5 text-white/80" />
            </div>

            {/* Content */}
            <div className="relative z-20 flex flex-col gap-3">
              <h4 className="text-[28px] font-semibold tracking-tight text-white">Reebound</h4>
              <p className="text-[15px] leading-relaxed text-[#8a9bb3]">
                Gives users guided recovery, smart workout tracking, and AI-powered insights to help them train safer, recover better, and see their progress over time.
              </p>
              
              <div className="mt-2 flex items-center gap-2 text-[14px] font-medium text-[#6e7d94] transition-colors duration-300 group-hover:text-white">
                Explore <ArrowRight className="size-4" />
              </div>
            </div>
          </Link>

        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="relative z-10 flex w-full flex-col items-center bg-[#050505] px-6 py-32 border-t border-white/5 overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(20,184,166,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>

        {/* Decorative logo accent */}
        <div className="absolute -bottom-16 -right-16 pointer-events-none opacity-[0.03] rotate-12">
          <LimbRiseLogo className="size-96" />
        </div>

        <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-16">
          
          {/* Header */}
          <div className="text-center flex flex-col items-center">
             <div className="mb-5 flex items-center gap-2 rounded-full border border-[#14b8a6]/30 bg-[#14b8a6]/[0.06] px-4 py-1.5">
               <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#14b8a6] font-medium">Our Purpose</span>
             </div>
             <h3 className="font-serif text-4xl md:text-5xl tracking-tight text-white mb-6">
                Why we built LimbRise
             </h3>
             <p className="text-[#8a9bb3] text-lg max-w-2xl mx-auto leading-relaxed">
               We remove the hurdles to recovery. Driven by a commitment to restore independence, we work to make every step feel achievable for everyone.
             </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Vision Card */}
            <div className="group relative rounded-2xl border border-[#14b8a6]/20 bg-[#0a0f12]/80 p-8 backdrop-blur-sm transition-all duration-500 hover:border-[#14b8a6]/40 hover:shadow-[0_0_30px_rgba(20,184,166,0.08)]">
              {/* Corner glow accent */}
              <div className="absolute -top-px -left-px h-16 w-16 rounded-tl-2xl border-t-2 border-l-2 border-[#14b8a6]/40 transition-colors duration-500 group-hover:border-[#14b8a6]/70"></div>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="flex size-11 items-center justify-center rounded-xl bg-[#14b8a6]/10 border border-[#14b8a6]/20 text-[#14b8a6]">
                  <Eye className="size-5" />
                </div>
                <h4 className="text-xl font-semibold text-white tracking-tight">The Vision</h4>
              </div>
              <p className="text-[17px] leading-relaxed text-[#8a9bb3]">
                To shape a future where <span className="text-white font-semibold">better mobility and rehabilitation support</span> are effortlessly integrated into everyday life, powered by deeply human-centered technology.
              </p>
            </div>

            {/* Mission Card */}
            <div className="group relative rounded-2xl border border-[#14b8a6]/20 bg-[#0a0f12]/80 p-8 backdrop-blur-sm transition-all duration-500 hover:border-[#14b8a6]/40 hover:shadow-[0_0_30px_rgba(20,184,166,0.08)]">
              {/* Corner glow accent */}
              <div className="absolute -top-px -left-px h-16 w-16 rounded-tl-2xl border-t-2 border-l-2 border-[#14b8a6]/40 transition-colors duration-500 group-hover:border-[#14b8a6]/70"></div>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="flex size-11 items-center justify-center rounded-xl bg-[#14b8a6]/10 border border-[#14b8a6]/20 text-[#14b8a6]">
                  <Target className="size-5" />
                </div>
                <h4 className="text-xl font-semibold text-white tracking-tight">The Mission</h4>
              </div>
              <p className="text-[17px] leading-relaxed text-[#8a9bb3]">
                We empower patients and care teams to transform precise movement data into <span className="text-white font-semibold">clearer insights, safer care,</span> and <span className="text-white font-semibold">consistently superior outcomes.</span>
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="relative z-10 flex w-full flex-col items-center bg-[#0a0a0a] px-6 py-32 border-t border-white/5">
        <div className="mx-auto flex w-full max-w-6xl flex-col lg:flex-row items-center gap-20">
          
          {/* Photos */}
          <div className="w-full lg:flex-1 relative h-[550px] flex justify-center lg:justify-start mt-10 lg:mt-0 order-2 lg:order-1">
            {/* Richard (CEO) */}
            <div className="absolute left-4 md:left-24 lg:left-0 top-0 w-56 md:w-72 h-[380px] md:h-[450px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl z-10 transition-transform duration-700 hover:-translate-y-4 hover:z-30 hover:shadow-[0_20px_40px_rgba(20,184,166,0.15)] group">
              <img src="/team/richard.jpg" alt="Richard - CEO" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 pt-20">
                <p className="text-xl font-semibold text-white tracking-tight">Richard</p>
                <p className="text-sm font-medium text-[#14b8a6] mt-1">Co-founder & CEO</p>
              </div>
            </div>
            {/* Noor (CTO) */}
            <div className="absolute right-4 md:right-24 lg:left-[220px] bottom-0 w-56 md:w-72 h-[380px] md:h-[450px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl z-20 transition-transform duration-700 hover:-translate-y-4 hover:z-30 hover:shadow-[0_20px_40px_rgba(20,184,166,0.15)] group">
              <img src="/team/noor.png" alt="Noor - CTO" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 pt-20">
                <p className="text-xl font-semibold text-white tracking-tight">Noor</p>
                <p className="text-sm font-medium text-[#14b8a6] mt-1">Co-founder & CTO</p>
              </div>
            </div>
          </div>

          {/* Story Content */}
          <div className="w-full lg:flex-1 flex flex-col items-center lg:items-start text-center lg:text-left order-1 lg:order-2">
             <div className="mb-6 flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.02] px-3 py-1">
               <span className="font-mono text-[10px] uppercase tracking-wider text-[#14b8a6]">Meet the Team</span>
             </div>
             <h3 className="font-serif text-4xl md:text-5xl tracking-tight text-white mb-8 leading-tight">
                Engineering a better way forward
             </h3>
             <p className="text-[#8a9bb3] text-[17px] mb-5 leading-relaxed">
               LimbRise began when Richard, born in Canada of Canadian-Filipino descent, tore his knee in university and experienced firsthand how slow, painful, and impersonal rehabilitation could be. Living through months of limited mobility, he realized how much patience recovery demands and how existing tools fail to truly support people on that journey. This inspired him to start LimbRise. As CEO, Richard channels that personal experience into a leadership style rooted in empathy and high standards—pushing the team to listen first, then build solutions that are both structurally robust and emotionally considerate.
             </p>
             <p className="text-[#8a9bb3] text-[17px] mb-10 leading-relaxed">
               This vision crystallized when Noor, who immigrated from Egypt to Canada at age 11, tore his meniscus and faced the same long, frustrating road back to feeling like himself again. He understood the struggles caused by the complex, interconnected nature of recovery. That shared lived experience fuels their commitment to building not just a device, but a complete ecosystem for recovery where data, coaching, and community work together. Bringing deep technical expertise, Noor leads the intelligence behind our platform—ensuring patients and clinicians are supported by technology that feels as thoughtful as the people who use it.
             </p>
             
             <Link href="/about" className="group flex w-fit items-center gap-3 rounded-full bg-white text-black px-8 py-3.5 font-semibold transition-all duration-300 hover:bg-[#14b8a6] hover:text-white hover:shadow-[0_0_20px_rgba(20,184,166,0.3)]">
                Our Story & Roadmap
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
             </Link>
          </div>

        </div>
      </section>

      {/* Contact Section */}
      <section className="relative w-full bg-[#050505] px-6 py-24 border-t border-white/5 overflow-hidden">

        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
          <div className="mb-6 flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.02] px-3 py-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#14b8a6]">Get in Touch</span>
          </div>
          <h3 className="font-serif text-4xl tracking-tight text-white mb-6">
            Let&apos;s build the future of mobility together.
          </h3>
          <p className="text-[#8a9bb3] text-lg mb-12 max-w-2xl leading-relaxed">
            Whether you&apos;re interested in our products, potential partnerships, or just want to follow our journey, we&apos;d love to hear from you.
          </p>

          {/* Partner logos showcase */}
          <div className="mb-14 w-full">
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-6">Backed by &amp; partnered with</p>
            <div className="relative rounded-2xl border border-[#14b8a6]/15 bg-[#14b8a6]/[0.03] backdrop-blur-md p-6 overflow-hidden">
              {/* Glass highlight */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#14b8a6]/30 to-transparent"></div>
              <div className="grid grid-cols-5 gap-4 md:gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <div key={i} className="flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06] p-3 md:p-4 transition-all duration-300 hover:bg-white/[0.08] hover:border-[#14b8a6]/20">
                    <img
                      src={`/partner-${i}.png`}
                      alt={`Partner ${i}`}
                      className="w-full h-10 md:h-14 object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6">
            {/* Email */}
            <a href="mailto:limbrise.team@gmail.com" className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0a0a0a] px-6 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#14b8a6]/40 hover:bg-[#14b8a6]/10 hover:shadow-[0_10px_20px_rgba(20,184,166,0.1)]">
              <div className="flex size-12 items-center justify-center rounded-full bg-white/[0.03] border border-white/10 text-white transition-colors duration-300 group-hover:text-[#14b8a6]">
                <Mail className="size-5" />
              </div>
              <div className="flex flex-col items-start pr-2">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider mb-0.5">Email Us</span>
                <span className="text-sm font-medium text-white">limbrise.team@gmail.com</span>
              </div>
            </a>
            
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/company/limbrise-inc/posts" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0a0a0a] px-6 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/10 hover:shadow-[0_10px_20px_rgba(10,102,194,0.1)]">
              <div className="flex size-12 items-center justify-center rounded-full bg-white/[0.03] border border-white/10 text-white transition-colors duration-300 group-hover:text-[#0A66C2]">
                <Linkedin className="size-5" />
              </div>
              <div className="flex flex-col items-start pr-2">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider mb-0.5">Connect</span>
                <span className="text-sm font-medium text-white">LinkedIn</span>
              </div>
            </a>

            {/* Instagram */}
            <a href="https://www.instagram.com/limbrise/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0a0a0a] px-6 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#E1306C]/40 hover:bg-[#E1306C]/10 hover:shadow-[0_10px_20px_rgba(225,48,108,0.1)]">
              <div className="flex size-12 items-center justify-center rounded-full bg-white/[0.03] border border-white/10 text-white transition-colors duration-300 group-hover:text-[#E1306C]">
                <Instagram className="size-5" />
              </div>
              <div className="flex flex-col items-start pr-2">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider mb-0.5">Follow</span>
                <span className="text-sm font-medium text-white">Instagram</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 bg-[#111111] px-6 py-12 pb-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col md:flex-row justify-between border-b border-white/5 pb-10">

          <div className="mb-10 md:mb-0">
            <div className="mb-4 flex items-center gap-3">
              <LimbRiseLogo className="size-8 drop-shadow-[0_2px_10px_rgba(20,184,166,0.3)]" />
              <span className="font-serif text-3xl font-medium tracking-tight text-white">LimbRise</span>
            </div>
            <p className="text-neutral-500 text-sm max-w-xs leading-relaxed">
              Engineering human-centered mobility solutions to continuously support your rehabilitation journey.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:grid-cols-2">
            <div className="flex flex-col gap-4">
              <h4 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#14b8a6]">Products</h4>
              <Link href="/revostep" className="text-sm text-neutral-400 hover:text-white transition-snappy">Revostep Brace</Link>
              <Link href="/reebound" className="text-sm text-neutral-400 hover:text-white transition-snappy">Reebound App</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#14b8a6]">Company</h4>
              <Link href="/about" className="text-sm text-neutral-400 hover:text-white transition-snappy">Our Story</Link>
              <a href="mailto:limbrise.team@gmail.com" className="text-sm text-neutral-400 hover:text-white transition-snappy">Contact Us</a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-6 flex w-full max-w-7xl items-center justify-between text-xs text-neutral-500">
          <span>&copy; {new Date().getFullYear()} LimbRise. All rights reserved.</span>

          <div className="flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.02] px-3 py-1">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">All Systems Operational</span>
          </div>
        </div>
      </footer>

    </main>
  );
}

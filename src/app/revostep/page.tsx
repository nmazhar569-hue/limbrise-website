"use client";

import { ParticleTextEffect } from "@/components/ui/particle-text-effect";
import { NavPill } from "@/components/layout/nav-pill";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Construction, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

const REVOSTEP_WORDS = ["Revostep", "Engineered Recovery", "_LOGO_"];

export default function RevostepPage() {
  const constructionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: constructionRef,
    offset: ["start end", "start center"],
  });

  const cardOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const cardY = useTransform(scrollYProgress, [0, 1], [80, 0]);

  return (
    <main className="flex min-h-screen flex-col bg-black text-white selection:bg-primary/30">
      <ScrollIndicator />

      {/* Fixed Navigation Pill */}
      <NavPill />

      {/* Hero Section — same particle animation with zoom parallax */}
      <section className="relative w-full bg-black">
        <ZoomParallax images={[]}>
          <div className="absolute inset-0 z-0 w-full h-full pointer-events-auto">
            <ParticleTextEffect words={REVOSTEP_WORDS} />
          </div>
        </ZoomParallax>
      </section>

      {/* Under Construction Section — lives below the animation, doesn't interfere */}
      <section
        ref={constructionRef}
        className="relative z-10 flex w-full flex-col items-center bg-black px-6 py-32 md:py-40"
      >
        {/* Subtle top fade for seamless transition */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black pointer-events-none" />

        <motion.div
          style={{ opacity: cardOpacity, y: cardY }}
          className="relative w-full max-w-2xl"
        >
          {/* Card */}
          <div className="relative overflow-hidden rounded-2xl border border-[#14b8a6]/20 bg-[#0a0f12]/90 backdrop-blur-md p-10 md:p-14 shadow-[0_0_60px_rgba(20,184,166,0.06)]">
            {/* Top-left corner accent */}
            <div className="absolute -top-px -left-px h-20 w-20 rounded-tl-2xl border-t-2 border-l-2 border-[#14b8a6]/50" />
            {/* Bottom-right corner accent */}
            <div className="absolute -bottom-px -right-px h-20 w-20 rounded-br-2xl border-b-2 border-r-2 border-[#14b8a6]/50" />

            {/* Top glass highlight */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#14b8a6]/30 to-transparent" />

            {/* Icon */}
            <div className="mb-8 flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-xl bg-[#14b8a6]/10 border border-[#14b8a6]/20 text-[#14b8a6]">
                <Construction className="size-5" />
              </div>
              <div className="flex items-center gap-2 rounded-full border border-[#14b8a6]/30 bg-[#14b8a6]/[0.06] px-3 py-1">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-amber-500" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#14b8a6] font-medium">
                  In Development
                </span>
              </div>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-white mb-4 leading-tight">
              This page is currently under development.
            </h2>

            {/* Body */}
            <p className="text-[#8a9bb3] text-[16px] md:text-[17px] leading-relaxed mb-4">
              Our team is actively building this experience. The Revostep product page will be available soon with detailed specifications, features, and ordering information.
            </p>
            <p className="text-[#8a9bb3] text-[16px] md:text-[17px] leading-relaxed mb-10">
              We appreciate your patience. If you have any questions in the meantime, please don&apos;t hesitate to reach out to a member of our team — we&apos;re happy to help.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:limbrise.team@gmail.com"
                className="group flex items-center gap-3 rounded-full bg-white text-black px-6 py-3 font-semibold text-sm transition-all duration-300 hover:bg-[#14b8a6] hover:text-white hover:shadow-[0_0_20px_rgba(20,184,166,0.3)]"
              >
                <Mail className="size-4" />
                Contact Us
              </a>
              <Link
                href="/"
                className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] text-white px-6 py-3 font-semibold text-sm transition-all duration-300 hover:border-[#14b8a6]/40 hover:bg-[#14b8a6]/10"
              >
                Return Home
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

"use client";

import { ParticleTextEffect } from "@/components/ui/particle-text-effect";
import { NavPill } from "@/components/layout/nav-pill";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Construction, Mail, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

const REVOSTEP_WORDS = ["Revostep", "Engineered Recovery", "_LOGO_"];

export default function RevostepPage() {
  const constructionRef = useRef<HTMLDivElement>(null);
  const modelCardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: constructionProgress } = useScroll({
    target: constructionRef,
    offset: ["start end", "start center"],
  });
  const cardOpacity = useTransform(constructionProgress, [0, 1], [0, 1]);
  const cardY = useTransform(constructionProgress, [0, 1], [60, 0]);

  const { scrollYProgress: modelCardProgress } = useScroll({
    target: modelCardRef,
    offset: ["start end", "start center"],
  });
  const modelCardOpacity = useTransform(modelCardProgress, [0, 1], [0, 1]);
  const modelCardY = useTransform(modelCardProgress, [0, 1], [50, 0]);

  return (
    <main className="flex min-h-screen flex-col bg-black text-white selection:bg-teal-500/20">
      <ScrollIndicator />
      <NavPill />

      {/* ── 1. Particle Hero ───────────────────────────────────────────── */}
      <section className="relative w-full bg-black">
        <ZoomParallax images={[]}>
          <div className="absolute inset-0 z-0 w-full h-full pointer-events-auto">
            <ParticleTextEffect words={REVOSTEP_WORDS} />
          </div>
        </ZoomParallax>
      </section>

      {/* ── 2. 3D Model Launch Card ────────────────────────────────────── */}
      <section
        ref={modelCardRef}
        className="relative z-10 flex w-full flex-col items-center bg-black px-6 pt-20 pb-0"
      >
        <motion.div
          style={{ opacity: modelCardOpacity, y: modelCardY }}
          className="w-full max-w-2xl"
        >
          {/* Section label */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2 rounded-full border border-[#14b8a6]/30 bg-[#14b8a6]/[0.06] px-4 py-1.5">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#14b8a6] font-medium">
                Interactive Model
              </span>
            </div>
          </div>

          {/* The card */}
          <Link href="/revostep/model" target="_blank" className="group block">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f12] transition-all duration-500 hover:border-[#14b8a6]/40 hover:shadow-[0_0_60px_rgba(20,184,166,0.1)]">

              {/* Preview area — blueprint image */}
              <div className="relative h-64 overflow-hidden">
                {/* Blueprint image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/revostep-blueprint.png"
                  alt="Revostep engineered for excellence blueprint"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Dark gradient overlay so text below reads cleanly */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f12] via-[#0a0f12]/30 to-transparent" />
                {/* Subtle teal tint on hover */}
                <div className="absolute inset-0 bg-[#14b8a6]/0 group-hover:bg-[#14b8a6]/[0.06] transition-colors duration-500" />

                {/* Corner brackets */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#14b8a6]/60 rounded-tl" />
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#14b8a6]/60 rounded-tr" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#14b8a6]/60 rounded-bl" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#14b8a6]/60 rounded-br" />

                {/* "3D Interactive" badge */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-2 rounded-full border border-[#14b8a6]/40 bg-black/60 backdrop-blur-md px-3 py-1">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#14b8a6] opacity-60" />
                      <span className="relative inline-flex size-2 rounded-full bg-[#14b8a6]" />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#14b8a6]">3D Interactive</span>
                  </div>
                </div>
              </div>


              {/* Card body */}
              <div className="p-7 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-2xl tracking-tight text-white mb-2">
                    Explore the Revostep in 3D
                  </h3>
                  <p className="text-[#8a9bb3] text-sm leading-relaxed max-w-sm">
                    Rotate, zoom, and inspect the full CAD model of the Revostep MVP. Explore every component — from the knee joint to the gait-geometry foot.
                  </p>
                </div>
                <div className="flex-shrink-0 flex size-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/40 transition-all duration-300 group-hover:border-[#14b8a6]/40 group-hover:bg-[#14b8a6]/10 group-hover:text-[#14b8a6]">
                  <ExternalLink className="size-5" />
                </div>
              </div>

              {/* Bottom accent */}
              <div className="h-[1px] bg-gradient-to-r from-transparent via-[#14b8a6]/30 to-transparent" />
              <div className="px-7 py-3 flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-600">
                  Opens in new tab · Revostep 3.0 GLB
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      </section>

      {/* ── 3. Under-Construction Notice ──────────────────────────────── */}
      <section
        ref={constructionRef}
        className="relative z-10 flex w-full flex-col items-center bg-black px-6 py-24 md:py-32"
      >
        <motion.div
          style={{ opacity: cardOpacity, y: cardY }}
          className="relative w-full max-w-2xl"
        >
          <div className="relative overflow-hidden rounded-2xl border border-[#14b8a6]/20 bg-[#0a0f12]/90 backdrop-blur-md p-10 md:p-14 shadow-[0_0_60px_rgba(20,184,166,0.06)]">
            <div className="absolute -top-px -left-px h-20 w-20 rounded-tl-2xl border-t-2 border-l-2 border-[#14b8a6]/50" />
            <div className="absolute -bottom-px -right-px h-20 w-20 rounded-br-2xl border-b-2 border-r-2 border-[#14b8a6]/50" />
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#14b8a6]/30 to-transparent" />

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

            <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-white mb-4 leading-tight">
              This page is currently under development.
            </h2>
            <p className="text-[#8a9bb3] text-[16px] md:text-[17px] leading-relaxed mb-4">
              Our team is actively building this experience. The Revostep product page will be available soon with detailed specifications, features, and ordering information.
            </p>
            <p className="text-[#8a9bb3] text-[16px] md:text-[17px] leading-relaxed mb-10">
              We appreciate your patience. If you have any questions in the meantime, please don&apos;t hesitate to reach out to a member of our team — we&apos;re happy to help.
            </p>

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

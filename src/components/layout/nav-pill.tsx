"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LimbRiseLogo } from "@/components/ui/limbrise-logo";
import { cn } from "@/lib/utils";
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from "framer-motion";

export function NavPill() {
    const { scrollY } = useScroll();
    const [isVisible, setIsVisible] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 100) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    });

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.nav 
                    initial={{ y: -100, opacity: 0, x: "-50%" }}
                    animate={{ y: 0, opacity: 1, x: "-50%" }}
                    exit={{ y: -100, opacity: 0, x: "-50%" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="fixed top-6 left-1/2 z-50 w-[95%] max-w-[672px] flex items-center justify-between rounded-full bg-[#0a0a0a]/70 backdrop-blur-2xl border border-white/10 px-6 py-3 shadow-[0_0_20px_-10px_rgba(224,93,56,0.2)]"
                >

                    {/* Brand */}
                    <Link href="/" className="flex items-center gap-2.5">
                        <LimbRiseLogo className="size-6 drop-shadow-[0_0_8px_rgba(20,184,166,0.3)]" />
                        <span className="font-serif text-xl tracking-tight text-white select-none pt-0.5">
                            LimbRise
                        </span>
                    </Link>

                    {/* Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/revostep"
                            className="text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-snappy"
                        >
                            Revostep
                        </Link>
                        <Link
                            href="/reebound"
                            className="text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-snappy"
                        >
                            Reebound
                        </Link>
                        <Link
                            href="/about"
                            className="text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-snappy"
                        >
                            Roadmap
                        </Link>
                    </div>

                    {/* CTA */}
                    <a href="mailto:limbrise.team@gmail.com" className="rounded-full bg-white px-5 py-2 text-xs font-semibold text-black transition-snappy hover:scale-105 active:scale-95">
                        Contact
                    </a>

                </motion.nav>
            )}
        </AnimatePresence>
    );
}

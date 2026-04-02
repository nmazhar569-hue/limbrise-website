"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    delay?: number;
}

export function FeatureCard({ icon, title, description, delay = 0 }: FeatureCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.8,
                ease: [0.23, 1, 0.32, 1],
                delay: delay
            }}
            className="group relative flex flex-col items-start rounded-[24px] border border-white/5 bg-white/[0.02] p-8 md:p-10 transition-snappy hover:-translate-y-3 hover:border-primary/40 hover:bg-white/[0.04] hover:shadow-[0_0_20px_-10px_rgba(224,93,56,0.4)]"
        >
            {/* Icon orb */}
            <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-snappy group-hover:scale-110 group-hover:rotate-3 group-hover:bg-primary/20">
                {icon}
            </div>

            <h3 className="mb-3 font-serif text-2xl tracking-tight text-white md:text-3xl">
                {title}
            </h3>

            <p className="font-sans text-sm leading-relaxed text-neutral-400 md:text-base">
                {description}
            </p>
        </motion.div>
    );
}

"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

interface ProductFeature {
    title: string;
    description: string;
    imageSrc: string;
}

const features: ProductFeature[] = [
    {
        title: "Ergonomic Foundation",
        description: "Built from the ground up to support natural posture, our base architecture completely eliminates upper body strain.",
        imageSrc: "/product-1.png",
    },
    {
        title: "Dynamic Pivot Joint",
        description: "The intelligent pivot system smoothly adapts to your walking gait, providing fluid motion that feels like an extension of your body.",
        imageSrc: "/product-2.png",
    },
    {
        title: "Custom Support Cradle",
        description: "Engineered to distribute weight seamlessly. The proprietary contouring ensures all-day comfort without pressure points.",
        imageSrc: "/product-3.png",
    },
    {
        title: "Lightweight Architecture",
        description: "Aerospace-grade materials mean it’s incredibly light while maintaining structural integrity for robust daily use.",
        imageSrc: "/product-4.png",
    },
    {
        title: "Complete Freedom",
        description: "With your hands totally free and movement unrestricted, you can finally navigate your world naturally again.",
        imageSrc: "/product-5.png",
    },
];

export function StickyProductScroll() {
    const containerRef = useRef<HTMLDivElement>(null);

    // We track the scroll progress through this entire section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <section ref={containerRef} className="relative w-full bg-[#111111]" style={{ height: "500vh" }}>
            {/* Sticky Container - this stays on screen while the parent scrolls */}
            <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden px-6 md:px-12 lg:px-24">

                {/* Left Side: Images */}
                <div className="relative flex-1 h-full flex items-center justify-center">
                    {features.map((feature, index) => {
                        // Calculate opacity for each image based on scroll progress
                        // Each of the 5 items gets a 20% window (0.2) of the 500vh scroll
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const opacity = useTransform(
                            scrollYProgress,
                            [
                                Math.max(0, (index - 1) * 0.2), // Start fading in
                                index * 0.2,                    // Fully visible
                                (index + 0.5) * 0.2,            // Start fading out early
                                Math.min(1, (index + 1) * 0.2)  // Fully hidden
                            ],
                            [0, 1, 1, 0]
                        );

                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const y = useTransform(
                            scrollYProgress,
                            [
                                Math.max(0, (index - 1) * 0.2),
                                index * 0.2,
                                (index + 1) * 0.2
                            ],
                            [100, 0, -100] // Slight vertical drift for depth
                        );

                        return (
                            <motion.div
                                key={`img-${index}`}
                                style={{ opacity, y }}
                                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={feature.imageSrc}
                                    alt={feature.title}
                                    className="w-full max-w-[500px] lg:max-w-[700px] object-contain drop-shadow-2xl"
                                />
                            </motion.div>
                        );
                    })}
                </div>

                {/* Right Side: Text Descriptions */}
                <div className="relative flex-1 h-full flex items-center">
                    <div className="relative w-full max-w-lg mx-auto">
                        {features.map((feature, index) => {
                            // Same exact progress calculation for the text blocks to stay perfectly synced
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            const opacity = useTransform(
                                scrollYProgress,
                                [
                                    Math.max(0, (index - 1) * 0.2),
                                    index * 0.2,
                                    (index + 0.5) * 0.2,
                                    Math.min(1, (index + 1) * 0.2)
                                ],
                                [0, 1, 1, 0]
                            );

                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            const y = useTransform(
                                scrollYProgress,
                                [
                                    Math.max(0, (index - 1) * 0.2),
                                    index * 0.2,
                                    (index + 1) * 0.2
                                ],
                                [50, 0, -50]
                            );

                            return (
                                <motion.div
                                    key={`text-${index}`}
                                    style={{ opacity, y }}
                                    className="absolute inset-0 flex flex-col justify-center pointer-events-none"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                    >
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-xs font-mono uppercase tracking-widest mb-6">
                                            Feature 0{index + 1}
                                        </div>
                                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-[-0.02em] leading-tight mb-6">
                                            {feature.title}
                                        </h2>
                                        <p className="text-lg md:text-xl text-neutral-400 leading-relaxed font-light">
                                            {feature.description}
                                        </p>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}

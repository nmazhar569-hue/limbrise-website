"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import VaporizeTextCycle from "./vapour-text-effect";

export function ProblemStatement() {
    const container = useRef(null);

    // The container is 200vh. As the user scrolls past the top of it, 
    // it locks in place for 100vh of scrolling before releasing.
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"]
    });

    // Blur increases and opacity decreases during the second half of the scroll
    const blur = useTransform(scrollYProgress, [0.5, 0.9], ["blur(0px)", "blur(20px)"]);
    const opacity = useTransform(scrollYProgress, [0.5, 0.9], [1, 0]);

    return (
        <div ref={container} className="relative h-[200vh] w-full bg-[#030303]">
            <motion.div
                style={{ filter: blur, opacity }}
                className="sticky top-0 flex h-screen w-full items-center justify-center pointer-events-none"
            >
                <div className="w-full max-w-5xl px-6">
                    <VaporizeTextCycle
                        texts={[
                            "", // Start completely blank
                            "Traditional recovery holds you back.\n\nHands occupied.\n\nMovement limited."
                        ]}
                        loop={false}
                        font={{
                            fontFamily: "Instrument Serif, serif",
                            fontSize: "64px",
                            fontWeight: 400
                        }}
                        color="rgb(255, 255, 255)"
                        alignment="center"
                        animation={{
                            vaporizeDuration: 0.1, // Almost instant transition from the blank state
                            fadeInDuration: 2.5,   // Slow, majestic fade in of particles
                            waitDuration: 9999     // Stay on screen indefinitely
                        }}
                        density={8}
                        spread={10}
                    />
                </div>
            </motion.div>
        </div>
    );
}

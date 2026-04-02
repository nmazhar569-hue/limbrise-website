"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

export function ShinyButton({ children, className, ...props }: ShinyButtonProps) {
    return (
        <button
            className={cn(
                "relative rounded-full p-[1px] overflow-hidden group transition-snappy active:scale-95",
                className
            )}
            {...props}
        >
            {/* Outer spinning gradient ring */}
            <span className="absolute inset-[-1000%] animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0%,var(--primary)_40%,var(--accent)_50%,transparent_60%)]" />

            {/* Inner button core */}
            <div className="relative z-10 flex h-full w-full items-center justify-center rounded-full bg-[#0a0a0a] px-10 py-4 transition-snappy group-hover:bg-[#111]">
                <span className="font-sans text-sm font-medium tracking-wide text-white">
                    {children}
                </span>
            </div>

            {/* Hover glow */}
            <div className="absolute inset-0 z-0 opacity-0 bg-primary/20 blur-xl transition-snappy group-hover:opacity-100" />
        </button>
    );
}

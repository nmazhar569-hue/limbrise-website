"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MetricItem {
    label: string;
    value: string;
    color?: string;
}

interface MetricsTickerProps {
    metrics: MetricItem[];
    className?: string;
}

export function MetricsTicker({ metrics, className }: MetricsTickerProps) {
    // Duplicate the array to create a seamless infinite loop
    const duplicatedMetrics = [...metrics, ...metrics];

    return (
        <div className={cn("relative flex h-[60px] w-full items-center overflow-hidden border-y border-white/5 bg-black/40", className)}>
            <div className="flex w-max min-w-full animate-ticker items-center">
                {duplicatedMetrics.map((metric, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-3 px-8 border-r border-white/5 last:border-r-0"
                    >
                        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-500">
                            {metric.label}
                        </span>
                        <span
                            className="font-mono text-base font-semibold"
                            style={{ color: metric.color || "#fff" }}
                        >
                            {metric.value}
                        </span>
                    </div>
                ))}
                {/* We need one extra mapped loop for seamless continuous scrolling */}
                {duplicatedMetrics.map((metric, i) => (
                    <div
                        key={`extra-${i}`}
                        className="flex items-center gap-3 px-8 border-r border-white/5 last:border-r-0"
                    >
                        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-500">
                            {metric.label}
                        </span>
                        <span
                            className="font-mono text-base font-semibold"
                            style={{ color: metric.color || "#fff" }}
                        >
                            {metric.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

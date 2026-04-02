"use client";

import React from "react";
import { Copy } from "lucide-react";

interface CodeBlockProps {
    filename: string;
    code: React.ReactNode;
}

export function CodeBlock({ filename, code }: CodeBlockProps) {
    return (
        <div className="w-full max-w-3xl overflow-hidden rounded-[24px] border border-white/10 bg-[#080808]/80 shadow-[0_0_40px_-20px_rgba(224,93,56,0.3)] backdrop-blur-xl">

            {/* Top Window Bar */}
            <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-4 py-3">

                {/* Decorative Mac Controls */}
                <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-red-500/80" />
                    <div className="size-3 rounded-full bg-yellow-500/80" />
                    <div className="size-3 rounded-full bg-emerald-500/80" />
                </div>

                {/* Filename */}
                <div className="font-mono text-[11px] text-neutral-400">
                    {filename}
                </div>

                {/* Copy Button */}
                <button className="flex items-center justify-center rounded-md p-1.5 text-neutral-500 transition-snappy hover:bg-white/10 hover:text-white">
                    <Copy className="size-3.5" />
                </button>
            </div>

            {/* Code Body */}
            <div className="p-6 overflow-x-auto text-sm leading-relaxed">
                <pre className="font-mono text-neutral-300">
                    <code>
                        {code}
                    </code>
                </pre>
            </div>
        </div>
    );
}

import React from "react";

export function LimbRiseLogo({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="limbrise-teal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14b8a6" />      {/* Tailwind Teal 500 */}
          <stop offset="100%" stopColor="#0d9488" />    {/* Tailwind Teal 600 */}
        </linearGradient>
        <linearGradient id="limbrise-orange" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fb923c" />      {/* Tailwind Orange 400 */}
          <stop offset="100%" stopColor="#ea580c" />    {/* Tailwind Orange 600 */}
        </linearGradient>
      </defs>
      
      {/* Heart Outline (Teal) */}
      <path 
        d="M12 21.1l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 .5-.05 1-.15 1.48" 
        stroke="url(#limbrise-teal)" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      
      {/* Medical Plus (Orange/Peach) embedded on the right */}
      <path 
        d="M20 15v6m-3-3h6" 
        stroke="url(#limbrise-orange)" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
}

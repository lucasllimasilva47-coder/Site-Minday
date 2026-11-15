import React from 'react';

interface MascotProps {
  size?: number;
}

export default function Mascot({ size = 88 }: MascotProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" className="drop-shadow-md">
      <defs>
        <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ffd166"/>
          <stop offset="100%" stopColor="#ffb703"/>
        </linearGradient>
      </defs>
      <circle cx="64" cy="64" r="56" fill="url(#g1)"/>
      <path d="M34 40c10-12 44-12 60 0-18 2-46 2-60 0z" fill="#8b4513" opacity=".9"/>
      <circle cx="46" cy="66" r="7" fill="#1f2937"/>
      <circle cx="82" cy="66" r="7" fill="#1f2937"/>
      <path d="M48 86c10 10 22 10 32 0" stroke="#1f2937" strokeWidth="6" fill="none" strokeLinecap="round"/>
      <circle cx="34" cy="76" r="6" fill="#ffa69e"/>
      <circle cx="94" cy="76" r="6" fill="#ffa69e"/>
    </svg>
  );
}
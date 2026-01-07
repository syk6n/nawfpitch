import React from 'react';

export const EyeIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg viewBox="0 0 100 100" className={`w-[1em] h-[1em] inline-block mx-2 text-orange-500 ${className}`} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 50C20 20 80 20 95 50C80 80 20 80 5 50Z" />
    <circle cx="50" cy="50" r="15" fill="currentColor" className="opacity-20" />
    <circle cx="50" cy="50" r="8" />
  </svg>
);

export const WaveIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg viewBox="0 0 120 60" className={`w-[1.5em] h-[0.8em] inline-block mx-4 text-cyan-400 ${className}`} fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M5 30C20 5 40 5 50 30C60 55 80 55 95 30C105 10 115 50 115 30" strokeLinecap="round" />
  </svg>
);

export const ArrowIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg viewBox="0 0 100 50" className={`w-[1.2em] h-[0.6em] inline-block mx-2 text-lime-400 ${className}`} fill="none" stroke="currentColor" strokeWidth="3">
    <line x1="0" y1="25" x2="90" y2="25" />
    <polyline points="75 10 95 25 75 40" />
  </svg>
);

export const GeometricShape: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg viewBox="0 0 80 80" className={`w-[0.8em] h-[0.8em] inline-block mx-4 text-purple-400 ${className}`} fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="10" y="10" width="60" height="60" className="animate-spin-slow origin-center" />
    <circle cx="40" cy="40" r="10" fill="currentColor" />
  </svg>
);
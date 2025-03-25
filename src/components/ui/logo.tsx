import React from 'react';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={`font-bold text-2xl text-rose-500 ${className}`}>
      Tee Premium
    </div>
  );
} 
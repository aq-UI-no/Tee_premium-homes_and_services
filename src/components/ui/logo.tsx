import * as React from 'react';
import styles from './logo.module.css';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={`${className} ${styles.logoContainer}`}>
      <img
        src="/images/TEE PREMIUM HOMES & SERVICES logo for website.svg"
        alt="Tee Premium Homes & Services"
        className={`h-10 w-auto ${styles.logoImage}`}
      />
    </div>
  );
} 
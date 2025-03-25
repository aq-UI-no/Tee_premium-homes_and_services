import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../ui/logo';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: React.ReactNode;
  footerText?: string;
  footerLink?: {
    text: string;
    href: string;
  };
}

export function AuthLayout({
  children,
  title,
  subtitle,
  footerText,
  footerLink
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <Link to="/" className="mb-6">
            <Logo className="h-12 w-auto" />
          </Link>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-center text-sm text-gray-600">
              {subtitle}
            </p>
          )}
        </div>

        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>

        {footerText && footerLink && (
          <p className="mt-4 text-center text-sm text-gray-600">
            {footerText}{' '}
            <Link
              to={footerLink.href}
              className="font-medium text-rose-500 hover:text-rose-400"
            >
              {footerLink.text}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
} 
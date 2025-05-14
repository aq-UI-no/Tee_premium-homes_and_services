import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from '../navigation';
import { Footer } from '../footer';
import { Toaster } from '../ui/toaster';
import { ScrollToTop } from '../utils/scroll-to-top';

interface MainLayoutProps {
  children?: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {children || <Outlet />}
      </main>
      <Footer />
      <Toaster />
      <ScrollToTop />
    </div>
  );
} 
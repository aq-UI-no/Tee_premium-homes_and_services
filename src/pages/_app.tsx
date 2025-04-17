import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { registerServiceWorker } from '../utils/serviceWorker';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="description" content="Your trusted partner in premium real estate solutions and property management services" />
        
        {/* PWA Meta Tags */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Tee Premium" />
        
        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.png" />
        
        <title>Tee Premium Homes & Services</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp; 
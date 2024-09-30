import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { PropsWithChildren } from 'react';
import { Nav } from '@/components/nav';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Ticketing app',
  description: 'Generated by NAG coding',
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className='flex flex-col h-screen max-h-screen'>
          <Nav />

          <div className='flex-grow overflow-y-auto bg-page text-default-text'>{children}</div>
        </div>
      </body>
    </html>
  );
}

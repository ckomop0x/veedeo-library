import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';
import Providers from '@/app/providers';
import Nav from '@/components/Nav/Nav';

export const metadata: Metadata = {
  title: 'Veedeo Library',
  description: 'Browse your videos',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <Providers>
          <main className="max-w-6xl mx-auto mt-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

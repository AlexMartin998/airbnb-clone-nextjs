import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';

import { LoginModal, Navbar, RegisterModal } from '@/shared/components';
import { ToasterProvider } from '@/shared/components/providers/ToasterProvider';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Navbar />
        <RegisterModal />
        <LoginModal />
        <ToasterProvider />

        {children}
      </body>
    </html>
  );
}

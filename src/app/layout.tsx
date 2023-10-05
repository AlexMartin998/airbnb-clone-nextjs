import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { Modal, Navbar } from '@/shared/components';

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
        <Modal isOpen />

        {children}
      </body>
    </html>
  );
}

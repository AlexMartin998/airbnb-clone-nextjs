import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';

import { LoginModal, Navbar, RegisterModal } from '@/shared/components';
import { ToasterProvider } from '@/shared/components/providers/ToasterProvider';
import { getCurrentUser } from '@/auth/actions';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={nunito.className}>
        <Navbar currentUser={currentUser} />
        <RegisterModal />
        <LoginModal />
        <ToasterProvider />

        {children}
      </body>
    </html>
  );
}

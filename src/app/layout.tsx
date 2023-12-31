import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';

import { getCurrentUser } from '@/auth/actions';
import {
  LoginModal,
  Navbar,
  RegisterModal,
  RentModal,
  SearchModal,
} from '@/shared/components';
import { ToasterProvider } from '@/shared/components/providers/ToasterProvider';

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
        <RentModal />
        <SearchModal />
        <ToasterProvider />

        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}

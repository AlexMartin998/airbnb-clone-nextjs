'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { categories } from '@/shared/components/ui/Navbar/Categories/categories';
import { SafeListing, SafeReservation, SafeUser } from '@/shared/types';
import { useLoginModal } from '@/store/useLoginModal';
import { Container } from '@/shared/components';

export type ListingClientProps = {
  currentUser?: SafeUser | null;
  listing: SafeListing & { user: SafeUser };
  reservations?: SafeReservation[];
};

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);

  // categories
  const category = useMemo(() => {
    return categories.find(items => items.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto"></div>
    </Container>
  );
};

export default ListingClient;

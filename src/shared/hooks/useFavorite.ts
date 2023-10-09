import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';

import { useLoginModal } from '@/store/useLoginModal';
import { airbnbApi } from '../lib';
import { SafeUser } from '../types';

type IUseFavorite = {
  listingId: string;
  currentUser?: SafeUser | null;
};

export const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const onOpenLoginModal = useLoginModal(s => s.onOpen);

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!currentUser) return onOpenLoginModal();

      let request;

      try {
        if (hasFavorited)
          request = () => airbnbApi.delete(`/favorites/${listingId}`);
        else request = () => airbnbApi.post(`/favorites/${listingId}`);

        await request();
        router.refresh();
        toast.success('Success');
      } catch (error) {
        toast.error('Something went wrong.');
      }
    },
    [currentUser, hasFavorited, listingId, onOpenLoginModal, router]
  );

  return { hasFavorited, toggleFavorite };
};

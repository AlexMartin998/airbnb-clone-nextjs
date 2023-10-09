import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';

import { SafeUser } from '../types';

type IUseFavorite = {
  listingId: string;
  currentUser?: SafeUser | null;
};

export const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
	 
	const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  return {hasFavorited};
};

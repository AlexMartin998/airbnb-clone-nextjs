import { getCurrentUser } from '@/auth/actions';
import { db } from '@/shared/lib/prismadb';

export const getFavoriteListings = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return [];

    const favorites = await db.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    return favorites;
  } catch (error: any) {
    throw new Error(error);
  }
};

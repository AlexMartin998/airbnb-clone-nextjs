import { IListingsParams } from '@/shared/interfaces';
import { db } from '@/shared/lib/prismadb';

export const getListings = async (params: IListingsParams) => {
  const {
    userId,
    roomCount,
    guestCount,
    bathroomCount,
    locationValue,
    startDate,
    endDate,
    category,
  } = params;

  try {
    let query: any = {};

    if (userId) query.userId = userId;

    const listings = await db.listing.findMany({
      where: query,
      orderBy: { createdAt: 'desc' },
    });

    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
};

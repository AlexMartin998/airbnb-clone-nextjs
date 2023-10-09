import { db } from '@/shared/lib/prismadb';

type Params = {
  listingId?: string;
};

export const getListingById = async ({ listingId }: Params) => {
  try {
    const listing = await db.listing.findUnique({
      where: { id: listingId },
      include: { user: true },
    });
    if (!listing) return null;

    return listing;
  } catch (error) {
    throw new Error(error as any);
  }
};

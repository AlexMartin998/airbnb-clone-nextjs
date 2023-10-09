import { db } from '@/shared/lib/prismadb';

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export const getReservations = async (params: IParams) => {
  const { listingId, userId, authorId } = params;

  // query by several criterias - more flexible
  const query: any = {};
  if (listingId) query.listingId = listingId;
  if (userId) query.userId = userId;
  if (authorId) query.listing = { userId: authorId };

  try {
    const reservations = await db.reservation.findMany({
      where: query,
      include: { listing: true },
      orderBy: { createdAt: 'desc' },
    });

    return reservations;
  } catch (error: any) {
    throw new Error(error);
  }
};

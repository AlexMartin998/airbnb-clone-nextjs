import { NextResponse } from 'next/server';

import { getCurrentUser } from '@/auth/actions';
import { db } from '@/shared/lib/prismadb';

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const { reservationId } = params;
  if (!reservationId || typeof reservationId !== 'string')
    throw new Error('Invalid ID');

  // remove reservation
  const reservation = await db.reservation.deleteMany({
    where: {
      id: reservationId,
      // only cancel the owner of reservation or the listing owner
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  });

  return NextResponse.json(reservation);
}

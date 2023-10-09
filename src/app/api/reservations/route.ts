import { NextResponse } from 'next/server';

import { getCurrentUser } from '@/auth/actions';
import { db } from '@/shared/lib/prismadb';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const body = await request.json();
  const { listingId, startDate, endDate, totalPrice } = body;
  if (!listingId || !startDate || !endDate || !totalPrice)
    return NextResponse.error();

  // // UPD listing & Save reservation
  const listingAndReservation = await db.listing.update({
    where: { id: listingId },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });

  return NextResponse.json(listingAndReservation, { status: 201 });
}

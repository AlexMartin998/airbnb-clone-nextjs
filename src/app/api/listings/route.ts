import { NextResponse } from 'next/server';

import { db } from '@/shared/lib/prismadb';
import { getCurrentUser } from '@/auth/actions';
import { listingSchema } from '@/shared/utils';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const body = await request.json();
  const data = await listingSchema.validate(body);
  if (!data)
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });

  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  const listing = await db.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing, { status: 201 });
}

import { Listing, Reservation, User } from '@prisma/client';

export type SafeUser = Omit<User, 'hashedPassword'>;

export type SafeListing = Listing;

export type SafeReservation = Reservation;

import { NextPage } from 'next';

import { getReservations } from '@/airbnb/actions';
import { EmptyState } from '@/airbnb/components';
import { getCurrentUser } from '@/auth/actions';
import { ReservationsClient } from './components';

export type pageProps = {};

const ReservationsPage: NextPage<pageProps> = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser)
    return <EmptyState title="Unauthorized" subtitle="Please login" />;

  // reservations of all our airbnb
  const reservations = await getReservations({ authorId: currentUser.id });
  if (reservations.length === 0)
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations on your properties."
      />
    );

  return (
    <ReservationsClient reservations={reservations} currentUser={currentUser} />
  );
};

export default ReservationsPage;

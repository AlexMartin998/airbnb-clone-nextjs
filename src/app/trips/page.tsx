import { NextPage } from 'next';

import { getReservations } from '@/airbnb/actions';
import { EmptyState } from '@/airbnb/components';
import { getCurrentUser } from '@/auth/actions';
import { TripsClient } from './components';

export type pageProps = {};

const TripsPage: NextPage<pageProps> = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser)
    return <EmptyState title="Unauthorized" subtitle="Please login" />;

  const reservations = await getReservations({ userId: currentUser.id });
  if (reservations.length === 0)
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you havent reserved any trips."
      />
    );

  return <TripsClient reservations={reservations} currentUser={currentUser} />;
};

export default TripsPage;

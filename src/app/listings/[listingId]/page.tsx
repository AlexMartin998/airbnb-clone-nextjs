import { getListingById, getReservations } from '@/airbnb/actions';
import { EmptyState } from '@/airbnb/components';
import { getCurrentUser } from '@/auth/actions';
import { ListingClient } from '../components';

export type pageProps = {
  params: IParams;
};
type IParams = {
  listingId?: string; // <--  dir name  [listingId]  <- dynamic routes
};

// as a Server Component we can get url params as a Prop
const ListingPage: React.FC<pageProps> = async ({ params }) => {
  const listing = await getListingById(params);
  if (!listing) return <EmptyState />;

  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);

  return (
    <ListingClient
      listing={listing}
      currentUser={currentUser}
      reservations={reservations}
    />
  );
};

export default ListingPage;

import { NextPage } from 'next';

import { getFavoriteListings } from '@/airbnb/actions';
import { EmptyState } from '@/airbnb/components';
import { getCurrentUser } from '@/auth/actions';
import { FavoritesClient } from './components';

export type pageProps = {};

const FavoritesPage: NextPage<pageProps> = async () => {
  const currentUser = await getCurrentUser();
  const listings = await getFavoriteListings();

  if (!listings.length)
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listings."
      />
    );

  return <FavoritesClient listings={listings} currentUser={currentUser} />;
};

export default FavoritesPage;

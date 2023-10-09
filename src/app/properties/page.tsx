import { NextPage } from 'next';

import { getListings } from '@/airbnb/actions';
import { EmptyState } from '@/airbnb/components';
import { getCurrentUser } from '@/auth/actions';
import { PropertiesClient } from './components';

export type pageProps = {};

const PropertiesPage: NextPage<pageProps> = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser)
    return <EmptyState title="Unauthorized" subtitle="Please login" />;

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0)
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like you have no properties."
      />
    );

  return <PropertiesClient listings={listings} currentUser={currentUser} />;
};

export default PropertiesPage;

import { NextPage } from 'next';

import { getListings } from '@/airbnb/actions';
import { EmptyState, ListingCard } from '@/airbnb/components';
import { getCurrentUser } from '@/auth/actions';
import { Container } from '@/shared/components';
import { IListingsParams } from '@/shared/interfaces';

export type HomeProps = {
  searchParams: IListingsParams;
};

// as a Server Component we can get url params as a Props
const Home: NextPage<HomeProps> = async ({ searchParams }) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div className=" pt-24 grid  grid-cols-1  sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map(listing => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};

export default Home;

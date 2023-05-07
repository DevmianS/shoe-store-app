import Head from 'next/head';
import {useRouter} from 'next/router';

import NavBarLayout from '@/components/Layout/NavBarLayout';

const SearchResults = () => {
  const {query} = useRouter();
  const {name} = query;

  // This is just an example: http://localhost:3000/search/results?name=bruno

  return (
    <>
      <Head>
        <title>Search results</title>
      </Head>
      <NavBarLayout>
        <div>
          <h1>ErrorPage</h1>
          <p>{name && name}</p>
          {/* This should show bruno */}
        </div>
      </NavBarLayout>
    </>
  );
};

export default SearchResults;

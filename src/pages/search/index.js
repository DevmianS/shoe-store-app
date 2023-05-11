import Head from 'next/head';

import NavBarLayout from '@/components/Layout/NavBarLayout';

const Search = () => {
  return (
    <>
      <Head>
        <title>Wellrun | Search</title>
      </Head>
      <NavBarLayout>
        <div>Search</div>
      </NavBarLayout>
    </>
  );
};

export default Search;

import Head from 'next/head';
import NavBarLayout from '@/components/Layout/NavBarLayout';

import Root from '@/components/UI/Root';
import Home from '@/components/Layout/Home';
import {useSession, getSession} from 'next-auth/react';

import Loading from '@/components/UI/Loading';

const Index = () => {
  //Client option
  const {status} = useSession();

  const render = () => {
    switch (status) {
      case 'loading':
        return <Loading />;
      case 'authenticated':
        return (
          <NavBarLayout>
            <Home />
          </NavBarLayout>
        );
      default:
        return <Root />;
    }
  };

  return (
    <>
      <Head>
        <title>Wellrun | Home</title>
      </Head>
      {/* {render()} */}
      <NavBarLayout>
        <Home />
      </NavBarLayout>
    </>
  );
};

export default Index;

// Server way without showing important code to the users EJ: ADMIN PANEL
/* export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    // Redirect the user to the login page or show an error message
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

} 
 */

import Head from 'next/head';

import NavBarLayout from '@/components/Layout/NavBarLayout';

const ForgotPassword = () => {
  return (
    <>
      <Head>
        <title>Forgot password</title>
      </Head>
      <NavBarLayout>
        <div>ForgotPassword</div>
      </NavBarLayout>
    </>
  );
};

export default ForgotPassword;

import Head from 'next/head';

import NavBarLayout from '@/components/Layout/NavBarLayout';

import Banner from '@/components/UI/Banner';

const ResetPassword = () => {
  return (
    <>
      <Head>
        <title>Reset password</title>
      </Head>
      <NavBarLayout>
        <div>Reset password</div>
      </NavBarLayout>
    </>
  );
};

export default ResetPassword;

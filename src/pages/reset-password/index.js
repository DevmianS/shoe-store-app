import Head from 'next/head';

import NavBarLayout from '@/components/Layout/NavBarLayout';

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

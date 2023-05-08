import React from 'react';
import SignLayout from '@/components/Layout/SignLayout';
import SignInForm from '@/components/Form/SignInForm';

import Head from 'next/head';

const SignIn = () => {
  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <SignLayout form={<SignInForm />} src="/product8.jpg"></SignLayout>
    </>
  );
};

export default SignIn;

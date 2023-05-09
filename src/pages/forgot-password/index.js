import Head from 'next/head';

import SignLayout from '@/components/Layout/SignLayout';
import ForgotPasswordForm from '@/components/Form/ForgotPasswordForm';

const ForgotPassword = () => {
  return (
    <>
      <Head>
        <title>Wellrun | Forgot password</title>
      </Head>

      <SignLayout form={<ForgotPasswordForm />} src="/forgotPassword.jpg" />
    </>
  );
};

export default ForgotPassword;

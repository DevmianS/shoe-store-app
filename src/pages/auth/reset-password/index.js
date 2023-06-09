import Head from 'next/head';

import SignLayout from '@/components/Layout/SignLayout';
import ResetPasswordForm from '@/components/Form/ResetPasswordForm';

const ResetPassword = () => {
  return (
    <>
      <Head>
        <title>Wellrun | Reset Password</title>
      </Head>

      <SignLayout form={<ResetPasswordForm />} src="/forgotPassword.jpg" />
    </>
  );
};

export default ResetPassword;

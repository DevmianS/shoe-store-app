import SignLayout from '@/components/Layout/SignLayout';
import SignUpForm from '@/components/UI/SignUpForm';
import ReviewsCarousel from '@/components/UI/ReviewsCarousel';

import Head from 'next/head';

const SignUp = () => {
  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>

      <SignLayout
        form={<SignUpForm />}
        carrusel={<ReviewsCarousel />}
        src="/product2.jpg"
      ></SignLayout>
    </>
  );
};

export default SignUp;

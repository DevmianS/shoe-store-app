import React from 'react';

import SignLayout from '@/components/Layout/SignLayout';
import SignUpForm from '@/components/UI/SignUpForm';
import ReviewsCarousel from '@/components/UI/ReviewsCarousel';

const SignUp = () => {
  return (
    <SignLayout
      form={<SignUpForm />}
      carrusel={<ReviewsCarousel />}
      src="/product8.jpg"
    ></SignLayout>
  );
};

export default SignUp;

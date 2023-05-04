import React from 'react';
import style from './index.module.css';
import Button from '@/components/UI/Button/Button';
import Banner from '@/assets/product8.jpg';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const SignIn = () => {
  const handleSignIn = () => {
    console.log("Clicked");
  };

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <div className={style.signInContainer}>
        <main className={style.signInForm}>
          <div>Welcome back</div>
          <div>
            Welcome back! Please enter your details to log into your account.
          </div>
          <div>
            Email <div>Input Email</div>
          </div>
          <div>
            Password <div>Input Password</div>
          </div>
          <div>Remember me Forgot Password</div>
          <Button
            size="medium"
            children={'Sign in'}
            onClick={handleSignIn}
          />
          <div>
            Don't have an account? <Link href="/sign-up">Sign up</Link>
          </div>
        </main>
        <Image src={Banner} alt="banner" width="960" height="1080" />
      </div>
    </>
  );
};

export default SignIn;

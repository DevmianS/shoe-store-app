import React, {useState} from 'react';
import style from './index.module.css';
import Button from '@/components/UI/Button/Button';
import Banner from '@/assets/product8.jpg';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {Checkbox} from '@mui/material';

const SignIn = () => {
  const [rememberMe, setRememberMe] = useState(false);

  const handleCheckbox = event => {
    setRememberMe(event.target.checked);
  };

  const handleSignIn = () => {
    console.log('Clicked');
  };

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <div className={style.signInContainer}>
        <main className={style.signInForm}>
          <h1 className={style.signInForm__welcomeTitle}>Welcome back</h1>
          <p className={style.signInForm__welcomeDescription}>
            Welcome back! Please enter your details to log into your account.
          </p>
          <form>
            <div>Email</div>
            <input />
            <div>Password</div>
            <input />
            <div>
              <Checkbox label="Remember me" onChange={handleCheckbox} />
              <Link href="/reset-password">Forgot password?</Link>
            </div>
            <Button size="medium" children={'Sign in'} onClick={handleSignIn} />
          </form>
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

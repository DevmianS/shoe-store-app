import Head from 'next/head';

import ErrorPageTpl from '@/components/Layout/ErrorPageTpl';
import errorImg from '@/assets/background2.jpg';

function ErrorPage500() {
  const pageTitle = 'We lost that page...!';
  const msgText = `We're sorry, but the page you're looking for is currently unavailable. Our team has been notified of the issue and is working to resolve it as quickly as possible. In the meantime, please try again later or contact us if you continue to experience this problem. Thank you for your patience`;

  return (
    <>
      <Head>
        <title>Server error</title>
      </Head>
      <ErrorPageTpl
        boxImg={errorImg}
        text={msgText}
        title={pageTitle}
        mobileWhite
      />
    </>
  );
}

export default ErrorPage500;

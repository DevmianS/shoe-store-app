import Head from 'next/head';

import NavBarLayout from '@/components/Layout/NavBarLayout';
import ErrorLayout from '@/components/Layout/Error';

function ErrorPage500() {
  const title = 'We lost that page...!';
  const message = `We're sorry, but the page you're looking for is currently unavailable. Our team has been notified of the issue and is working to resolve it as quickly as possible. In the meantime, please try again later or contact us if you continue to experience this problem. Thank you for your patience`;

  return (
    <>
      <Head>
        <title>Wellrun | 500 Error</title>
      </Head>
      <NavBarLayout>
        <ErrorLayout title={title} text={message} image={'/500.png'} />
      </NavBarLayout>
    </>
  );
}

export default ErrorPage500;

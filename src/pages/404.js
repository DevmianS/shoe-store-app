import Head from 'next/head';

import NavBarLayout from '@/components/Layout/NavBarLayout';
import ErrorLayout from '@/components/Layout/Error';

function ErrorPage404() {
  const title = 'Client error!';
  const message =
    "We're sorry, but the page you requested cannot be found. It may have been removed, had its name changed, or is temporarily unavailable. Please check the URL for proper spelling and capitalization, or try searching for the page using our site search feature. If you continue to experience problems, please contact our support team for assistance.";

  return (
    <>
      <Head>
        <title>Wellrun | 404 Error</title>
      </Head>
      <NavBarLayout sidebarVisible={false}>
        <ErrorLayout title={title} text={message} image={'/404.png'} />
      </NavBarLayout>
    </>
  );
}

export default ErrorPage404;

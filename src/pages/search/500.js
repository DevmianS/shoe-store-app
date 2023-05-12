import Head from 'next/head';

import ErrorPageTpl from '@/components/Layout/ErrorPageTpl';
import error500 from '@/assets/500.png';

function ErrorFilter500() {
  const pageTitle = '500! Server error!';
  const msgText = `We're sorry, the page you're looking for can't be found. It's
                possible that the page has been removed, renamed, or is
                temporarily unavailable. Please check the URL and try again, or
                use the navigation menu to explore our site.`;

  return (
    <>
      <Head>
        <title>Wellrun | Server Error</title>
      </Head>
      <ErrorPageTpl img={error500} text={msgText} title={pageTitle} />
    </>
  );
}

export default ErrorFilter500;

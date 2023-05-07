import ErrorPageTpl from '@/components/Layout/ErrorPageTpl';
import error404 from '@/assets/404.png';

function ErrorFilter404() {
  const pageTitle = '404! Client error!';
  const msgText = `Oops, something went wrong! We are experiencing technical difficulties and our team is working to fix the issue as soon as possible. We apologize for any inconvenience this may have caused. Please try again later or contact support for assistance.`;

  return <ErrorPageTpl img={error404} text={msgText} title={pageTitle} />;
}

export default ErrorFilter404;

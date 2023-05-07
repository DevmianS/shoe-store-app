import ErrorPageTpl from '@/components/Layout/ErrorPageTpl';
import errorImg from '@/assets/background.jpg';

function ErrorPage404() {
  const pageTitle = 'Error 404!';
  const msgText =
    "We're sorry, but the page you requested cannot be found. It may have been removed, had its name changed, or is temporarily unavailable. Please check the URL for proper spelling and capitalization, or try searching for the page using our site search feature. If you continue to experience problems, please contact our support team for assistance.";

  return <ErrorPageTpl boxImg={errorImg} text={msgText} title={pageTitle} />;
}

export default ErrorPage404;

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Provider as IntlProvider } from 'react-intl-redux';

import '../src/styles/globals.css';
import '../src/styles/ckeditor.css';
import '../src/assets/font-icons/style.css';

import { Loading } from '../src/components';
import { useModalState } from '../src/hooks';
import store, { wrapper } from '../src/redux/store';
import { scrollToElement } from '../src/utils';
import { NotificationProvider } from '../src/providers';
import { getLoading } from '../src/redux/ducks/loading.duck';
import { gaService } from '../src/services';

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const [openModal, setModalStatus] = useModalState(false);
  const loading = useSelector(getLoading);
  // Hacking window is not defined on SSR
  if (typeof window === 'undefined') {
    global.window = {};
  }

  useEffect(() => {
    /**
     * Fix jss styles CSR not match with SSR
     */
    const style = document.getElementById('server-side-styles');
    if (style) {
      style.parentNode.removeChild(style);
    }

    /**
     * Scroll to specify element or top
     */
    if (window.location.hash) {
      setTimeout(() => {
        scrollToElement(window.location.hash.split('#')[1]);
      }, 500);
    } else {
      window.scrollTo(0, 0);
    }

    /**
     * Enable/disable loading state when routes changed
     */
    const handleStart = () => {
      setModalStatus(true);
    };
    const handleComplete = (url) => {
      gaService.pageview(url);
      setModalStatus(false);
      window.scrollTo(0, 0);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  return (
    <IntlProvider store={store}>
      <NotificationProvider>
        <Component {...pageProps} />
        <Loading open={loading || openModal} />
      </NotificationProvider>
    </IntlProvider>
  );
};
MyApp.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.object.isRequired,
};

// If you're using Next.js 9.3 or newer, we recommend that you use getStaticProps or getServerSideProps instead of getInitialProps.
// Details: https://nextjs.org/docs/api-reference/data-fetching/getInitialProps

// But: App currently does not support Next.js Data Fetching methods like getStaticProps or getServerSideProps.
// Details https://nextjs.org/docs/advanced-features/custom-app#caveats

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default wrapper.withRedux(MyApp);

import { GA_MEASUREMENT_ID } from '../../configs';

const pageview = (url) => {
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

const event = ({ action, params }) => {
  window.gtag('event', action, params);
};

export default {
  pageview,
  event,
};

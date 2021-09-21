import Head from 'next/head';
import PropTypes from 'prop-types';

import { DEFAULT_SEO, LANDING_PAGE_DOMAIN } from '../../../configs';

const SEO = ({
  url,
  title,
  image,
  creator,
  keywords,
  siteName,
  children,
  description,
}) => {
  const defaultTitle = title || DEFAULT_SEO.TITLE;
  const defaultUrl = url || DEFAULT_SEO.URL;
  const defaultSiteName = siteName || DEFAULT_SEO.TITLE;
  const defaultCreator = creator || DEFAULT_SEO.CREATOR;
  const defaultKeywords = keywords || DEFAULT_SEO.KEYWORDS;
  const defaultDescription = description || DEFAULT_SEO.DESCRIPTION;
  const ogImage =
    image || `${LANDING_PAGE_DOMAIN}/static/icons/logo-512x512.png`;
  const twitterImage =
    image || `${LANDING_PAGE_DOMAIN}/static/icons/apple-touch-icon.png`;

  return (
    <Head>
      <title>{defaultTitle}</title>
      <meta name="theme-color" content="#FFFFFF" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={defaultDescription} />
      <meta name="keywords" content={defaultKeywords} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={defaultTitle} />
      <meta property="og:description" content={defaultDescription} />
      <meta property="og:site_name" content={defaultSiteName} />
      <meta property="og:url" content={defaultUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:type" content="image/*" />
      <meta property="og:image:width" content="400" />
      <meta property="og:image:height" content="300" />
      <meta property="og:image:alt" content={title} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={defaultTitle} />
      <meta name="twitter:description" content={defaultDescription} />
      <meta name="twitter:site" content={defaultSiteName} />
      <meta name="twitter:creator" content={defaultCreator} />
      <meta name="twitter:image" content={twitterImage} />
      <link rel="canonical" href={LANDING_PAGE_DOMAIN} />
      {children}
    </Head>
  );
};
SEO.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  image: PropTypes.string,
  children: PropTypes.node,
  creator: PropTypes.string,
  keywords: PropTypes.string,
  siteName: PropTypes.string,
  description: PropTypes.string,
};
SEO.defaultProps = {
  title: '',
  url: '',
  image: '',
  creator: '',
  keywords: '',
  siteName: '',
  description: '',
  children: undefined,
};

export default SEO;

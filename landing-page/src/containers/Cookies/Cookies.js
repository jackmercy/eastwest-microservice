import { memo } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

import { SEO } from '../../components';
import { Layout, Header, Footer } from '../components';
import { DEFAULT_SEO } from '../../../configs';
import { PrivacyContent } from '../Privacy';
import useStyles from '../Terms/terms.styles';

const Cookies = () => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Layout>
      <SEO {...DEFAULT_SEO.PAGES.COOKIES} />
      <Header />
      <div className={classes.teaser} data-test="cookies-teaser-image">
        <div className={classNames(classes.layout, classes.teaserContent)}>
          <h1 className={classes.teaserTitle} data-test="cookies-teaser-title">
            {intl.formatMessage({ id: 'COOKIES.TEASER.TITLE' })}
          </h1>
        </div>
      </div>
      <div className={classNames(classes.layout, classes.content)}>
        <PrivacyContent />
      </div>
      <Footer />
    </Layout>
  );
};

export default memo(Cookies);

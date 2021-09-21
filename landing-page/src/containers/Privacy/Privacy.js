import { memo } from 'react';
import { useIntl } from 'react-intl';

import { SEO } from '../../components';
import {
  Layout,
  Header,
  Footer,
  Content as ContentLayout,
} from '../components';
import { DEFAULT_SEO } from '../../../configs';
import useStyles from '../Terms/terms.styles';

import Content from './Content';

const Privacy = () => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Layout>
      <SEO {...DEFAULT_SEO.PAGES.PRIVACY} />
      <Header />
      <div className={classes.teaser} data-test="privacy-teaser-image">
        <ContentLayout className={classes.teaserContent}>
          <h1 className={classes.teaserTitle} data-test="privacy-teaser-title">
            {intl.formatMessage({ id: 'PRIVACY.TEASER.TITLE' })}
          </h1>
        </ContentLayout>
      </div>
      <ContentLayout className={classes.content}>
        <Content />
      </ContentLayout>
      <Footer />
    </Layout>
  );
};

export default memo(Privacy);

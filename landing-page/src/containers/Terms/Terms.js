import { memo } from 'react';
import { useIntl } from 'react-intl';

import { SEO } from '../../components';
import { DEFAULT_SEO } from '../../../configs';
import {
  Layout,
  Header,
  Footer,
  Content as ContentLayout,
} from '../components';

import Content from './Content';
import useStyles from './terms.styles';

const Terms = () => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Layout>
      <SEO {...DEFAULT_SEO.PAGES.TERMS} />
      <Header />
      <div className={classes.teaser} data-test="terms-teaser-image">
        <ContentLayout className={classes.teaserContent}>
          <h1 className={classes.teaserTitle} data-test="terms-teaser-title">
            {intl.formatMessage({ id: 'TERMS.TEASER.TITLE' })}
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

export default memo(Terms);

import { memo } from 'react';
import { useRouter } from 'next/router';

import { SEO } from '../../components';
import { DEFAULT_SEO } from '../../../configs';
import { Layout, Header, Footer } from '../components';

import Brands from './Brands';
import Influencers from './Influencers';
import useStyles from './dataLabs.styles';

const DataLabs = () => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Layout className={classes.layout}>
      <SEO {...DEFAULT_SEO.PAGES.DATA_LABS} />
      <Header />
      {router.query.isBrands === 'false' ? <Influencers /> : <Brands />}
      <Footer />
    </Layout>
  );
};

export default memo(DataLabs);

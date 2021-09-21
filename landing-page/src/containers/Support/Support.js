import { memo } from 'react';

import { SEO } from '../../components';
import { DEFAULT_SEO } from '../../../configs';
import { Layout, Header, Footer } from '../components';

const Support = () => (
  <Layout>
    <SEO {...DEFAULT_SEO.PAGES.SUPPORT} />
    <Header />
    <div>
      <h1>This is Support Page</h1>
      <p>Comming soon</p>
    </div>
    <Footer />
  </Layout>
);

export default memo(Support);

import { memo } from 'react';

import { SEO } from '../../components';
import { DEFAULT_SEO } from '../../../configs';
import { Layout, Header, Footer, ComingSoon } from '../components';

const CreateTicket = () => (
  <Layout>
    <SEO {...DEFAULT_SEO.PAGES.CREATE_TICKET} />
    <Header />
    <ComingSoon />
    <Footer />
  </Layout>
);

export default memo(CreateTicket);

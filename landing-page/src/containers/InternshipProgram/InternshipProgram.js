import { memo } from 'react';

import { SEO } from '../../components';
import { DEFAULT_SEO } from '../../../configs';
import { Layout, Header, Footer, ComingSoon } from '../components';

const InternshipProgram = () => (
  <Layout>
    <SEO {...DEFAULT_SEO.PAGES.INTERNSHIP} />
    <Header />
    <ComingSoon />
    <Footer />
  </Layout>
);

export default memo(InternshipProgram);

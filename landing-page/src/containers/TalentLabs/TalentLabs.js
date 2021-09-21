import { memo } from 'react';

import { SEO } from '../../components';
import { DEFAULT_SEO } from '../../../configs';
import { Layout, Header, Footer } from '../components';
import CreateProject from '../HomePage/CreateProject';

import Teaser from './Teaser';
import Technologies from './Technologies';
import Products from './Products';
import Partners from './Partners';
import useStyles from './talentLabs.styles';

const TalentLabs = () => {
  const classes = useStyles();

  return (
    <Layout className={classes.layout}>
      <SEO {...DEFAULT_SEO.PAGES.TALENT_LABS} />
      <Header />
      <Teaser />
      <Technologies />
      <Products />
      <Partners />
      <CreateProject />
      <Footer />
    </Layout>
  );
};

export default memo(TalentLabs);

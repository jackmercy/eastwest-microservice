import { memo } from 'react';

import { SEO } from '../../components';
import { DEFAULT_SEO } from '../../../configs';
import { Layout, Header, Footer } from '../components';

import Teaser from './Teaser';
import AboutUs from './AboutUs';
import Partners from './Partners';
import OurOffice from './OurOffice';
import ContactUs from './ContactUs';
import TalentLabs from './TalentLabs';
// MVP hide until have video url replacement
// import Introduction from './Introduction';
import CreateProject from './CreateProject';
import useStyles from './homePage.styles';

const HomePage = () => {
  const classes = useStyles();

  return (
    <Layout className={classes.layout}>
      <SEO {...DEFAULT_SEO.PAGES.HOME} />
      <Header />
      <Teaser />
      <TalentLabs />
      <AboutUs />
      <Partners />
      {/* <Introduction /> */}
      <OurOffice />
      <ContactUs />
      <CreateProject />
      <Footer />
    </Layout>
  );
};

export default memo(HomePage);

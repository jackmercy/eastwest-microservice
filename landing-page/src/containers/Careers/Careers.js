import { memo, useMemo } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { SEO } from '../../components';
import { DEFAULT_SEO } from '../../../configs';
import { Layout, Header, Footer, Content } from '../components';

import Teaser from './Teaser';
import OurMission from './OurMission';
import CoreValues from './CoreValues';
import Benefits from './Benefits';
import Opportunities from './Opportunities';
import { MenuScrollableLayout } from './components';

import useStyles from './careers.styles';

const Careers = ({ categories, vacancies }) => {
  const intl = useIntl();
  const classes = useStyles();
  const isShownVacancySection = useMemo(
    () => categories.count > 0 && vacancies.count > 0,
    [categories, vacancies],
  );
  const ids = useMemo(
    () => ['our-mission', 'core-values', 'benefits', 'opportunities'],
    [],
  );
  const menuConfigs = useMemo(
    () => [
      {
        id: ids[0],
        label: intl.formatMessage({ id: 'CAREERS.MENU.01' }),
      },
      {
        id: ids[1],
        label: intl.formatMessage({ id: 'CAREERS.MENU.02' }),
      },
      {
        id: ids[2],
        label: intl.formatMessage({ id: 'CAREERS.MENU.03' }),
      },
      ...(isShownVacancySection
        ? [
          {
            id: ids[3],
            label: intl.formatMessage({ id: 'CAREERS.MENU.04' }),
          },
        ]
        : []),
    ],
    [intl, vacancies],
  );

  return (
    <Layout>
      <SEO {...DEFAULT_SEO.PAGES.CAREERS} />
      <Header />
      <Teaser CTAId={ids[3]} />
      <Content className={classes.menuScrollableLayout}>
        <MenuScrollableLayout menuConfigs={menuConfigs}>
          <OurMission id={ids[0]} />
          <CoreValues id={ids[1]} />
          <Benefits id={ids[2]} />
          {isShownVacancySection ? (
            <Opportunities
              id={ids[3]}
              categories={categories}
              vacancies={vacancies}
            />
          ) : null}
        </MenuScrollableLayout>
      </Content>
      <Footer />
    </Layout>
  );
};
Careers.propTypes = {
  categories: PropTypes.shape({
    count: PropTypes.number,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    ),
  }),
  vacancies: PropTypes.shape({
    count: PropTypes.number,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        subTitle: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
      }),
    ),
  }),
};
Careers.defaultProps = {
  categories: { count: 0, data: [] },
  vacancies: { count: 0, data: [] },
};

export default memo(Careers);

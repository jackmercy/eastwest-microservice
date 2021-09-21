import { useRouter } from 'next/router';
import { memo, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

import { SEO } from '../../components';
import { Layout, Header, Footer, Content } from '../components';
import { scrollToElement } from '../../utils';
import { LANDING_PAGE_DOMAIN } from '../../../configs';

import Teaser from './Teaser';
import JobDescription from './JobDescription';
import Application from './Application';
import useStyles from './vacancy.styles';

const Vacancy = ({ data }) => {
  const intl = useIntl();
  const classes = useStyles();
  const router = useRouter();
  const tabIds = useMemo(() => ['job-descriptions', 'job-application']);
  const tabs = useMemo(
    () => [
      {
        id: tabIds[0],
        label: intl.formatMessage({ id: 'VACANCY.JOB_DESCRIPTION' }),
      },
      {
        id: tabIds[1],
        label: intl.formatMessage({ id: 'VACANCY.APPLICATION' }),
      },
    ],
    [tabIds, intl],
  );
  const [activatedTab, setActiveTab] = useState(tabIds[0]);
  const seo = useMemo(
    () => ({
      title: data?.title,
      description: data?.shortDescription,
      url: `${LANDING_PAGE_DOMAIN}/${router.asPath}`,
      keywords: data?.tags ? data.tags.join(', ') : undefined,
    }),
    [data, router],
  );

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    scrollToElement('list-tabs');
  }, []);

  return (
    <Layout>
      <SEO {...seo} />
      <Header />
      <Teaser title={data?.title} subTitle={data?.subTitle} />
      <div className={classes.tabWrapper}>
        <Content id="list-tabs">
          <ul className={classes.tab}>
            {tabs.map((tab) => (
              <li
                id={tab.id}
                key={tab.id}
                role="presentation"
                className={classNames(classes.tabItem, {
                  active: activatedTab === tab.id,
                })}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.label}
              </li>
            ))}
          </ul>
        </Content>
      </div>
      {activatedTab === tabIds[0] ? (
        <JobDescription
          htmlContent={data?.htmlContent}
          onApply={() => handleTabChange(tabIds[1])}
        />
      ) : (
        <Application vacancyId={data.id} />
      )}
      <Footer />
    </Layout>
  );
};
Vacancy.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    htmlContent: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
};
Vacancy.defaultProps = { data: undefined };

export default memo(Vacancy);

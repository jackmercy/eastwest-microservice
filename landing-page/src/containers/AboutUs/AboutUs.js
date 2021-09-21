import { memo, useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';

import { scrollToElement } from '../../utils';
import { Layout, Header, Footer, Content } from '../components';
import { DEFAULT_SEO } from '../../../configs';
import { Button, SEO } from '../../components';
import MenuScrollableLayout from '../Careers/components/MenuScrollableLayout';

import useStyles from './aboutUs.styles';

const AboutUs = () => {
  const intl = useIntl();
  const classes = useStyles();
  const ids = useMemo(() => ['about-company', 'history', 'our-team'], []);
  const menuConfigs = useMemo(
    () => [
      {
        id: ids[0],
        label: intl.formatMessage({ id: 'ABOUT_US.DETAILS.MENU.01' }),
      },
      {
        id: ids[1],
        label: intl.formatMessage({ id: 'ABOUT_US.DETAILS.MENU.02' }),
      },
      {
        id: ids[2],
        label: intl.formatMessage({ id: 'ABOUT_US.DETAILS.MENU.03' }),
      },
    ],
    [intl],
  );
  const companyInfo = useMemo(
    () => [
      {
        key: 'founded',
        value: 2018,
        countUpConfigs: { prefix: '', suffix: '' },
        label: intl.formatMessage({
          id: 'ABOUT_US.DETAILS.ABOUT_COMPANY.FOUNDED',
        }),
      },
      {
        key: 'talents',
        value: 800,
        countUpConfigs: { prefix: '', suffix: '+' },
        label: intl.formatMessage({
          id: 'ABOUT_US.DETAILS.ABOUT_COMPANY.TALENTS',
        }),
      },
      {
        key: 'projects',
        value: 140,
        countUpConfigs: { prefix: '', suffix: '+' },
        label: intl.formatMessage({
          id: 'ABOUT_US.DETAILS.ABOUT_COMPANY.PROJECTS',
        }),
      },
      {
        key: 'raised',
        value: 1.5,
        countUpConfigs: {
          prefix: '$',
          suffix: 'B+',
          decimals: 1,
          decimal: '.',
        },
        label: intl.formatMessage({
          id: 'ABOUT_US.DETAILS.ABOUT_COMPANY.RAISED',
        }),
      },
    ],
    [intl],
  );
  const historyInfo = useMemo(
    () => [
      {
        year: '2018',
        descriptions: [
          intl.formatMessage({ id: 'ABOUT_US.DETAILS.HISTORY.2018.TEXT.1' }),
          intl.formatMessage({ id: 'ABOUT_US.DETAILS.HISTORY.2018.TEXT.2' }),
        ],
      },
      {
        year: '2019',
        descriptions: [
          intl.formatMessage({ id: 'ABOUT_US.DETAILS.HISTORY.2019.TEXT.1' }),
          intl.formatMessage({ id: 'ABOUT_US.DETAILS.HISTORY.2019.TEXT.2' }),
          intl.formatMessage({ id: 'ABOUT_US.DETAILS.HISTORY.2019.TEXT.3' }),
          intl.formatMessage({ id: 'ABOUT_US.DETAILS.HISTORY.2019.TEXT.4' }),
          intl.formatMessage({ id: 'ABOUT_US.DETAILS.HISTORY.2019.TEXT.5' }),
        ],
      },
      {
        year: '2020',
        descriptions: [
          intl.formatMessage({ id: 'ABOUT_US.DETAILS.HISTORY.2020.TEXT.1' }),
          intl.formatMessage({ id: 'ABOUT_US.DETAILS.HISTORY.2020.TEXT.2' }),
          intl.formatMessage({ id: 'ABOUT_US.DETAILS.HISTORY.2020.TEXT.3' }),
          intl.formatMessage({ id: 'ABOUT_US.DETAILS.HISTORY.2020.TEXT.4' }),
          intl.formatMessage({ id: 'ABOUT_US.DETAILS.HISTORY.2020.TEXT.5' }),
          intl.formatMessage({ id: 'ABOUT_US.DETAILS.HISTORY.2020.TEXT.6' }),
          intl.formatMessage({ id: 'ABOUT_US.DETAILS.HISTORY.2020.TEXT.7' }),
          intl.formatMessage({ id: 'ABOUT_US.DETAILS.HISTORY.2020.TEXT.8' }),
          intl.formatMessage({ id: 'ABOUT_US.DETAILS.HISTORY.2020.TEXT.9' }),
        ],
      },
      {
        year: '2021',
        descriptions: [
          intl.formatMessage({ id: 'ABOUT_US.DETAILS.HISTORY.2021.TEXT.1' }),
          intl.formatMessage({ id: 'ABOUT_US.DETAILS.HISTORY.2021.TEXT.2' }),
          intl.formatMessage({ id: 'ABOUT_US.DETAILS.HISTORY.2021.TEXT.3' }),
        ],
      },
    ],
    [intl],
  );
  const members = useMemo(
    () => [
      {
        name: 'Rabih Souk',
        role: 'Chief Executive officer',
        avatar: '/static/images/about-us/member-1.png',
      },
      {
        name: 'Duyen Tran',
        role: 'Director of Operations',
        avatar: '/static/images/about-us/member-2.png',
      },
      {
        name: 'Tuan Nguyen',
        role: 'Product Design Manager',
        avatar: '/static/images/about-us/member-5.png',
      },
      {
        name: 'Hai Bui',
        role: 'Software engineer',
        avatar: '/static/images/about-us/member-7.png',
      },
      {
        name: 'Hung Le',
        role: 'Software engineer',
        avatar: '/static/images/about-us/member-8.png',
      },
      {
        name: 'Hanh Van',
        role: 'Junior talent Manager',
        avatar: '/static/images/about-us/member-9.png',
      },
    ],
    [],
  );
  const [isVisible, setVisibility] = useState(false);

  const handleScrollToId = useCallback((e, id) => {
    e.preventDefault();
    window.history.pushState({}, '', `/company#${id}`);
    scrollToElement(id);
  }, []);

  const handleVisibilityChange = (status) => {
    if (status) {
      setVisibility(status);
    }
  };

  return (
    <Layout>
      <SEO {...DEFAULT_SEO.PAGES.ABOUT_US} />
      <Header />
      <Content className={classes.teaser}>
        <h1 className={classes.teaserTitle} data-test="about-us-teaser-title">
          {intl.formatMessage(
            { id: 'ABOUT_US.TEASER.TITLE' },
            {
              span: (...chunks) => (
                <span className={classes.primary}>{chunks.join('')}</span>
              ),
            },
          )}
        </h1>
        <p
          className={classes.teaserDescription}
          data-test="about-us-teaser-description"
        >
          {intl.formatMessage({ id: 'ABOUT_US.TEASER.DESCRIPTION' })}
        </p>
      </Content>
      <div className={classes.coverImage} data-test="about-us-teaser-image" />
      <Content className={classes.menuScrollableLayout}>
        <MenuScrollableLayout menuConfigs={menuConfigs}>
          <Link href={`/company#${ids[0]}`}>
            <h1
              id={ids[0]}
              role="presentation"
              className={classes.introduceTitle}
              onClick={(e) => handleScrollToId(e, ids[0])}
            >
              {intl.formatMessage(
                { id: 'ABOUT_US.DETAILS.ABOUT_COMPANY.TITLE' },
                {
                  span: (...chunks) => (
                    <span className={classes.primary}>{chunks.join('')}</span>
                  ),
                },
              )}
            </h1>
          </Link>
          <p className={classes.aboutText}>
            {intl.formatMessage({
              id: 'ABOUT_US.DETAILS.ABOUT_COMPANY.TEXT.01',
            })}
          </p>
          <div
            className={classes.aboutCompany}
            data-test="about-us-details-about-company"
          >
            {companyInfo.map((item) => (
              <div key={item.key} className={classes.aboutCompanySummary}>
                <h2 className={classes.aboutCompanyValue}>
                  <CountUp
                    end={item.value}
                    start={isVisible ? 0 : null}
                    {...item.countUpConfigs}
                  >
                    {({ countUpRef }) => (
                      <VisibilitySensor
                        onChange={handleVisibilityChange}
                        delayedCall
                      >
                        <span ref={countUpRef} />
                      </VisibilitySensor>
                    )}
                  </CountUp>
                </h2>
                <p className={classes.aboutCompanyLabel}>{item.label}</p>
              </div>
            ))}
          </div>
          <p className={classes.aboutText}>
            {intl.formatMessage({
              id: 'ABOUT_US.DETAILS.ABOUT_COMPANY.TEXT.02',
            })}
          </p>
          <p className={classes.aboutText}>
            {intl.formatMessage({
              id: 'ABOUT_US.DETAILS.ABOUT_COMPANY.TEXT.03',
            })}
          </p>
          <Link href={`/company#${ids[1]}`}>
            <h2
              id={ids[1]}
              role="presentation"
              className={classes.introduceTitle}
              onClick={(e) => handleScrollToId(e, ids[1])}
            >
              {intl.formatMessage({ id: 'ABOUT_US.DETAILS.HISTORY.TITLE' })}
            </h2>
          </Link>
          <div
            className={classes.historyCompany}
            data-test="about-us-details-history-company"
          >
            {historyInfo.map((item) => (
              <div
                key={`history-${item.year}`}
                className={classes.historySummary}
              >
                <div className={classes.historyYear}>
                  <span className={classes.historyMark} />
                  {item.year}
                </div>
                <ul className={classes.historyDescriptions}>
                  {item.descriptions.map((description, index) => (
                    <li
                      // eslint-disable-next-line react/no-array-index-key
                      key={`history-${item.year}-${index}`}
                      className={classes.historyItem}
                    >
                      <span className={classes.historyMark} />
                      {description}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Link href={`/company#${ids[2]}`}>
            <h2
              id={ids[2]}
              role="presentation"
              className={classes.introduceTitle}
              onClick={(e) => handleScrollToId(e, ids[2])}
            >
              {intl.formatMessage(
                { id: 'ABOUT_US.DETAILS.OUR_TEAM.TITLE' },
                {
                  span: (...chunks) => (
                    <span className={classes.primary}>{chunks.join('')}</span>
                  ),
                },
              )}
            </h2>
          </Link>
          <div
            className={classes.members}
            data-test="about-us-details-company-members"
          >
            {members.map((member) => (
              <div key={member.name} className={classes.member}>
                <div
                  className={classes.memberAvatar}
                  style={{ backgroundImage: `url(${member.avatar})` }}
                />
                <p className={classes.memberName}>{member.name}</p>
                <p className={classes.memberRole}>{member.role}</p>
              </div>
            ))}
          </div>
        </MenuScrollableLayout>
      </Content>
      <div className={classes.starting}>
        <h2
          className={classes.startingTitle}
          data-test="about-us-starting-title"
        >
          {intl.formatMessage({ id: 'ABOUT_US.START_WITH_COMPANY.TITLE' })}
        </h2>
        <Link href="/#create-project-form" passHref>
          <Button
            tag="a"
            color="secondary"
            size="large"
            keepSizeOnMobile
            className={classes.startingCTA}
            dataTest="about-us-starting-cta"
          >
            {intl.formatMessage({ id: 'ABOUT_US.START_WITH_COMPANY.CTA' })}
          </Button>
        </Link>
      </div>
      <Footer />
    </Layout>
  );
};
export default memo(AboutUs);

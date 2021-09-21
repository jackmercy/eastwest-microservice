import Link from 'next/link';
import { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

import { SectionTitle } from '../components';

import useStyles from './benefits.styles';

const Benefits = ({ id }) => {
  const intl = useIntl();
  const classes = useStyles();
  const benefits = useMemo(
    () => [
      {
        key: 'benefit-01',
        title: intl.formatMessage({ id: 'CAREERS.BENEFITS.01.TITLE' }),
        description: intl.formatMessage({
          id: 'CAREERS.BENEFITS.01.DESCRIPTION',
        }),
        image: '/static/images/careers/benefit-01.png',
      },
      {
        key: 'benefit-02',
        title: intl.formatMessage({ id: 'CAREERS.BENEFITS.02.TITLE' }),
        description: intl.formatMessage({
          id: 'CAREERS.BENEFITS.02.DESCRIPTION',
        }),
        image: '/static/images/careers/benefit-02.png',
      },
      {
        key: 'benefit-03',
        title: intl.formatMessage(
          { id: 'CAREERS.BENEFITS.03.TITLE' },
          { icon: <i className="icon-arrow-right" /> },
        ),
        description: intl.formatMessage({
          id: 'CAREERS.BENEFITS.03.DESCRIPTION',
        }),
        image: '/static/images/careers/benefit-03.png',
      },
      {
        key: 'benefit-04',
        title: intl.formatMessage({ id: 'CAREERS.BENEFITS.04.TITLE' }),
        description: intl.formatMessage({
          id: 'CAREERS.BENEFITS.04.DESCRIPTION',
        }),
        image: '/static/images/careers/benefit-04.png',
      },
      {
        key: 'benefit-05',
        title: intl.formatMessage({ id: 'CAREERS.BENEFITS.05.TITLE' }),
        description: intl.formatMessage({
          id: 'CAREERS.BENEFITS.05.DESCRIPTION',
        }),
        image: '/static/images/careers/benefit-05.png',
      },
      {
        key: 'benefit-06',
        title: intl.formatMessage({ id: 'CAREERS.BENEFITS.06.TITLE' }),
        description: intl.formatMessage({
          id: 'CAREERS.BENEFITS.06.DESCRIPTION',
        }),
        image: '/static/images/careers/benefit-06.png',
      },
    ],
    [intl],
  );

  return (
    <>
      <SectionTitle
        id={id}
        translateId="CAREERS.BENEFITS.TITLE"
        className={classes.sectionTitle}
      />
      <p className={classes.text}>
        {intl.formatMessage({ id: 'CAREERS.BENEFITS.TEXT.01' })}
      </p>
      <div className={classes.benefits}>
        {benefits.map((item) => (
          <div key={item.key} className={classes.benefit}>
            <img
              alt={item.title}
              className={classes.benefitImage}
              src={item.image}
            />
            <h4 className={classes.benefitTitle}>{item.title}</h4>
            <p className={classes.benefitDescription}>{item.description}</p>
          </div>
        ))}
      </div>
      <div className={classes.ourOffice}>
        <h4 className={classes.ourOfficeTitle}>
          {intl.formatMessage({ id: 'CAREERS.BENEFITS.OUR_OFFICE.TITLE' })}
        </h4>
        <img
          alt="our office"
          className={classes.ourOfficeImage}
          src="/static/images/careers/our-office.png"
          srcSet={[
            '/static/images/careers/our-office-mobile.png 500w',
            '/static/images/careers/our-office.png 2000w',
          ].join(', ')}
        />
        <div className={classes.ourOfficeIntroWrapper}>
          <div className={classes.ourOfficeIntro}>
            <h4 className={classes.ourOfficeIntroTitle}>
              {intl.formatMessage({
                id: 'CAREERS.BENEFITS.OUR_OFFICE.INTRO.01.TITLE',
              })}
            </h4>
            <p className={classes.ourOfficeDescription}>
              {intl.formatMessage({
                id: 'CAREERS.BENEFITS.OUR_OFFICE.INTRO.01.DESCRIPTION',
              })}
            </p>
            <Link href="/talent-labs" passHref>
              <a
                href="/#"
                className={classNames(
                  classes.ourOfficeDescription,
                  classes.ourOfficeLink,
                )}
                data-test="our-office-link-talent-labs"
              >
                {intl.formatMessage({
                  id: 'CAREERS.BENEFITS.OUR_OFFICE.INTRO.01.LINK',
                })}
                <i className="icon-arrow-right" />
              </a>
            </Link>
          </div>
          <div className={classes.ourOfficeIntro}>
            <h4 className={classes.ourOfficeIntroTitle}>
              {intl.formatMessage({
                id: 'CAREERS.BENEFITS.OUR_OFFICE.INTRO.02.TITLE',
              })}
            </h4>
            <p className={classes.ourOfficeDescription}>
              {intl.formatMessage({
                id: 'CAREERS.BENEFITS.OUR_OFFICE.INTRO.02.DESCRIPTION',
              })}
            </p>
            <Link href="/internship-program" passHref>
              <a
                href="/#"
                className={classNames(
                  classes.ourOfficeDescription,
                  classes.ourOfficeLink,
                )}
                data-test="our-office-link-internship-program"
              >
                {intl.formatMessage({
                  id: 'CAREERS.BENEFITS.OUR_OFFICE.INTRO.02.LINK',
                })}
                <i className="icon-arrow-right" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
Benefits.propTypes = { id: PropTypes.string.isRequired };

export default memo(Benefits);

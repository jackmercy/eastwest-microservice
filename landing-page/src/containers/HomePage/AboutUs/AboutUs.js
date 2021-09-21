import { memo, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';

import { Content } from '../../components';

import useStyles from './aboutUs.styles';

const AboutUs = () => {
  const intl = useIntl();
  const classes = useStyles();
  const companyInfo = useMemo(
    () => [
      {
        key: 'founded',
        value: 2018,
        countUpConfigs: { prefix: '', suffix: '' },
        image: '/static/images/homepage/about-us-1.png',
        label: intl.formatMessage({
          id: 'ABOUT_US.DETAILS.ABOUT_COMPANY.FOUNDED',
        }),
        dataTest: 'about-us-info-founded',
      },
      {
        key: 'talents',
        value: 800,
        countUpConfigs: { prefix: '', suffix: '+' },
        image: '/static/images/homepage/about-us-2.png',
        label: intl.formatMessage({
          id: 'ABOUT_US.DETAILS.ABOUT_COMPANY.TALENTS',
        }),
        dataTest: 'about-us-info-talents',
      },
      {
        key: 'projects',
        value: 140,
        countUpConfigs: { prefix: '', suffix: '+' },
        image: '/static/images/homepage/about-us-3.png',
        label: intl.formatMessage({
          id: 'ABOUT_US.DETAILS.ABOUT_COMPANY.PROJECTS',
        }),
        dataTest: 'about-us-info-projects',
      },
      {
        key: 'raised',
        value: 1.5,
        countUpConfigs: {
          prefix: '',
          suffix: 'B+',
          decimals: 1,
          decimal: '.',
        },
        image: '/static/images/homepage/about-us-4.png',
        label: intl.formatMessage({
          id: 'ABOUT_US.DETAILS.ABOUT_COMPANY.RAISED',
        }),
        dataTest: 'about-us-info-raised',
      },
    ],
    [intl],
  );
  const [isVisible, setVisibility] = useState(false);

  const handleVisibilityChange = (status) => {
    if (status) {
      setVisibility(status);
    }
  };

  return (
    <Content className={classes.root}>
      <h2 className={classes.title} data-test="about-us-title">
        {intl.formatMessage({ id: 'HOMEPAGE.ABOUT_US.TITLE' })}
      </h2>
      <p className={classes.description} data-test="about-us-description">
        {intl.formatMessage(
          { id: 'HOMEPAGE.ABOUT_US.DESCRIPTION' },
          { br: <br /> },
        )}
      </p>
      <div className={classes.group}>
        {companyInfo.map((item) => (
          <div
            key={item.key}
            className={classes.groupItem}
            data-test={item.dataTest}
          >
            <img
              alt={item.label}
              src={item.image}
              loading="lazy"
              className={classes.groupItemImage}
            />
            <h2 className={classes.groupItemValue}>
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
            <p className={classes.groupItemLabel}>{item.label}</p>
          </div>
        ))}
      </div>
    </Content>
  );
};

export default memo(AboutUs);

import { memo, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';

import { Content } from '../../../components';

import useStyles from './aboutProduct.styles';

const AboutUs = () => {
  const intl = useIntl();
  const classes = useStyles();
  const companyInfo = useMemo(
    () => [
      {
        key: 'launch',
        value: 2021,
        countUpConfigs: { prefix: '', suffix: '' },
        image: '/static/images/data-labs/brands/about-01.png',
        label: intl.formatMessage({ id: 'DATA_LABS.ABOUT.01.LABEL' }),
        dataTest: 'about-product-launch',
      },
      {
        key: 'influencers',
        value: 45000,
        countUpConfigs: { prefix: '', suffix: '' },
        image: '/static/images/data-labs/brands/about-02.png',
        label: intl.formatMessage({ id: 'DATA_LABS.ABOUT.02.LABEL' }),
        dataTest: 'about-product-influencers',
      },
      {
        key: 'brands',
        value: 100,
        countUpConfigs: { prefix: '', suffix: '+' },
        image: '/static/images/data-labs/brands/about-03.png',
        label: intl.formatMessage({ id: 'DATA_LABS.ABOUT.03.LABEL' }),
        dataTest: 'about-product-brands',
      },
      {
        key: 'campaigns',
        value: 1000,
        countUpConfigs: { prefix: '', suffix: '+' },
        image: '/static/images/data-labs/brands/about-04.png',
        label: intl.formatMessage({ id: 'DATA_LABS.ABOUT.04.LABEL' }),
        dataTest: 'about-product-campaigns',
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
    <div className={classes.root}>
      <Content className={classes.content}>
        <h2 className={classes.title} data-test="about-product-title">
          {intl.formatMessage(
            { id: 'DATA_LABS.ABOUT.TITLE' },
            {
              span: (...chunks) => (
                <span className={classes.primary}>{chunks.join('')}</span>
              ),
            },
          )}
        </h2>
        <p
          className={classes.description}
          data-test="about-product-description"
        >
          {intl.formatMessage({ id: 'DATA_LABS.ABOUT.DESCRIPTION' })}
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
    </div>
  );
};

export default memo(AboutUs);

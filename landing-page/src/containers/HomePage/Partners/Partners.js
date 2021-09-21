import { memo, useMemo } from 'react';
import { useIntl } from 'react-intl';

import { Content } from '../../components';
import { Carousel } from '../../../components';
import BREAKPOINTS from '../../../constants/BREAKPOINTS';

import { partners } from './partners.configs';
import useStyles from './partners.styles';

const Partners = () => {
  const intl = useIntl();
  const classes = useStyles();
  const settings = useMemo(
    () => ({
      slidesToShow: 5,
      slidesToScroll: 5,
      responsive: [
        {
          breakpoint: BREAKPOINTS.maxLg,
          settings: { slidesToShow: 4, slidesToScroll: 4 },
        },
        {
          breakpoint: BREAKPOINTS.maxMd,
          settings: { slidesToShow: 3, slidesToScroll: 3 },
        },
        {
          breakpoint: BREAKPOINTS.maxSm,
          settings: { slidesToShow: 1, slidesToScroll: 1 },
        },
      ],
    }),
    [],
  );

  return (
    <Content className={classes.root}>
      <h2 className={classes.title} data-test="partners-title">
        {intl.formatMessage({ id: 'HOMEPAGE.PARTNERS.TITLE' })}
      </h2>
      <Carousel
        {...settings}
        className={classes.slider}
        dataTest="partners-carousel"
      >
        {partners.map((item) => (
          <div key={item.name}>
            <img
              loading="lazy"
              alt={item.name}
              title={item.name}
              src={item.logo}
              className={classes.logo}
            />
          </div>
        ))}
      </Carousel>
    </Content>
  );
};

export default memo(Partners);

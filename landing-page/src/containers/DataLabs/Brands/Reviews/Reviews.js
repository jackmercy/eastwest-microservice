import { memo, useMemo } from 'react';
import { useIntl } from 'react-intl';

import { Content } from '../../../components';

import CustomCarousel from './CustomCarousel';
import useStyles from './reviews.styles';

const Reviews = () => {
  const intl = useIntl();
  const classes = useStyles();
  // TODO: remove images after integrate with APIs
  const listItems = useMemo(
    () => [
      // {
      //   name: 'Starprintvn',
      //   review:
      //     eslint-disable-next-line max-len
      //     'Our business relies entirly on the feedback of consumers. We print and develop packaging for product in every day use. Understanding exactly what the end consumers needs are, allows us to better develop solutions for our clients and literally gives us the edge over our competitors.',
      //   avatar: '/static/images/data-labs/brands/quote-01.svg',
      //   highlight: false,
      // },
      {
        name: 'RNW',
        review:
          // eslint-disable-next-line max-len
          'We build solutions for our real estate plaform on a continuous basis. Implmenting Data Labs for our User-Centered Design process allowed us to gather insights from our users to fine tune our products. Less costs on quantitative research and a brilliant form of Lead Generation.',
        avatar: '/static/images/data-labs/brands/quote-02.svg',
        highlight: true,
      },
      {
        name: 'KimOo Beatz',
        review:
          // eslint-disable-next-line max-len
          'Sampling for our music is subjective most of the time. We try to set or follow trends and engage with our audience on music released. Data Labs, allowed us to integrate data driven decision making on what direction we can take with our music to reach a better audience.',
        avatar: '/static/images/data-labs/brands/quote-03.svg',
        highlight: true,
      },
      {
        name: 'Toiya',
        review:
          // eslint-disable-next-line max-len
          'Creating content and gathering market insights became such an easy thing to do with Data Labs. We heavily rely on the feedback of our user base and manage requests on a continuous basis. Setting up multiple data streams has allowed us to allocate resources better and scale easier.',
        avatar: '/static/images/data-labs/brands/quote-04.svg',
        highlight: true,
      },
      {
        name: 'Voice Pick',
        review:
          // eslint-disable-next-line max-len
          'We work continuosly with data, generate reports and make recommendations to clients. Data is usually outdated, highly generalized and not specific. With Data Labs we get feedback from our users now. It’s accurate, reliable and gives us a selling point that competitors dont have.',
        avatar: '/static/images/data-labs/brands/quote-05.svg',
        highlight: true,
      },
    ],
    [],
  );

  return (
    <Content className={classes.content}>
      <h2 className={classes.title} data-test="reviews-title">
        {intl.formatMessage({ id: 'DATA_LABS.BRAND_QUOTES.TITLE' })}
      </h2>
      <CustomCarousel data={listItems} />
      <div className={classes.listItems} data-test="reviews-list-items">
        {listItems.filter(i => i.highlight).map((item, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={`review-${index}`}
            data-test="reviews-item"
            className={classes.itemLayout}
          >
            <div className={classes.itemWrapper}>
              <img
                alt={item.name}
                src="/static/images/data-labs/quotes.png"
                loading="lazy"
                className={classes.itemQuotesImage}
              />
              <p className={classes.itemReview}>{item.review}</p>
              <div className={classes.itemGroup}>
                <div className={classes.itemAvatarImageWrapper}>
                  <img
                    alt={item.name}
                    src={item.avatar}
                    loading="lazy"
                    className={classes.itemAvatarImage}
                  />
                </div>
                <p className={classes.itemName}>{item.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Content>
  );
};

export default memo(Reviews);

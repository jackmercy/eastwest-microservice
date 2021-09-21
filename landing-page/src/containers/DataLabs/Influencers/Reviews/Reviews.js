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
      {
        name: 'Duy Tran',
        review:
          // eslint-disable-next-line max-len
          'I have a very deep passion for fashion. I love wearing it and I enjoy watching buying it. Online shopping has become a norm. However, the use of excessive amounts of plastic is bothering me. It is amazing to see how many companies started to become more aware of hazardous packaging. Think straws in drinks and double wrapped bottle caps.',
        avatar: '/static/images/data-labs/influencers/quote-01.png',
        projects: 228,
        points: 1970,
        highlight: false,
      },
      {
        name: 'Thao Nguyen',
        review:
          // eslint-disable-next-line max-len
          'Having a voice with brands, I was able to contribute a lot in improving the product quality, without increasing the product costs. I am hoping other consumers can enjoy products more with this feedback.',
        avatar: '/static/images/data-labs/influencers/quote-02.png',
        projects: 210,
        points: 1512,
        highlight: true,
      },
      {
        name: 'Tuan Anh',
        review:
          // eslint-disable-next-line max-len
          'A great way to participate in small projects and get rewards. It doesn\'t take a lot time. I can participate during lunch breaks or in my spare time, without stressing my work load. It is a lot of fun and a great way of earning extra cash every month.',
        avatar: '/static/images/data-labs/influencers/quote-03.png',
        projects: 490,
        points: 1470,
        highlight: true,
      },
      {
        name: 'Nhi Dang',
        review:
          // eslint-disable-next-line max-len
          'Simple interface and easy to use, I receive participation requests in my inbox and can easily participate. The best part is, that we don’t get rewarded with vouchers or discounts but with currency. They told me crypto solutions are coming soon 😍',
        avatar: '/static/images/data-labs/influencers/quote-04.png',
        projects: 87,
        points: 470,
        highlight: true,
      },
      {
        name: 'Tai Nguyen',
        review:
          // eslint-disable-next-line max-len
          'I like to travel a lot. Data Labs, was able to pay for my last trip to the beach. I also got compensated for referring my friends to to become influencers. We actually worked on a few assignments together. Pretty amazing',
        avatar: '/static/images/data-labs/influencers/quote-05.png',
        projects: 130,
        points: 390,
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
        {listItems
          .filter((i) => i.highlight)
          .map((item, index) => (
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
                  <div>
                    <p className={classes.itemName}>{item.name}</p>
                    <p className={classes.itemReward}>
                      <i className="icon-comment" />
                      {item.projects}
                    </p>
                    <p className={classes.itemReward}>
                      <i className="icon-circle-dollar" />
                      {item.points}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </Content>
  );
};

export default memo(Reviews);

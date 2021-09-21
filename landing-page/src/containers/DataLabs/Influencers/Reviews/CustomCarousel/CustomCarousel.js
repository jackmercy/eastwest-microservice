import { memo, useCallback, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { useIntl } from 'react-intl';

import { Button } from '../../../../../components';

import useStyles from './customCarousel.styles';

const CustomCarousel = ({ data }) => {
  const ref = useRef();
  const intl = useIntl();
  const classes = useStyles();
  const settings = useMemo(
    () => ({
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      pauseOnHover: true,
      touchMove: false,
      autoplaySpeed: 10000,
    }),
    [],
  );

  const handleNext = useCallback(() => {
    if (ref.current) {
      ref.current.slickNext();
    }
  }, [ref]);

  const handleBack = useCallback(() => {
    if (ref.current) {
      ref.current.slickPrev();
    }
  }, [ref]);

  return (
    <div className={classes.root}>
      <Slider ref={ref} className={classes.carousel} {...settings}>
        {data.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={`carousel-${index}`}>
            <div className={classes.itemWrapper}>
              <div className={classes.group}>
                <div className={classes.avatarWrapper}>
                  <img
                    alt={item.name}
                    loading="lazy"
                    src={item.avatar}
                    className={classes.avatar}
                  />
                </div>
                <p className={classes.name}>{item.name}</p>
                <p className={classes.reward}>
                  {intl.formatMessage(
                    { id: 'DATA_LABS.INFLUENCER_QUOTES.PROJECT_PARTICIPATED' },
                    {
                      span: (...chunks) => (
                        <span className={classes.black}>{chunks.join('')}</span>
                      ),
                      number: item.projects || 0,
                    },
                  )}
                </p>
                <p className={classes.reward}>
                  {intl.formatMessage(
                    { id: 'DATA_LABS.INFLUENCER_QUOTES.EARN' },
                    {
                      span: (...chunks) => (
                        <span className={classes.black}>{chunks.join('')}</span>
                      ),
                      number: `$ ${item.points || 0}`,
                    },
                  )}
                </p>
              </div>
              <div className={classes.group}>
                <img
                  alt={item.name}
                  src="/static/images/data-labs/quotes.png"
                  loading="lazy"
                  className={classes.quotesImage}
                />
                <p className={classes.review}>{item.review}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <div className={classes.groupButton}>
        <Button
          size="large"
          color="secondary"
          className={classes.carouselButton}
          keepSizeOnMobile
          onClick={handleBack}
          dataTest="custom-carousel-button-prev"
        >
          <i className="icon-caret-left" />
        </Button>
        <Button
          size="large"
          color="secondary"
          className={classes.carouselButton}
          keepSizeOnMobile
          onClick={handleNext}
          dataTest="custom-carousel-button-next"
        >
          <i className="icon-caret-right" />
        </Button>
      </div>
    </div>
  );
};
CustomCarousel.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      review: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      projects: PropTypes.number.isRequired,
      points: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default memo(CustomCarousel);

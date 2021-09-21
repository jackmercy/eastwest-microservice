import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Slider from 'react-slick';

import useStyles from './carousel.styles';

const Carousel = ({ className, children, dataTest, ...restProps }) => {
  const classes = useStyles();

  // eslint-disable-next-line react/prop-types
  const NextArrow = ({ currentSlide, slideCount, ...restProps }) => (
    <span {...restProps} className={classNames(classes.customArrow, 'next')}>
      <i className="icon-caret-right" />
    </span>
  );

  // eslint-disable-next-line react/prop-types
  const PrevArrow = ({ currentSlide, slideCount, ...restProps }) => (
    <span {...restProps} className={classNames(classes.customArrow, 'prev')}>
      <i className="icon-caret-left" />
    </span>
  );

  const settings = useMemo(
    () => ({
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    }),
    [],
  );

  return (
    <div
      className={className}
      data-test={dataTest || 'component-carousel-root'}
    >
      <Slider className={classes.slider} {...settings} {...restProps}>
        {children}
      </Slider>
    </div>
  );
};
Carousel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  dataTest: PropTypes.string,
};
Carousel.defaultProps = {
  className: '',
  dataTest: '',
};

export default memo(Carousel);

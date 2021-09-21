import { memo, useMemo } from 'react';
import PropTypes from 'prop-types';

import { Carousel } from '../../../../components';

import useStyles from './mobileImages.styles';

const MobileImages = ({ images }) => {
  const classes = useStyles();
  const settings = useMemo(
    () => ({
      dots: true,
      nextArrow: null,
      prevArrow: null,
    }),
    [],
  );

  return (
    <Carousel {...settings} className={classes.carousel}>
      {images.map((item) => (
        <div key={`our-office-image-${item.key}`}>
          <img
            alt="Eastwest office"
            src={item.src}
            srcSet={item.srcSet}
            className={classes.image}
          />
        </div>
      ))}
    </Carousel>
  );
};
MobileImages.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      srcSet: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default memo(MobileImages);

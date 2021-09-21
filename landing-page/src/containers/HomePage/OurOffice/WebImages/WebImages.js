import { memo } from 'react';
import PropTypes from 'prop-types';

import useStyles from './webImages.styles';

const WebImages = ({ images }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {images.map((item) => (
        <div key={`our-office-image-${item.key}`} className={classes.item}>
          <img
            alt="Eastwest office"
            src={item.src}
            srcSet={item.srcSet}
            data-test="web-images-image"
            className={classes.image}
          />
        </div>
      ))}
    </div>
  );
};
WebImages.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      srcSet: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default memo(WebImages);

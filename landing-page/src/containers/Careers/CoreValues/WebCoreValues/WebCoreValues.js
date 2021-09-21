import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import classNames from 'classnames';
import { useIntl } from 'react-intl';

import { SectionTitle } from '../../components';

import useStyles from './webCoreValues.styles';

const WebCoreValues = ({ data }) => {
  const slideRef = useRef();
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
  const [activatedIndex, setActiveIndex] = useState(0);

  const handleCoreValueChange = useCallback(
    (index) => {
      if (slideRef.current) {
        slideRef.current.slickGoTo(index);
      }
    },
    [slideRef],
  );

  return (
    <>
      <Slider
        ref={slideRef}
        className={classes.slider}
        beforeChange={(current, next) => {
          setActiveIndex(next);
        }}
        initialSlide={activatedIndex}
        {...settings}
      >
        {data.map((item) => (
          <div key={item.key} className={classes.detailsWrapper}>
            <div className={classes.details}>
              <p className={classes.detailsSubTitle}>
                {intl.formatMessage({ id: 'CAREERS.MENU.02' })}
              </p>
              <SectionTitle
                id={`core-value-${item.key}`}
                translateId={item.titleTranslationId}
              />
              <p className={classes.detailsDescription}>{item.description}</p>
            </div>
            <img
              alt={item.title}
              src={item.image}
              className={classes.image}
              srcSet={item.srcSet}
            />
          </div>
        ))}
      </Slider>
      <div className={classes.listKeys}>
        {data.map((item, index) => (
          <div
            role="presentation"
            key={`core-value-${item.key}`}
            className={classNames(
              classes.listKeysItem,
              activatedIndex === index && 'active',
            )}
            onClick={() => {
              handleCoreValueChange(index);
            }}
          >
            <p className={classes.listKeysNumber}>{`0${index + 1}`}</p>
            <h2 className={classes.listKeysLabel}>{item.title}</h2>
          </div>
        ))}
      </div>
    </>
  );
};
WebCoreValues.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      titleTranslationId: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      srcSet: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default memo(WebCoreValues);

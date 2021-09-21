import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { SectionTitle } from '../../components';

import useStyles from './mobileCoreValues.styles';

const MobileCoreValues = ({ data }) => {
  const intl = useIntl();
  const classes = useStyles();

  return data.map((item) => (
    <div
      key={item.key}
      className={classes.detailsWrapper}
      data-test="mobile-core-value-item"
    >
      <div className={classes.details}>
        <p
          className={classes.detailsSubTitle}
          data-test="mobile-core-value-sub-title"
        >
          {intl.formatMessage({ id: 'CAREERS.MENU.02' })}
        </p>
        <SectionTitle
          id={`core-value-${item.key}`}
          translateId={item.titleTranslationId}
          className={classes.sectionTitle}
        />
        <p
          className={classes.detailsDescription}
          data-test="mobile-core-value-description"
        >
          {item.description}
        </p>
      </div>
      <img
        alt={item.title}
        src={item.image}
        className={classes.image}
        srcSet={item.srcSet}
        data-test="mobile-core-value-image"
      />
    </div>
  ));
};
MobileCoreValues.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      srcSet: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default memo(MobileCoreValues);

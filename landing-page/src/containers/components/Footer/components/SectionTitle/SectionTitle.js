import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useStyles from './sectionTitle.styles';

const SectionTitle = ({ title, className, dataTest }) => {
  const classes = useStyles();

  return (
    <h2 className={classNames(classes.root, className)} data-test={dataTest}>
      {title}
    </h2>
  );
};
SectionTitle.propTypes = {
  title: PropTypes.node.isRequired,
  className: PropTypes.string,
  dataTest: PropTypes.string,
};
SectionTitle.defaultProps = { className: '', dataTest: '' };

export default memo(SectionTitle);

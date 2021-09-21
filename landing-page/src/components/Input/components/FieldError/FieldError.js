import React, { memo } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import useStyles from './fieldError.styles';

const FieldError = ({ className, error, ...restProps }) => {
  const classes = useStyles();

  return (
    <p className={classNames(classes.root, className)} {...restProps}>
      {error}
    </p>
  );
};

FieldError.propTypes = {
  error: PropTypes.node.isRequired,
  className: PropTypes.string,
};
FieldError.defaultProps = { className: '' };

export default memo(FieldError);

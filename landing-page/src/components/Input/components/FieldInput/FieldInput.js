import React, { memo } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import useStyles from './fieldInput.styles';

const FieldInput = ({
  tag: Component,
  size,
  hasError,
  className,
  ...restProps
}) => {
  const classes = useStyles();

  return (
    <Component
      className={classNames(classes.root, className, size, hasError && 'error')}
      {...restProps}
    />
  );
};

FieldInput.propTypes = {
  tag: PropTypes.node,
  hasError: PropTypes.bool,
  className: PropTypes.string,
  size: PropTypes.oneOf(['large', 'medium', 'small']),
};
FieldInput.defaultProps = {
  tag: 'input',
  size: 'medium',
  className: '',
  hasError: false,
};

export default memo(FieldInput);

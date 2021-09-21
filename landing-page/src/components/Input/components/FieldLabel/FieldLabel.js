import React, { memo } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import useStyles from './fieldLabel.styles';

const FieldLabel = ({ label, htmlFor, required, className, ...restProps }) => {
  const classes = useStyles();

  return (
    <label
      htmlFor={htmlFor}
      className={classNames(classes.root, className, required && 'required')}
      {...restProps}
    >
      {label}
    </label>
  );
};

FieldLabel.propTypes = {
  label: PropTypes.node.isRequired,
  htmlFor: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
};
FieldLabel.defaultProps = { className: '', required: false, htmlFor: '' };

export default memo(FieldLabel);

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { FieldLabel, FieldInput, FieldError } from './components';
import useStyles from './input.styles';

const Input = ({
  name,
  error,
  label,
  dataTest,
  required,
  className,
  inputClassName,
  labelClassName,
  errorClassName,
  ...restProps
}) => {
  const classes = useStyles();

  return (
    <div
      className={classNames(classes.root, className)}
      data-test={dataTest || 'component-input-root'}
    >
      {label ? (
        <FieldLabel
          label={label}
          htmlFor={name}
          required={required}
          className={labelClassName}
        />
      ) : null}
      <FieldInput
        name={name}
        hasError={!!error}
        required={required}
        className={inputClassName}
        {...restProps}
      />
      {error ? <FieldError error={error} className={errorClassName} /> : null}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.node,
  error: PropTypes.string,
  required: PropTypes.bool,
  dataTest: PropTypes.string,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  errorClassName: PropTypes.string,
};
Input.defaultProps = {
  error: '',
  dataTest: '',
  className: '',
  required: false,
  label: undefined,
  inputClassName: '',
  labelClassName: '',
  errorClassName: '',
};

export default memo(Input);

import React, { memo, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { FieldLabel, FieldInput, FieldError } from '../components';

import useStyles from './inputPassword.styles';

const InputPassword = ({
  name,
  label,
  error,
  dataTest,
  required,
  className,
  inputClassName,
  labelClassName,
  errorClassName,
  ...restProps
}) => {
  const [showValue, setValueStatus] = useState();
  const classes = useStyles();

  const toggleValueStatus = () => {
    setValueStatus(!showValue);
  };

  return (
    <div
      className={className}
      data-test={dataTest || 'component-input-password-root'}
    >
      {label ? (
        <FieldLabel
          label={label}
          htmlFor={name}
          required={required}
          className={labelClassName}
        />
      ) : null}
      <div className={classes.inputWrapper}>
        <FieldInput
          name={name}
          hasError={!!error}
          required={required}
          className={classNames(classes.input, inputClassName)}
          {...restProps}
          type={showValue ? 'text' : 'password'}
        />
        <i
          role="presentation"
          className="icon-eye"
          onMouseDown={toggleValueStatus}
          onMouseUp={toggleValueStatus}
          onTouchStart={toggleValueStatus}
          onTouchEnd={toggleValueStatus}
          data-test="component-input-password-icon"
        />
      </div>
      {error ? <FieldError error={error} className={errorClassName} /> : null}
    </div>
  );
};

InputPassword.propTypes = {
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
InputPassword.defaultProps = {
  error: '',
  dataTest: '',
  className: '',
  required: false,
  label: undefined,
  inputClassName: '',
  labelClassName: '',
  errorClassName: '',
};

export default memo(InputPassword);

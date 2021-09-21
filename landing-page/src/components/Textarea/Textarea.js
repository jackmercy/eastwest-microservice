import React, { memo } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { FieldLabel, FieldInput, FieldError } from '../Input';

import useStyles from './textarea.styles';

const Textarea = ({
  name,
  size,
  label,
  error,
  disabled,
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
      data-test={dataTest || 'component-text-area-root'}
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
        tag="textarea"
        name={name}
        required={required}
        className={classNames(
          'custom-scrollbar',
          classes.input,
          inputClassName,
        )}
        disabled={disabled}
        size={size}
        {...restProps}
      />
      {error ? <FieldError error={error} className={errorClassName} /> : null}
    </div>
  );
};

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.node,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  dataTest: PropTypes.string,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  errorClassName: PropTypes.string,
  size: PropTypes.oneOf(['large', 'medium', 'small']),
};
Textarea.defaultProps = {
  error: '',
  dataTest: '',
  className: '',
  size: 'medium',
  required: false,
  disabled: false,
  label: undefined,
  inputClassName: '',
  labelClassName: '',
  errorClassName: '',
};

export default memo(Textarea);

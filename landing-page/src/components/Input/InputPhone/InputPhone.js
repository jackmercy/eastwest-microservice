import React, { memo, useCallback } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { FieldLabel, FieldInput, FieldError } from '../components';

import useStyles from './inputPhone.styles';

const InputPhone = ({
  name,
  label,
  error,
  dataTest,
  required,
  onChange,
  className,
  onKeyDown,
  inputClassName,
  labelClassName,
  errorClassName,
  ...restProps
}) => {
  const classes = useStyles();
  const formatPhone = useCallback((value) => {
    if (!value) return value;
    let formatted = String(value);
    // Remove leading 0: 00123 => 0123
    formatted = formatted.replace(/^(-)?0+(0\.|\d)/, '0$1$2');
    // Remove more than one plus except first
    if (formatted.split('')[0] === '+') {
      formatted = `+${formatted.replace(/[+]/g, '')}`;
    } else {
      // Remove plus not first
      formatted = formatted.replace(/[+]/g, '');
    }
    // Replace mutilple space to single space: 01  2 => 01 2
    formatted = formatted.replace(/\s\s+/g, ' ');

    return formatted;
  }, []);

  const handleKeyDown = (e) => {
    const charCode = e.keyCode || e.which;

    if (
      !(
        // allow delete, backspace, dot, move, +, space
        (
          [8, 16, 32, 37, 38, 39, 40, 46, 107, 110, 187, 190].includes(
            charCode,
          ) ||
          (charCode >= 48 && charCode <= 57) || // allow number
          (charCode >= 96 && charCode <= 105)
        ) // allow number
      )
    ) {
      e.preventDefault();
      return;
    }

    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  return (
    <div
      className={classNames(classes.root, className)}
      data-test={dataTest || 'component-input-phone-root'}
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
        onKeyDown={handleKeyDown}
        autoComplete="off"
        onChange={({ target: { name, value } }) => {
          onChange({
            name,
            value: formatPhone(value),
          });
        }}
        {...restProps}
        type="text"
      />
      {error ? <FieldError error={error} className={errorClassName} /> : null}
    </div>
  );
};

InputPhone.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.node,
  error: PropTypes.string,
  required: PropTypes.bool,
  onKeyDown: PropTypes.func,
  dataTest: PropTypes.string,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  errorClassName: PropTypes.string,
};
InputPhone.defaultProps = {
  error: '',
  dataTest: '',
  className: '',
  required: false,
  label: undefined,
  inputClassName: '',
  labelClassName: '',
  errorClassName: '',
  onKeyDown: undefined,
};

export default memo(InputPhone);

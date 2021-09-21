import React, { memo } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { FieldLabel, FieldInput, FieldError } from '../components';

import useStyles from './inputNumber.styles';

const InputNumber = ({
  unit,
  name,
  label,
  error,
  disabled,
  dataTest,
  required,
  onChange,
  className,
  onKeyDown,
  unitPosition,
  inputClassName,
  labelClassName,
  errorClassName,
  ...restProps
}) => {
  const classes = useStyles();

  const handleKeyDown = (e) => {
    const charCode = e.keyCode || e.which;

    if (
      !(
        // allow delete, backspace, dot, move,
        (
          [8, 37, 38, 39, 40, 46, 110, 190].includes(charCode) ||
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
      className={className}
      data-test={dataTest || 'component-input-number-root'}
    >
      {label ? (
        <FieldLabel
          label={label}
          htmlFor={name}
          required={required}
          className={labelClassName}
        />
      ) : null}
      <div
        className={classNames(
          classes.inputWrapper,
          unitPosition,
          disabled && 'disabled',
        )}
      >
        {unit ? (
          <div className={classes.unit} data-test="component-input-number-unit">
            {unit}
          </div>
        ) : null}
        <FieldInput
          name={name}
          hasError={!!error}
          required={required}
          className={classNames(classes.input, inputClassName)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          autoComplete="off"
          onChange={({ target: { name, value } }) => {
            onChange({ name, value });
          }}
          {...restProps}
          type="number"
        />
      </div>
      {error ? <FieldError error={error} className={errorClassName} /> : null}
    </div>
  );
};

InputNumber.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  unit: PropTypes.node,
  label: PropTypes.node,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  onKeyDown: PropTypes.func,
  dataTest: PropTypes.string,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  errorClassName: PropTypes.string,
  unitPosition: PropTypes.oneOf(['prefix', 'suffix']),
};
InputNumber.defaultProps = {
  error: '',
  unit: null,
  dataTest: '',
  className: '',
  required: false,
  disabled: false,
  label: undefined,
  inputClassName: '',
  labelClassName: '',
  errorClassName: '',
  onKeyDown: undefined,
  unitPosition: 'prefix',
};

export default memo(InputNumber);

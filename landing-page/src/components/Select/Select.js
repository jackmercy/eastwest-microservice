import React, { memo } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ReactSelect, { components } from 'react-select';

import { FieldLabel, FieldError } from '../Input';

import useStyles from './select.styles';

const Select = ({
  id,
  name,
  size,
  label,
  error,
  options,
  onChange,
  required,
  disabled,
  dataTest,
  className,
  ...restProps
}) => {
  const classes = useStyles();

  return (
    <div
      className={classNames(classes.root, className)}
      data-test={dataTest || 'component-select-root'}
    >
      {label ? (
        <FieldLabel htmlFor={id || name} label={label} required={required} />
      ) : null}
      <ReactSelect
        instanceId={id || name}
        name={name}
        onChange={(value) => onChange({ name, value })}
        options={options}
        required={required}
        className={classNames(classes.select, size, error && 'error')}
        classNamePrefix="custom-react-select"
        isDisabled={disabled}
        components={{
          DropdownIndicator: (props) => (
            <components.DropdownIndicator {...props}>
              <i className="icon-triangle-down" />
            </components.DropdownIndicator>
          ),
        }}
        {...restProps}
      />
      {error ? <FieldError error={error} /> : null}
    </div>
  );
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string,
  label: PropTypes.node,
  error: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  dataTest: PropTypes.string,
  className: PropTypes.string,
  isSearchable: PropTypes.bool,
  size: PropTypes.oneOf(['large', 'medium', 'small']),
};
Select.defaultProps = {
  id: '',
  error: '',
  dataTest: '',
  className: '',
  size: 'medium',
  disabled: false,
  required: false,
  label: undefined,
  isSearchable: false,
};

export default memo(Select);

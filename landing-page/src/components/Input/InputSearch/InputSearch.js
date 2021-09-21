import React, { memo } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { useFormValidation } from '../../../hooks';
import { FieldLabel, FieldInput } from '../components';

import useStyles from './inputSearch.styles';

const InputSearch = ({
  label,
  onSearch,
  dataTest,
  required,
  className,
  inputClassName,
  labelClassName,
  ...restProps
}) => {
  const classes = useStyles();
  const {
    errors,
    formValues,
    handleResetFieldError,
    handleSetFieldValue,
    handleKeyDownEnter,
  } = useFormValidation({});

  const handleSearch = () => {
    onSearch(formValues.search);
  };

  return (
    <div
      className={className}
      data-test={dataTest || 'component-input-search-root'}
    >
      {label ? (
        <FieldLabel
          label={label}
          htmlFor="search"
          required={required}
          className={labelClassName}
        />
      ) : null}
      <div className={classes.inputWrapper}>
        <FieldInput
          {...restProps}
          type="text"
          name="search"
          hasError={!!errors.search}
          required={required}
          className={classNames(classes.input, inputClassName)}
          onChange={({ target: { name, value } }) =>
            handleSetFieldValue(name, value)}
          onFocus={() => handleResetFieldError('search')}
          onKeyDown={(e) => handleKeyDownEnter(e, handleSearch)}
        />
        <i
          onClick={handleSearch}
          role="presentation"
          className="icon-search"
          data-test="component-input-search-icon"
        />
      </div>
    </div>
  );
};

InputSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
  label: PropTypes.node,
  required: PropTypes.bool,
  dataTest: PropTypes.string,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
};
InputSearch.defaultProps = {
  dataTest: '',
  className: '',
  required: false,
  label: undefined,
  inputClassName: '',
  labelClassName: '',
};

export default memo(InputSearch);

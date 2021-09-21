import React from 'react';
import { Labeled, useInput, useTranslate } from 'react-admin';
import Creatable from 'react-select/creatable';

const SelectCreatable = (props) => {
  const translate = useTranslate();
  const {
    input: { name, onChange, onBlur, value },
    meta: { touched, error },
    isRequired,
  } = useInput(props);

  const handleOnChange = (options) => {
    onChange({
      target: {
        name,
        value: options.map(({ value }) => value),
      },
    });
  };

  return (
    <>
      <Labeled {...props} isRequired={isRequired}>
        <Creatable
          isMulti
          noOptionsMessage={() => 'Type something and enter to add'}
          name={name}
          defaultValue={
            value ? value.map((i) => ({ label: i, value: i })) : value
          }
          onBlur={() => onBlur(value)}
          onChange={handleOnChange}
          error={!!(touched && error)}
          helperText={touched && error}
          isRequired={isRequired}
          styles={{
            control: (provided) => ({
              ...provided,
              border: 'none',
              borderBottom:
                touched && error
                  ? '1px solid #C80030'
                  : '1px solid rgba(0, 0, 0, 0.42)',
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
              borderRadius: '4px 4px 0 0',
            }),
          }}
        />
      </Labeled>
      {!!(touched && error) && (
        // eslint-disable-next-line max-len
        <p className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error MuiFormHelperText-marginDense">
          {translate(error)}
        </p>
      )}
    </>
  );
};

export default SelectCreatable;

import { useState } from 'react';
import { useIntl } from 'react-intl';

/**
 * @function useFormValidation
 * @description A custom hook used for managing and validating form values
 * @param {*} initialFormValues - initial form values
 * @param {Function} validate - Optional. A function validate form values `(formValues) => { valid: Boolean, errors: { [key:string]: error } }`
 */
const useFormValidation = (
  initialFormValues = {},
  validate = () => ({ valid: true, errors: [] }),
) => {
  const intl = useIntl();
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState(initialFormValues);

  const translateError = (message) =>
    (message ? intl.formatMessage({ id: message }) : '');

  const handleSetFieldValue = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSetMultipleFieldValues = (newFieldValues) => {
    setFormValues({ ...formValues, ...newFieldValues });
  };

  const handleResetFormValues = () => {
    setFormValues(initialFormValues);
    setErrors({});
  };

  const handleResetFieldError = (name) => {
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (callback) => {
    const validation = validate(formValues);
    if (validation.valid) {
      callback(formValues);
    } else {
      setErrors(validation.errors);
    }
  };

  const handleKeyDownEnter = (e, callback) => {
    const charCode = e.keyCode || e.which;

    if (charCode === 13 && callback) {
      e.preventDefault();
      handleSubmit(callback);
    }
  };

  return {
    valid: validate(formValues).valid,
    formValues,
    setFormValues,
    errors,
    setErrors,
    translateError,
    handleSetFieldValue,
    handleSetMultipleFieldValues,
    handleResetFormValues,
    handleResetFieldError,
    handleSubmit,
    handleKeyDownEnter,
  };
};

export default useFormValidation;

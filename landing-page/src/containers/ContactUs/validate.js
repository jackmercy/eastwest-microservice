import { formUtil } from '../../utils';

const validations = {
  reason: [
    { fn: formUtil.validation.require, error: 'FORM_VALIDATION.REQUIRED' },
  ],
  firstName: [
    { fn: formUtil.validation.require, error: 'FORM_VALIDATION.REQUIRED' },
  ],
  lastName: [
    { fn: formUtil.validation.require, error: 'FORM_VALIDATION.REQUIRED' },
  ],
  phoneCode: [
    { fn: formUtil.validation.require, error: 'FORM_VALIDATION.REQUIRED' },
  ],
  phoneNumber: [
    { fn: formUtil.validation.require, error: 'FORM_VALIDATION.REQUIRED' },
  ],
  emailAddress: [
    { fn: formUtil.validation.require, error: 'FORM_VALIDATION.REQUIRED' },
    {
      fn: formUtil.validation.email,
      error: 'FORM_VALIDATION.EMAIL_INVALID',
    },
  ],
  agreeWithTerms: [{ fn: (value) => value, error: 'required' }],
};
const validate = (formValues) => formUtil.validate(formValues, validations);

export default validate;

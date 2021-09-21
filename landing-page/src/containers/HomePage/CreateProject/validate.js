import { formUtil } from '../../../utils';

const validations = {
  firstName: [
    { fn: formUtil.validation.require, error: 'FORM_VALIDATION.REQUIRED' },
  ],
  lastName: [
    { fn: formUtil.validation.require, error: 'FORM_VALIDATION.REQUIRED' },
  ],
  emailAddress: [
    { fn: formUtil.validation.require, error: 'FORM_VALIDATION.REQUIRED' },
    {
      fn: formUtil.validation.email,
      error: 'FORM_VALIDATION.EMAIL_INVALID',
    },
  ],
  phoneNumber: [
    { fn: formUtil.validation.require, error: 'FORM_VALIDATION.REQUIRED' },
  ],
  companyName: [
    { fn: formUtil.validation.require, error: 'FORM_VALIDATION.REQUIRED' },
  ],
  title: [
    { fn: formUtil.validation.require, error: 'FORM_VALIDATION.REQUIRED' },
  ],
  country: [
    { fn: formUtil.validation.require, error: 'FORM_VALIDATION.REQUIRED' },
  ],
};
const validate = (formValues) => formUtil.validate(formValues, validations);

export default validate;

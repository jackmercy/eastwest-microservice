import { formUtil } from '../../../../../utils';

const validations = {
  emailAddress: [
    { fn: formUtil.validation.require, error: 'FORM_VALIDATION.REQUIRED' },
    {
      fn: formUtil.validation.email,
      error: 'FORM_VALIDATION.EMAIL_INVALID',
    },
  ],
};
const validate = (formValues) => formUtil.validate(formValues, validations);

export default validate;

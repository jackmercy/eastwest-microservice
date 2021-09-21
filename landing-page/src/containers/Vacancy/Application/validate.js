import { formUtil } from '../../../utils';

export const formKeys = {
  avatar: 'avatar',
  firstName: 'firstName',
  lastName: 'lastName',
  emailAddress: 'emailAddress',
  phoneCode: 'phoneCode',
  phoneNumber: 'phoneNumber',
  address: 'address',
  linkedinProfile: 'linkedinProfile',
  knownFrom: 'knownFrom',
  resumes: 'resumes',
  agreeWithTerms: 'agreeWithTerms',
};

const hasExtension = (fileName, exts) =>
  new RegExp(`(${exts.join('|').replace(/\./g, '\\.')})$`).test(fileName);

const isValidUrl = (url) => {
  const result = url.match(
    // eslint-disable-next-line max-len, no-useless-escape
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
  );
  return result !== null;
};

const validations = {
  [formKeys.avatar]: [
    {
      fn: formUtil.validation.require,
      error: 'VACANCY.FORM.ERROR.AVATAR.REQUIRED',
    },
    {
      fn: (file) => file && hasExtension(file.name, ['png', 'jpg']),
      error: 'VACANCY.FORM.ERROR.AVATAR.TYPE',
    },
    {
      fn: (file) => file && file.size < 15 * 1024 * 1024,
      error: 'VACANCY.FORM.ERROR.AVATAR.MAX_SIZE',
    },
  ],
  [formKeys.firstName]: [
    { fn: formUtil.validation.require, error: 'FORM_VALIDATION.REQUIRED' },
  ],
  [formKeys.lastName]: [
    { fn: formUtil.validation.require, error: 'FORM_VALIDATION.REQUIRED' },
  ],
  [formKeys.phoneCode]: [
    { fn: formUtil.validation.require, error: 'FORM_VALIDATION.REQUIRED' },
  ],
  [formKeys.phoneNumber]: [
    { fn: formUtil.validation.require, error: 'FORM_VALIDATION.REQUIRED' },
  ],
  [formKeys.emailAddress]: [
    { fn: formUtil.validation.require, error: 'FORM_VALIDATION.REQUIRED' },
    {
      fn: formUtil.validation.email,
      error: 'FORM_VALIDATION.EMAIL_INVALID',
    },
  ],
  [formKeys.linkedinProfile]: [
    {
      fn: (value) => (value ? isValidUrl(value) : true),
      error: 'VACANCY.FORM.ERROR.LINKEDIN.MUST_BE_URL',
    },
  ],
  [formKeys.knownFrom]: [
    { fn: (value) => value, error: 'FORM_VALIDATION.REQUIRED' },
  ],
  [formKeys.resumes]: [
    {
      fn: (files) => files && files.length > 0,
      error: 'VACANCY.FORM.ERROR.RESUMES.REQUIRED',
    },
    {
      fn: (files) => files && files.length <= 3,
      error: 'VACANCY.FORM.ERROR.RESUMES.MAX',
    },
    {
      fn: (files) =>
        files &&
        files.every((file) => hasExtension(file.name, ['doc', 'docx', 'pdf'])),
      error: 'VACANCY.FORM.ERROR.RESUMES.TYPE',
    },
    {
      fn: (files) =>
        files && files.every((file) => file.size < 15 * 1024 * 1024),
      error: 'VACANCY.FORM.ERROR.RESUMES.MAX_SIZE',
    },
  ],
  [formKeys.agreeWithTerms]: [{ fn: (value) => value, error: 'required' }],
};
const validate = (formValues) => formUtil.validate(formValues, validations);

export default validate;

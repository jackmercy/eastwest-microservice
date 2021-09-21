const containLowerCharacter = (value) => new RegExp('^(?=.*[a-z])').test(value);
const containUpperCharacter = (value) => new RegExp('^(?=.*[A-Z])').test(value);
const containSpecialCharacter = (value) =>
  new RegExp('^(?=.*[!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~])').test(value);
const containNumber = (value) => new RegExp('^(?=.*[0-9])').test(value);
const length = (value, compareValue) => String(value).length === compareValue;
const minLength = (value, min) => new RegExp(`^(?=.{${min},})`).test(value);
const maxLength = (value, max) => new RegExp(`^(?=.{0,${max}}$)`).test(value);
const min = (value, compareValue) => Number(value) >= compareValue;
const max = (value, compareValue) => Number(value) <= compareValue;
const require = (value) => value;
const email = (value) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
const password = (value) =>
  new RegExp(
    // eslint-disable-next-line max-len
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~])(?=.{8,})',
  ).test(value);

/** ************************************************************************************* */

/**
 * @function validate
 * @description Validate form values
 * @param {Object} formValues - An object `{ [key:string]: string }`
 * @param {Object} validations - An object `{ [key:string]: Array[]({ fn: function(formValues[key]) => Boolean, error: string }) }`
 * @example
 * const formValues = {
 *     emailAddress: 'emailaddressgmail.com',
 *     password: '123'
 * };
 * const validations = {
 *     emailAddress: [{ fn: 'email', error: 'Invalid email' }],
 *     password: [
 *         { fn: 'minLength', error: 'Length not enough' },
 *         { fn: 'maxLength', error: 'Too long' }
 *     ],
 * };
 *
 * formValidate(formValues, validation)
 * => { valid: false, errors: { emailAddress: 'Invalid email', password: 'Length not enough' } }
 * @returns {Object} Return an object with format `{ valid: Boolean, errors: { [key:string]: error } }`
 */
const validate = (formValues, validations) => {
  let valid = true;
  const errors = {};

  try {
    if (!formValues || !validations) {
      throw new Error('Wrong inputs format');
    }

    Object.keys(validations).forEach((key) => {
      if (!validations[key] || !validations[key].length) {
        throw new Error(`Validation of "${key}" not found`);
      }

      validations[key].forEach(({ fn, error }) => {
        if (!fn) {
          throw new Error(`Function validate of "${key}" not found`);
        }
        if (!error) {
          throw new Error(`Error message of "${key}" not found`);
        }

        if (!fn(formValues[key], formValues)) {
          if (errors[key]) return;
          valid = false;
          errors[key] = error;
        }
      });
    });
  } catch (e) {
    valid = false;
    console.error(e); // eslint-disable-line no-console
  }

  return { valid, errors };
};

export default {
  validate,
  validation: {
    require,
    email,
    password,
    length,
    minLength,
    maxLength,
    min,
    max,
    containNumber,
    containLowerCharacter,
    containUpperCharacter,
    containSpecialCharacter,
  },
};

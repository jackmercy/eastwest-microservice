const joi = require('joi');
const mail = require('./mail.schema')(joi);

const schemas = Object.create({ mail });

const schemaValidator = async (object, type) => {
  try {
    if (!object) {
      throw 'object to validate not provided';
    }
    if (!type) {
      throw 'type to validate not provided';
    }
    if (!schemas[type]) {
      throw 'schema type does not existed';
    }

    const { error, value } = schemas[type].validate(object);
    if (error) {
      throw error;
    }

    return value;
  } catch (error) {
    throw `Invalid ${type} schema, ${error}`;
  }
};

module.exports = Object.create({ validate: schemaValidator, schemas });

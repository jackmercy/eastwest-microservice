const joi = require('joi');
const claims = require('./claims.schema')(joi);
const permission = require('./permission.schema')(joi);
const User = require('./user.model');
const CommunityMember = require('./communityMember.model');
const Role = require('./role.model');
const Permission = require('./permission.model');

const schemas = Object.create({ claims, permission });

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

module.exports = Object.create({
  validate: schemaValidator,
  schemas,
  User,
  Role,
  Permission,
  CommunityMember,
});

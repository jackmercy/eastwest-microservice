const claimsSchema = (joi) =>
  joi.object({
    userId: joi.string().required(),
    emailAddress: joi.string().email().required(),
    roles: joi.array().items(joi.string().required()),
    resource: joi.string().empty(''),
  });
module.exports = claimsSchema;

const newContactSchema = (joi) =>
  joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    emailAddress: joi.string().email().required(),
    reason: joi.string().required(),
    phoneNumber: joi.string().required(),
    description: joi.string(),
  });

module.exports = newContactSchema;

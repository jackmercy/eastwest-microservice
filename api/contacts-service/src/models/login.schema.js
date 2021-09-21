const loginSchema = (joi) =>
  joi.object({
    emailAddress: joi.string().email().required(),
    socialId: joi.string().required(),
  });
module.exports = loginSchema;

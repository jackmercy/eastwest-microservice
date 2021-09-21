const loginSchema = (joi) =>
  joi.object({
    emailAddress: joi.string().email().required(),
    password: joi.string().required(),
    rememberMe: joi.boolean(),
  });
module.exports = loginSchema;

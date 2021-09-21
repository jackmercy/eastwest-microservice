const mailSchema = (joi) =>
  joi.object({
    from: joi.string().email(),
    to: joi.string().email().required(),
    subject: joi.string().required(),
    html: joi.string(),
    text: joi.string(),
    cc: joi.array().items(joi.string()),
    bcc: joi.array().items(joi.string()),
  });
module.exports = mailSchema;

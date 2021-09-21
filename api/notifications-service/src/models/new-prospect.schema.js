const newProspectSchema = (joi) =>
  joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    emailAddress: joi.string().email().required(),
    companyName: joi.string(),
    phoneNumber: joi.string(),
    title: joi.string(),
    description: joi.string(),
  });

module.exports = newProspectSchema;

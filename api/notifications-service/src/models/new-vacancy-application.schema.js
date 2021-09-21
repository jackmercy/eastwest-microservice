const newVacancyApplicationSchema = (joi) =>
  joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    emailAddress: joi.string().email().required(),
    phoneNumber: joi.string().required(),
    knownFrom: joi.string().required(),
    linkedinProfile: joi.string().empty(''),
  });

module.exports = newVacancyApplicationSchema;

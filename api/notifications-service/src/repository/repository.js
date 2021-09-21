const repository = (container) => {
  const logError = container.resolve('logError');
  const mailService = container.resolve('mailService');
  const templates = container.resolve('templates');
  const landingPageUrl = `https://${process.env.LANDING_PAGE_DOMAIN}`;
  const commonConfigs = {
    landingPageUrl,
    termsUrl: `${landingPageUrl}/terms`,
    privacyUrl: `${landingPageUrl}/privacy`,
    careersUrl: `${landingPageUrl}/careers`,
    cmsUrl: `https://${process.env.CMS_DOMAIN}`,
    adminEmail: process.env.ADMIN_EMAIL,
    systemEmail: process.env.SYSTEM_EMAIL,
    supportEmail: process.env.SUPPORT_EMAIL,
  };

  const createNewProspectEmail = async (payload) => {
    try {
      // Send an email to user
      const userHtmlTemplate = await templates.renderEmail(
        'new-prospect-request',
        {
          fullName: `${payload.firstName} ${payload.lastName}`,
          supportEmail: commonConfigs.supportEmail,
          landingPageUrl: commonConfigs.landingPageUrl,
          termsUrl: commonConfigs.termsUrl,
          privacyUrl: commonConfigs.privacyUrl,
        },
      );
      await mailService.sendMail({
        to: payload.emailAddress,
        subject: 'Thank you for contacting us',
        html: userHtmlTemplate,
      });
      // Send a notification email to admins
      const adminHtmlTemplate = await templates.renderEmail(
        'new-prospect-request-admin',
        {
          fullName: `${payload.firstName} ${payload.lastName}`,
          emailAddress: payload.emailAddress,
          phoneNumber: payload.phoneNumber,
          message: payload.description || 'Unknown',
          cmsUrl: `${commonConfigs.cmsUrl}/#/prospects`,
        },
      );
      await mailService.sendMail({
        to: commonConfigs.adminEmail,
        subject: 'Have a new prospect request',
        html: adminHtmlTemplate,
      });

      return payload;
    } catch (error) {
      logError('An error occured sending new prospect email', error, payload);
      throw error;
    }
  };

  const createNewContactEmail = async (payload) => {
    try {
      // Send an email to user
      const userHtmlTemplate = await templates.renderEmail(
        'new-contact-request',
        {
          fullName: `${payload.firstName} ${payload.lastName}`,
          supportEmail: commonConfigs.supportEmail,
          landingPageUrl: commonConfigs.landingPageUrl,
          termsUrl: commonConfigs.termsUrl,
          privacyUrl: commonConfigs.privacyUrl,
        },
      );
      await mailService.sendMail({
        to: payload.emailAddress,
        subject: 'Thank you for contacting us',
        html: userHtmlTemplate,
      });
      // Send a notification email to admins
      const adminHtmlTemplate = await templates.renderEmail(
        'new-contact-request-admin',
        {
          fullName: `${payload.firstName} ${payload.lastName}`,
          emailAddress: payload.emailAddress,
          phoneNumber: payload.phoneNumber,
          reason: payload.reason || 'Unknown',
          cmsUrl: `${commonConfigs.cmsUrl}/#/contacts`,
        },
      );
      await mailService.sendMail({
        to: commonConfigs.adminEmail,
        subject: 'Have a new contact request',
        html: adminHtmlTemplate,
      });

      return payload;
    } catch (error) {
      logError('An error occured sending new contact email', error, payload);
      throw error;
    }
  };

  const createNewVacancyApplicationEmail = async (payload) => {
    try {
      // Send an email to user
      const userHtmlTemplate = await templates.renderEmail(
        'new-vacancy-application-request',
        {
          fullName: `${payload.firstName} ${payload.lastName}`,
          supportEmail: commonConfigs.supportEmail,
          landingPageUrl: commonConfigs.landingPageUrl,
          termsUrl: commonConfigs.termsUrl,
          privacyUrl: commonConfigs.privacyUrl,
        },
      );
      await mailService.sendMail({
        to: payload.emailAddress,
        subject: 'Thank you for applying',
        html: userHtmlTemplate,
      });
      // Send a notification email to admins
      const adminHtmlTemplate = await templates.renderEmail(
        'new-vacancy-application-request-admin',
        {
          fullName: `${payload.firstName} ${payload.lastName}`,
          emailAddress: payload.emailAddress,
          phoneNumber: payload.phoneNumber,
          knownFrom: payload.knownFrom,
          linkedinProfile: payload.linkedinProfile || 'Unknown',
          cmsUrl: `${commonConfigs.cmsUrl}/#/applications`,
        },
      );
      await mailService.sendMail({
        to: commonConfigs.adminEmail,
        subject: 'Have a new vacancy application',
        html: adminHtmlTemplate,
      });

      return payload;
    } catch (error) {
      logError(
        'An error occured sending new vacancy application',
        error,
        payload,
      );
      throw error;
    }
  };

  const resendVacancyApplicationEmail = async (payload) => {
    try {
      // Send an email to user
      const userHtmlTemplate = await templates.renderEmail(
        'existed-vacancy-application-request',
        {
          fullName: `${payload.firstName} ${payload.lastName}`,
          landingPageUrl: commonConfigs.landingPageUrl,
          termsUrl: commonConfigs.termsUrl,
          privacyUrl: commonConfigs.privacyUrl,
          careersUrl: commonConfigs.careersUrl,
        },
      );
      await mailService.sendMail({
        to: payload.emailAddress,
        subject: 'Thank you for applying',
        html: userHtmlTemplate,
      });

      return payload;
    } catch (error) {
      logError('An error occured resending vacancy application', error, payload);
      throw error;
    }
  };

  const disconnect = () => {
    db.close();
  };

  return Object.create({
    createNewProspectEmail,
    createNewContactEmail,
    createNewVacancyApplicationEmail,
    resendVacancyApplicationEmail,
    disconnect,
  });
};

const connect = (container) => {
  return new Promise((resolve, reject) => {
    if (!container) {
      reject(new Error('dependencies not supplied!'));
    }
    resolve(repository(container));
  });
};

module.exports = Object.assign({}, { connect });

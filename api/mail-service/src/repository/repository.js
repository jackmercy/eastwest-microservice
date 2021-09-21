const Mailgun = require('mailgun-js');

const repository = (container) => {
  const logError = container.resolve('logError');
  const mailSettings = container.resolve('mailSettings');
  const mailgun = new Mailgun({
    apiKey: mailSettings.apiKey,
    domain: mailSettings.domain,
  });

  const sendMail = async (payload) => {
    try {
      const options = {
        ...payload,
        from: payload.from || mailSettings.sender,
      };
      await mailgun.messages().send(options);
      return payload;
    } catch (error) {
      logError('An error occured sending email', error, payload);
      throw { msg: 'Can not send email', details: error };
    }
  };

  return Object.create({ sendMail });
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

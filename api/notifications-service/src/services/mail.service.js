const supertest = require('supertest');

const settings = {
  HOST: process.env.MAIL_SERVICE_HOST || 'localhost',
  PORT: process.env.MAIL_SERVICE_PORT || 3002,
};

const sendMail = async (payload) => {
  try {
    const response = await supertest(`http://${settings.HOST}:${settings.PORT}`)
      .post('/mail/send-mail')
      .send(payload);

    if (response.status >= 400) {
      throw response.body.error;
    }

    return response.body;
  } catch (error) {
    throw { msg: 'An error occured with mail service', details: error };
  }
};

module.exports = Object.assign({ sendMail });

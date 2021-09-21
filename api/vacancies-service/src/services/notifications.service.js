const supertest = require('supertest');

const settings = {
  HOST: process.env.NOTIFICATIONS_SERVICE_HOST || 'localhost',
  PORT: process.env.NOTIFICATIONS_SERVICE_PORT || 3001,
};

const createNewApplicationEmail = async ({
  firstName,
  lastName,
  emailAddress,
  phoneNumber,
  knownFrom,
  linkedinProfile,
}) => {
  try {
    const response = await supertest(`http://${settings.HOST}:${settings.PORT}`)
      .post('/notifications/vacancies/new-application')
      .set('Accept', 'application/json')
      .send({
        firstName,
        lastName,
        emailAddress,
        phoneNumber,
        knownFrom,
        linkedinProfile,
      });

    if (response.status >= 400) {
      throw response.body.error;
    }

    return response.body;
  } catch (error) {
    throw {
      msg: 'An error occured with notifications service',
      details: error,
    };
  }
};

const resendApplicationEmail = async ({
  firstName,
  lastName,
  emailAddress,
  phoneNumber,
  knownFrom,
  linkedinProfile,
}) => {
  try {
    const response = await supertest(`http://${settings.HOST}:${settings.PORT}`)
      .post('/notifications/vacancies/resend-application')
      .set('Accept', 'application/json')
      .send({
        firstName,
        lastName,
        emailAddress,
        phoneNumber,
        knownFrom,
        linkedinProfile,
      });

    if (response.status >= 400) {
      throw response.body.error;
    }

    return response.body;
  } catch (error) {
    throw {
      msg: 'An error occured with notifications service',
      details: error,
    };
  }
};

module.exports = Object.assign({
  createNewApplicationEmail,
  resendApplicationEmail,
});

const supertest = require('supertest');

const settings = {
  HOST: process.env.NOTIFICATIONS_SERVICE_HOST || 'localhost',
  PORT: process.env.NOTIFICATIONS_SERVICE_PORT || 3001,
};

const createNewProspectEmail = async ({
  firstName,
  lastName,
  emailAddress,
  companyName,
  phoneNumber,
  title,
  description,
}) => {
  try {
    const response = await supertest(`http://${settings.HOST}:${settings.PORT}`)
      .post('/notifications/prospect/new-request')
      .set('Accept', 'application/json')
      .send({
        firstName,
        lastName,
        emailAddress,
        companyName,
        phoneNumber,
        title,
        description,
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

module.exports = Object.assign({ createNewProspectEmail });

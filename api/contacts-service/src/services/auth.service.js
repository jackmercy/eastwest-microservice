const supertest = require('supertest');

const settings = {
  HOST: process.env.AUTH_SERVICE_HOST || 'localhost',
  PORT: process.env.AUTH_SERVICE_PORT || 3001,
};

const generateToken = async (data) => {
  try {
    const response = await supertest(`http://${settings.HOST}:${settings.PORT}`)
      .post('/auth/generate-token')
      .set('Accept', 'application/json')
      .send(data);

    if (response.status >= 400) {
      throw response.body.error;
    }

    return response.body;
  } catch (error) {
    throw { msg: 'An error occured with auth service', details: error };
  }
};

const verifyToken = async (token) => {
  try {
    const response = await supertest(`http://${settings.HOST}:${settings.PORT}`)
      .post('/auth/verify-token')
      .set('Accept', 'application/json')
      .send({ token });

    if (response.status >= 400) {
      throw response.body.error;
    }

    return response.body;
  } catch (error) {
    throw { msg: 'An error occured with auth service', details: error };
  }
};

const verifyPermissions = async (data) => {
  try {
    const response = await supertest(`http://${settings.HOST}:${settings.PORT}`)
      .post('/auth/verify-permissions')
      .set('Accept', 'application/json')
      .send(data);

    if (response.status >= 400) {
      throw response.body.error;
    }

    return response.body;
  } catch (error) {
    throw { msg: 'An error occured with auth service', details: error };
  }
};

module.exports = Object.assign({
  generateToken,
  verifyToken,
  verifyPermissions,
});

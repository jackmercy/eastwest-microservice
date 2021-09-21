const supertest = require('supertest');

const settings = {
  HOST: process.env.ROLES_SERVICE_HOST || 'localhost',
  PORT: process.env.ROLES_SERVICE_PORT || 3001,
};

const getRoles = async (token) => {
  try {
    const response = await supertest(`http://${settings.HOST}:${settings.PORT}`)
      .get(`/roles`)
      .set('Authorization', `Bearer ${token}`);

    if (response.status >= 400) {
      throw response.body.error;
    }

    return response.body;
  } catch (error) {
    throw { msg: 'An error occured with roles service', details: error };
  }
};

const getRoleByAlias = async (token, alias) => {
  try {
    const response = await supertest(`http://${settings.HOST}:${settings.PORT}`)
      .get(`/roles/alias/${alias}`)
      .set('Authorization', `Bearer ${token}`);

    if (response.status >= 400) {
      throw response.body.error;
    }

    return response.body;
  } catch (error) {
    throw { msg: 'An error occured with roles service', details: error };
  }
};

module.exports = Object.assign({ getRoles, getRoleByAlias });

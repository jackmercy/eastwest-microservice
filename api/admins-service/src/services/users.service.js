const supertest = require('supertest');

const settings = {
  HOST: process.env.USERS_SERVICE_HOST || 'localhost',
  PORT: process.env.USERS_SERVICE_PORT || 3001,
};

const createUser = async (token, data) => {
  try {
    const response = await supertest(`http://${settings.HOST}:${settings.PORT}`)
      .post('/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(data);

    if (response.status >= 400) {
      throw response.body.error;
    }

    return response.body;
  } catch (error) {
    throw { msg: 'An error occured with users service', details: error };
  }
};

const getAllUsersByRoleId = async (token, { roleId, skip = 0, limit = 20 }) => {
  try {
    const response = await supertest(`http://${settings.HOST}:${settings.PORT}`)
      .get(`/users/role/${roleId}/?skip=${skip}&limit=${limit}`)
      .set('Authorization', `Bearer ${token}`);

    if (response.status >= 400) {
      throw response.body.error;
    }

    return response.body;
  } catch (error) {
    throw { msg: 'An error occured with users service', details: error };
  }
};

const getUserByEmail = async (token, emailAddress) => {
  try {
    const response = await supertest(`http://${settings.HOST}:${settings.PORT}`)
      .get(`/users/email/${emailAddress}`)
      .set('Authorization', `Bearer ${token}`);

    if (response.status >= 400) {
      throw response.body.error;
    }

    return response.body;
  } catch (error) {
    throw { msg: 'An error occured with users service', details: error };
  }
};

const getUserById = async (token, id) => {
  try {
    const response = await supertest(`http://${settings.HOST}:${settings.PORT}`)
      .get(`/users/${id}`)
      .set('Authorization', `Bearer ${token}`);

    if (response.status >= 400) {
      throw response.body.error;
    }

    return response.body;
  } catch (error) {
    throw { msg: 'An error occured with users service', details: error };
  }
};

const deleteUserById = async (token, id) => {
  try {
    const response = await supertest(`http://${settings.HOST}:${settings.PORT}`)
      .delete(`/users/${id}`)
      .set('Authorization', `Bearer ${token}`);

    if (response.status >= 400) {
      throw response.body.error;
    }

    return response.body;
  } catch (error) {
    throw { msg: 'An error occured with users service', details: error };
  }
};

const login = async (data) => {
  try {
    const response = await supertest(`http://${settings.HOST}:${settings.PORT}`)
      .post('/users/login')
      .set('Accept', 'application/json')
      .send(data);

    if (response.status >= 400) {
      throw response.body.error;
    }

    return response.body;
  } catch (error) {
    throw { msg: 'An error occured with users service', details: error };
  }
};

module.exports = Object.assign({
  createUser,
  getAllUsersByRoleId,
  getUserByEmail,
  getUserById,
  deleteUserById,
  login,
});

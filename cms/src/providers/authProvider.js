import decodeJWT from 'jwt-decode';
import { apiUtil, storageUtil } from '../utils';

const authProvider = {
  // authentication
  login: ({ username, password }) => {
    const request = new Request(apiUtil.admins.login, {
      method: 'POST',
      body: JSON.stringify({ emailAddress: username, password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    return fetch(request)
      .then((response) => Promise.all([response, response.json()]))
      .then(([response, body]) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(body.error.msg);
        }
        return body;
      })
      .then(storageUtil.setAuth)
      .catch((err) => {
        throw err;
      });
  },
  checkError: (error) => {
    const { status } = error;
    if (status === 401) {
      storageUtil.removeAuth();
      return Promise.reject();
    }

    // other error code (403, 404, 500, etc): no need to log out
    return Promise.resolve();
  },
  checkAuth: () => {
    const auth = storageUtil.getAuth();
    return auth ? Promise.resolve() : Promise.reject();
  },
  logout: () => {
    storageUtil.removeAuth();
    return Promise.resolve();
  },
  getIdentity: () => Promise.resolve(),
  // authorization
  getPermissions: () => {
    const auth = storageUtil.getAuth();
    return auth && auth.token
      ? Promise.resolve(decodeJWT(auth.token))
      : Promise.reject();
  },
};

export default authProvider;

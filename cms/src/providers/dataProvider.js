import { fetchUtils } from 'react-admin';

import { storageUtil } from '../utils';
import { API_ENDPOINT } from '../configs';

import customJSONDataProvider from './customJSONDataProvider';

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    // eslint-disable-next-line no-param-reassign
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const auth = storageUtil.getAuth();
  if (auth && auth.token) {
    options.headers.set('Authorization', `Bearer ${auth.token}`);
  }
  return fetchUtils.fetchJson(url, options);
};
const dataProvider = customJSONDataProvider(API_ENDPOINT, httpClient);

export default dataProvider;

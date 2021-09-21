import {
  fetchUtils,
  GET_LIST,
  GET_ONE,
  CREATE,
  UPDATE,
  UPDATE_MANY,
  DELETE,
  DELETE_MANY,
  GET_MANY,
  GET_MANY_REFERENCE,
} from 'react-admin';

import customJSONDataProvider from './customJSONDataProvider';

import { storageUtil } from '../utils';

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

/**
 *  Custom support multiple dataProviders
*/
const dataProviders = [
  {
    dataProvider: customJSONDataProvider('http://localhost:3405', httpClient),
    resources: ['users'],
  },
  {
    dataProvider: customJSONDataProvider('http://localhost:3404', httpClient),
    resources: ['roles'],
  },
  {
    dataProvider: customJSONDataProvider('http://localhost:3401', httpClient),
    resources: ['prospects'],
  },
  {
    dataProvider: customJSONDataProvider('http://localhost:3408', httpClient),
    resources: ['contacts'],
  },
  {
    dataProvider: customJSONDataProvider('http://localhost:3409', httpClient),
    resources: ['vacancies', 'vacancy-categories', 'vacancy-applications'],
  },
  {
    dataProvider: customJSONDataProvider('http://localhost:3411', httpClient),
    resources: ['news', 'news-categories', 'news-authors'],
  },
];

export default (type, resource, params) => {
  const dataProviderMapping = dataProviders.find((dp) =>
    dp.resources.includes(resource));

  const mappingType = {
    [GET_LIST]: 'getList',
    [GET_ONE]: 'getOne',
    [GET_MANY]: 'getMany',
    [GET_MANY_REFERENCE]: 'getManyReference',
    [CREATE]: 'create',
    [UPDATE]: 'update',
    [UPDATE_MANY]: 'updateMany',
    [DELETE]: 'delete',
    [DELETE_MANY]: 'deleteMany',
  };

  return dataProviderMapping.dataProvider[mappingType[type]](resource, params);
};

import { API_ENDPOINT, FETCHING_TIMEOUT } from '../../configs';
import { storageUtil } from '../utils';

const buildURL = (host, path) =>
  // eslint-disable-next-line no-useless-escape
  [host.replace(/[\/]+$/, ''), path.replace(/[\/]+$/, '')].join('/');

const buildQueryString = (params) => {
  if (!params) return '';

  return `?${Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
    )
    .join('&')}`;
};

const generateOptions = (customOptions) => {
  const defaultOptions = {
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const token = storageUtil.getToken();
  const result = { ...defaultOptions, ...customOptions };

  if (token) {
    result.headers.Authorization = `Bearer ${token}`;
  }

  return result;
};

const fetchWithTimeout = (args, timeout = FETCHING_TIMEOUT) =>
  Promise.race([
    fetch(...args),
    new Promise((_, rj) => {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        rj(new Error(`Fetching timeout in ${timeout} ms`));
      }, timeout);
    }),
  ]);

const handleResponse = (response, returnRaw) => {
  if (response.redirected && response.url) {
    return Promise.resolve(response);
  }

  if (!response.ok) {
    return Promise.reject(response);
  }

  if (response.status === 204) {
    return Promise.resolve(response);
  }

  if (returnRaw) {
    return response;
  }

  return response.json();
};

/**
 * @function apiGet
 * @description Make a GET request.
 * @param {string} path
 * @param {object} query
 * @param {object} options
 * @returns {promise}
 */
const apiGet = ({
  path,
  host = API_ENDPOINT,
  query = undefined,
  options = { timeout: undefined, returnRaw: false },
}) =>
  fetchWithTimeout(
    [
      `${buildURL(host, path)}${buildQueryString(query)}`,
      generateOptions({
        ...options,
        method: 'GET',
      }),
    ],
    options.timeout,
  )
    .then((res) => handleResponse(res, options.returnRaw))
    .catch((error) => handleResponse(error, options.returnRaw));

/**
 * @function apiPost
 * @description Make a POST request.
 * @param {string} path
 * @param {object} body
 * @param {object} options
 * @returns {promise}
 */
const apiPost = ({
  path,
  body,
  host = API_ENDPOINT,
  options = { keepBody: false, timeout: undefined, returnRaw: false },
}) =>
  fetchWithTimeout(
    [
      buildURL(host, path),
      generateOptions({
        ...options,
        method: 'POST',
        body: !options.keepBody ? JSON.stringify(body) : body,
      }),
    ],
    options.timeout,
  )
    .then((res) => handleResponse(res, options.returnRaw))
    .catch((error) => handleResponse(error, options.returnRaw));

/**
 * @function apiPut
 * @description Make a PUT request.
 * @param {string} path
 * @param {object} body
 * @param {object} options
 * @returns {promise}
 */
const apiPut = ({
  path,
  body,
  host = API_ENDPOINT,
  options = { keepBody: false, timeout: undefined, returnRaw: false },
}) =>
  fetchWithTimeout(
    [
      buildURL(host, path),
      generateOptions({
        ...options,
        method: 'PUT',
        body: !options.keepBody ? JSON.stringify(body) : body,
      }),
    ],
    options.timeout,
  )
    .then((res) => handleResponse(res, options.returnRaw))
    .catch((error) => handleResponse(error, options.returnRaw));

/**
 * @function apiDelete
 * @description Make a DELETE request.
 * @param {string} path
 * @param {object} body
 * @param {object} options
 * @returns {promise}
 */
const apiDelete = ({
  path,
  body,
  host = API_ENDPOINT,
  options = { keepBody: false, timeout: undefined, returnRaw: false },
}) =>
  fetchWithTimeout(
    [
      buildURL(host, path),
      generateOptions({
        ...options,
        method: 'DELETE',
        body: !options.keepBody ? JSON.stringify(body) : body,
      }),
    ],
    options.timeout,
  )
    .then((res) => handleResponse(res, options.returnRaw))
    .catch((error) => handleResponse(error, options.returnRaw));

/**
 * @function apiPatch
 * @description Make a PATCH request.
 * @param {string} path
 * @param {object} body
 * @param {object} options
 * @returns {promise}
 */
const apiPatch = ({
  path,
  body,
  host = API_ENDPOINT,
  options = { keepBody: false, timeout: undefined, returnRaw: false },
}) =>
  fetchWithTimeout(
    [
      buildURL(host, path),
      generateOptions({
        ...options,
        method: 'PATCH',
        body: !options.keepBody ? JSON.stringify(body) : body,
      }),
    ],
    options.timeout,
  )
    .then((res) => handleResponse(res, options.returnRaw))
    .catch((error) => handleResponse(error, options.returnRaw));

export default {
  get: apiGet,
  post: apiPost,
  put: apiPut,
  delete: apiDelete,
  patch: apiPatch,
};

import Cookie from 'js-cookie';

import { APP_NAME } from '../../configs';

const formatKey = (key) => `${APP_NAME}/${key}`;

const getItem = (key) => {
  let value;
  try {
    value = Cookie.get(formatKey(key));
  } catch (e) {
    value = null;
  }

  return value;
};

const setItem = (key, value, options = { expires: 30 }) => {
  try {
    Cookie.set(formatKey(key), value, options);
  } catch (e) {
    // Do nothing - fix incognito not support cookieStorage
  }
};

const removeItem = (key) => {
  try {
    Cookie.remove(formatKey(key));
  } catch (e) {
    // Do nothing - fix incognito not support cookieStorage
  }
};

export default {
  getItem,
  setItem,
  removeItem,
};

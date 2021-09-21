import { APP_NAME } from '../../configs';

const formatKey = (key) => `${APP_NAME}/${key}`;

const getItem = (key) => {
  let value;
  try {
    value = sessionStorage.getItem(formatKey(key));
  } catch (e) {
    value = null;
  }

  return value;
};

const setItem = (key, value) => {
  try {
    sessionStorage.setItem(formatKey(key), value);
  } catch (e) {
    // Do nothing - fix incognito not support localStorage
  }
};

const removeItem = (key) => {
  try {
    sessionStorage.removeItem(formatKey(key));
  } catch (e) {
    // Do nothing - fix incognito not support localStorage
  }
};

const clear = () => {
  try {
    sessionStorage.clear();
  } catch (e) {
    // Do nothing - fix incognito not support localStorage
  }
};

export default {
  getItem,
  setItem,
  removeItem,
  clear,
};

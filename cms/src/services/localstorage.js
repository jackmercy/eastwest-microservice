import { APP_NAME } from '../configs';

const formatKey = (key) => `${APP_NAME}/${key}`;

const getItem = (key) => {
  let value;
  try {
    value = localStorage.getItem(formatKey(key));
  } catch (e) {
    value = null;
  }

  return value;
};

const setItem = (key, value) => {
  try {
    localStorage.setItem(formatKey(key), value);
  } catch (e) {
    // Do nothing - fix incognito not support localstorage
  }
};

const removeItem = (key) => {
  try {
    localStorage.removeItem(formatKey(key));
  } catch (e) {
    // Do nothing - fix incognito not support localstorage
  }
};

const clear = () => {
  try {
    localStorage.clear();
  } catch (e) {
    // Do nothing - fix incognito not support localstorage
  }
};

export default {
  getItem,
  setItem,
  removeItem,
  clear,
};

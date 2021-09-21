import { APP_NAME } from '../../configs';
import { cookieStorageService, localStorageService } from '../services';

const TOKEN = `${APP_NAME}/token`;
const AUTH = `${APP_NAME}/auth`;
const LOCALE = `${APP_NAME}/locale`;
const NEWS_VIEWED = `${APP_NAME}/new-viewed`;

const setToken = (token) => {
  cookieStorageService.setItem(TOKEN, token, { expires: 1 });
};
const getToken = () => cookieStorageService.getItem(TOKEN);

const setAuth = (auth) => {
  cookieStorageService.setItem(AUTH, auth, { expires: 1 });
};
const getAuth = () => cookieStorageService.getItem(AUTH);

const setLocale = (locale) => {
  localStorageService.setItem(LOCALE, locale);
};
const getLocale = () => localStorageService.getItem(LOCALE);

const setNewsViewed = (newsViewed) => {
  cookieStorageService.setItem(NEWS_VIEWED, newsViewed, { expires: 1 });
};
const getNewsViewed = () => cookieStorageService.getItem(NEWS_VIEWED);

export default {
  setToken,
  getToken,
  setAuth,
  getAuth,
  setLocale,
  getLocale,
  setNewsViewed,
  getNewsViewed,
};

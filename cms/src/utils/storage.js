import { localstorageService } from '../services';

const AUTH = 'auth';
const setAuth = (data) => {
  localstorageService.setItem(AUTH, JSON.stringify(data));
};
const getAuth = () => {
  const data = localstorageService.getItem(AUTH);
  return data ? JSON.parse(data) : data;
};
const removeAuth = () => {
  localstorageService.removeItem(AUTH);
};

export default {
  setAuth,
  getAuth,
  removeAuth,
};

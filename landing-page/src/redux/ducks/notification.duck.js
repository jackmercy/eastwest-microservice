import { createAction, handleActions } from 'redux-actions';

const PREFIX = 'NOTIFICATION';
const initialStates = { appearance: undefined, message: undefined, raw: false };

export const notifyInfo = createAction(`${PREFIX}/INFO`);
export const notifySuccess = createAction(`${PREFIX}/SUCCESS`);
export const notifyWarning = createAction(`${PREFIX}/WARNING`);
export const notifyError = createAction(`${PREFIX}/ERROR`);
export const setNotification = createAction(`${PREFIX}/SET_NOTIFICATION`);

export const getNotification = (state) => state.notification;

export default handleActions(
  new Map([
    [
      setNotification,
      (state, { payload }) => ({ ...state, ...payload }),
    ],
  ]),
  { ...initialStates },
);

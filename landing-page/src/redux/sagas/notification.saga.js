import { takeLatest, all, put } from 'redux-saga/effects';

import {
  notifyInfo,
  notifySuccess,
  notifyWarning,
  notifyError,
  setNotification,
} from '../ducks/notification.duck';
import { NOTIFICATION_TYPES } from '../../providers/NotificationProvider';

function* onInfoNotificationFlow() {
  yield takeLatest(notifyInfo, function* onInfoNotification({ payload }) {
    const { dismiss, ...options } = payload;
    if (dismiss) return;
    const data = {
      id: Date.now(),
      appearance: NOTIFICATION_TYPES.info.value,
      ...options,
    };
    yield put(setNotification(data));
  });
}

function* onSuccessNotificationFlow() {
  yield takeLatest(notifySuccess, function* onSuccessNotification({ payload }) {
    const { dismiss, ...options } = payload;
    if (dismiss) return;
    const data = {
      id: Date.now(),
      appearance: NOTIFICATION_TYPES.success.value,
      ...options,
    };
    yield put(setNotification(data));
  });
}

function* onWarningNotificationFlow() {
  yield takeLatest(notifyWarning, function* onWarningNotification({ payload }) {
    const { dismiss, ...options } = payload;
    if (dismiss) return;
    const data = {
      id: Date.now(),
      appearance: NOTIFICATION_TYPES.warning.value,
      ...options,
    };
    yield put(setNotification(data));
  });
}

function* onErrorNotificationFlow() {
  yield takeLatest(notifyError, function* onErrorNotification({ payload }) {
    const { dismiss, ...options } = payload;
    if (dismiss) return;
    const data = {
      id: Date.now(),
      appearance: NOTIFICATION_TYPES.error.value,
      ...options,
    };
    yield put(setNotification(data));
  });
}

export default function* saga() {
  yield all([
    onInfoNotificationFlow(),
    onSuccessNotificationFlow(),
    onWarningNotificationFlow(),
    onErrorNotificationFlow(),
  ]);
}

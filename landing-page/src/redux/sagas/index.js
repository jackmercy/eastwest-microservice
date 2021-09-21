import { fork } from 'redux-saga/effects';

import form from './form.saga';
import notification from './notification.saga';
import news from './news.saga';

export default function* rootSagas() {
  yield fork(notification);
  yield fork(form);
  yield fork(news);
}

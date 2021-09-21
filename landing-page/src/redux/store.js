import createSagaMiddleware from 'redux-saga';
import { intlReducer } from 'react-intl-redux';
import { createWrapper } from 'next-redux-wrapper';
import { createStore, applyMiddleware, combineReducers } from 'redux';

import messages from '../intl';
import { storageUtil } from '../utils';
import { DEFAULT_LOCALE } from '../../configs';

import rootSagas from './sagas';
import rootDucks from './ducks';

const locale = storageUtil.getLocale() || DEFAULT_LOCALE;
const initialState = { intl: { locale, messages: messages[locale] } };

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line global-require, import/no-extraneous-dependencies
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const rootReducers = combineReducers({ intl: intlReducer, ...rootDucks });

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducers,
  initialState,
  bindMiddleware([sagaMiddleware]),
);
store.sagaTask = sagaMiddleware.run(rootSagas);

export const wrapper = createWrapper(() => store, { debug: true });

export default store;

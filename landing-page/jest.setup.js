import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

global.fetch = require('jest-fetch-mock');

// Fix react-slick test
// https://github.com/akiran/react-slick/issues/742
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

jest.mock('react-intl', () => {
  const locale = 'en';
  const intlMessages = jest.requireActual('./src/intl').default;
  const reactIntl = jest.requireActual('react-intl');
  const intl = reactIntl.createIntl({
    locale,
    messages: intlMessages[locale],
  });

  return {
    ...reactIntl,
    useIntl: () => intl,
    FormattedHTMLMessage: reactIntl.FormattedHTMLMessage,
  };
});

jest.mock('redux', () => ({
  combineReducers: jest.fn(),
  applyMiddleware: jest.fn(),
  compose: () => jest.fn(),
  createStore: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('react-intl-redux', () => ({
  updateIntl: jest.fn(),
}));

jest.mock('redux-saga', () => () => ({ run: jest.fn() }));

jest.mock('next/router', () => ({
  useRouter: () => ({ pathname: 'some path', query: {} }),
}));

import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import EmptyComment from '../EmptyComment';

describe('Testing NewsAndMediaDetails > Comments > EmptyComment', () => {
  const props = {
    paths: [
      {
        label: 'News and media',
        href: '/news-and-media',
      },
      {
        label: 'Technology news',
        href: '/news-and-media',
      },
      {
        label:
          // eslint-disable-next-line max-len
          'iPhone SE has some of the best iPhone 11 features, including wireless charging',
      },
    ],
  };
  it('should render match snapshot', () => {
    const wrapper = shallow(<EmptyComment {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

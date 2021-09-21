import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Comments from '../Comments';
import CommentBox from '../CommentBox';

describe('Testing NewsAndMediaDetails > Comments', () => {
  let wrapper;
  const props = {
    // TODO integration
    data: [
      {
        id: 'abc',
        avatar:
          // eslint-disable-next-line max-len
          'https://play-lh.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3',
        firstName: 'Hai',
        lastName: 'Bui',
        updatedAt: '2021-08-03T03:03:13.945Z',
        // eslint-disable-next-line max-len
        comment: `Anim duis cupidatat aliquip id et. Lorem nulla aliqua nisi dolore
    voluptate pariatur deserunt ad est. Sint exercitation minim labore
    aute deserunt cillum laboris aute esse ut.`,
        likes: 100,
        replies: [
          {
            id: 'abcd',
            avatar:
              // eslint-disable-next-line max-len
              'https://play-lh.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3',
            firstName: 'Hai',
            lastName: 'Bui',
            updatedAt: '2021-08-03T03:03:13.945Z',
            // eslint-disable-next-line max-len
            comment: `Anim duis cupidatat aliquip id et. Lorem nulla aliqua nisi dolore
    voluptate pariatur deserunt ad est. Sint exercitation minim labore
    aute deserunt cillum laboris aute esse ut.`,
            likes: 100,
            replies: [],
          },
          {
            id: 'abcde',
            avatar:
              // eslint-disable-next-line max-len
              'https://play-lh.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3',
            firstName: 'Hai',
            lastName: 'Bui',
            updatedAt: '2021-08-03T03:03:13.945Z',
            // eslint-disable-next-line max-len
            comment: `Anim duis cupidatat aliquip id et. Lorem nulla aliqua nisi dolore
    voluptate pariatur deserunt ad est. Sint exercitation minim labore
    aute deserunt cillum laboris aute esse ut.`,
            likes: 100,
            replies: [],
          },
        ],
      },
    ],
  };

  beforeAll(() => {
    wrapper = mount(<Comments {...props} />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<Comments {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a title', () => {
    expect(wrapper.find('[data-test="comments-title"]')).toHaveLength(1);
  });

  it('should have a filter', () => {
    expect(wrapper.find('[data-test="comments-filter"]')).toHaveLength(1);
  });

  it('should have CommentBox', () => {
    expect(wrapper.find(CommentBox)).toHaveLength(1);
  });
});

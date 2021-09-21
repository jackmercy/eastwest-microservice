import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import CommentPreview from '../CommentPreview';

describe('Testing NewsAndMediaDetails > Comments > CommentPreview', () => {
  let wrapper;
  const props = {
    data: {
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
      replies: [],
    },
  };

  beforeAll(() => {
    wrapper = mount(<CommentPreview {...props} />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<CommentPreview {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a user avatar', () => {
    expect(wrapper.find('[data-test="comment-preview-avatar"]')).toHaveLength(
      1,
    );
  });

  it('should have a user name', () => {
    expect(wrapper.find('[data-test="comment-preview-name"]')).toHaveLength(1);
  });

  it('should have a date', () => {
    expect(wrapper.find('[data-test="comment-preview-date"]')).toHaveLength(1);
  });

  it('should have a comment', () => {
    expect(wrapper.find('[data-test="comment-preview-comment"]')).toHaveLength(
      1,
    );
  });

  it('should have a reply button', () => {
    expect(
      wrapper.find('[data-test="comment-preview-reply-button"]'),
    ).toHaveLength(1);
  });

  it('should have a likes number', () => {
    expect(wrapper.find('[data-test="comment-preview-likes"]')).toHaveLength(1);
  });
});

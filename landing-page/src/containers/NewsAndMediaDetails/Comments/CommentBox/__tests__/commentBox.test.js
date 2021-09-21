import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import TextareaAutosize from 'react-textarea-autosize';

import CommentBox from '../CommentBox';

describe('Testing NewsAndMediaDetails > Comments > CommentBox', () => {
  let wrapper;
  const props = {
    onCancel: jest.fn(),
    onSubmit: jest.fn(),
  };

  beforeAll(() => {
    wrapper = mount(<CommentBox {...props} />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<CommentBox {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a textarea', () => {
    expect(wrapper.find(TextareaAutosize)).toHaveLength(1);
  });

  it('should have a cancel button', () => {
    expect(
      wrapper.find('[data-test="comment-box-cancel-button"]'),
    ).toHaveLength(1);
  });

  it('should have a submit button', () => {
    expect(
      wrapper.find('[data-test="comment-box-submit-button"]'),
    ).toHaveLength(1);
  });
});

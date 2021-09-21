import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Register from '../Register';

describe('Testing Footer > Register', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(<Register />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<Register />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a title', () => {
    expect(wrapper.find('[data-test="register-title"]')).toHaveLength(1);
  });

  it('should have an input', () => {
    expect(wrapper.find('[data-test="register-input"]')).toHaveLength(1);
  });

  it('should have a button', () => {
    expect(wrapper.find('[data-test="register-button"]')).toHaveLength(1);
  });

  it('should have some socials icons', () => {
    expect(
      wrapper.find('[data-test="register-socials"]').children(),
    ).toHaveLength(4);
  });
});

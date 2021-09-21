import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import MobileHeader from '../MobileHeader';

describe('Testing Header > MobileHeader', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(<MobileHeader />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<MobileHeader />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a logo', () => {
    expect(wrapper.find('[data-test="header-logo"]')).toHaveLength(1);
  });

  it('should have a services dropdown introduce', () => {
    expect(wrapper.find('[data-test="header-url-products"]')).toHaveLength(1);
  });

  // MVP hidden
  // it('should have a pricing url', () => {
  //   expect(wrapper.find('[data-test="header-url-pricing"]')).toHaveLength(1);
  // });

  it('should have a compnay url', () => {
    expect(wrapper.find('[data-test="header-url-company"]')).toHaveLength(1);
  });

  // MVP hidden
  // it('should have a support url', () => {
  //   expect(wrapper.find('[data-test="header-url-support"]')).toHaveLength(1);
  // });

  // it('should have a sign in url', () => {
  //   expect(wrapper.find('[data-test="header-url-sign-in"]')).toHaveLength(1);
  // });

  // it('should have a sign up url', () => {
  //   expect(wrapper.find('[data-test="header-url-sign-up"]')).toHaveLength(1);
  // });
});

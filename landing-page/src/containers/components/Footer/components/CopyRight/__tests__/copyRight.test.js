import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import CopyRight from '../CopyRight';

describe('Testing Footer > CopyRight', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(<CopyRight />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<CopyRight />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a license', () => {
    expect(wrapper.find('[data-test="copy-right-license"]')).toHaveLength(1);
  });

  it('should have a url terms', () => {
    const selector = wrapper.find('[data-test="copy-right-url-terms"]');
    expect(selector).toHaveLength(1);
    expect(selector.props().href).toEqual('/terms');
  });

  it('should have a url privacy', () => {
    const selector = wrapper.find('[data-test="copy-right-url-privacy"]');
    expect(selector).toHaveLength(1);
    expect(selector.props().href).toEqual('/privacy');
  });

  it('should have a url cookie statement', () => {
    const selector = wrapper.find(
      '[data-test="copy-right-url-cookie-statement"]',
    );
    expect(selector).toHaveLength(1);
    expect(selector.props().href).toEqual('/cookies');
  });

  it('should have a url legal', () => {
    const selector = wrapper.find('[data-test="copy-right-url-legal"]');
    expect(selector).toHaveLength(1);
    expect(selector.props().href).toEqual('/terms');
  });
});

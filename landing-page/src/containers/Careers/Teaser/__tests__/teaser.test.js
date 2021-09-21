import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Teaser from '../Teaser';

describe('Testing Careers > Teaser', () => {
  let wrapper;
  const props = { CTAId: '123' };

  beforeAll(() => {
    wrapper = mount(<Teaser {...props} />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<Teaser {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a title', () => {
    expect(wrapper.find('[data-test="teaser-title"]')).toHaveLength(1);
  });

  it('should have a description', () => {
    expect(wrapper.find('[data-test="teaser-description"]')).toHaveLength(1);
  });

  it('should have a CTA', () => {
    expect(wrapper.find('[data-test="teaser-cta"]')).toHaveLength(1);
  });

  it('should have a image', () => {
    expect(wrapper.find('[data-test="teaser-image"]')).toHaveLength(1);
  });
});

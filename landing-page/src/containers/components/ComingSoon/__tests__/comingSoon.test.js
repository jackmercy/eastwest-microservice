import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ComingSoon from '../ComingSoon';

describe('Testing ComingSoon', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(<ComingSoon />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<ComingSoon />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a teaser image', () => {
    expect(wrapper.find('[data-test="coming-soon-teaser-image"]')).toHaveLength(
      1,
    );
  });

  it('should have a teaser title', () => {
    expect(wrapper.find('[data-test="coming-soon-teaser-title"]')).toHaveLength(
      1,
    );
  });

  it('should have a cover image', () => {
    expect(wrapper.find('[data-test="coming-soon-cover-image"]')).toHaveLength(
      1,
    );
  });

  it('should have a title', () => {
    expect(wrapper.find('[data-test="coming-soon-title"]')).toHaveLength(1);
  });

  it('should have a description', () => {
    expect(wrapper.find('[data-test="coming-soon-description"]')).toHaveLength(
      1,
    );
  });
});

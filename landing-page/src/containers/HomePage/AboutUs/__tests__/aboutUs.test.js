import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import AboutUs from '../AboutUs';

describe('Testing HomePage > AboutUs', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(<AboutUs />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<AboutUs />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a title', () => {
    expect(wrapper.find('[data-test="about-us-title"]')).toHaveLength(1);
  });

  it('should have a description', () => {
    expect(wrapper.find('[data-test="about-us-description"]')).toHaveLength(1);
  });

  it('should show founed information', () => {
    expect(wrapper.find('[data-test="about-us-info-founded"]')).toHaveLength(1);
  });

  it('should show talents information', () => {
    expect(wrapper.find('[data-test="about-us-info-talents"]')).toHaveLength(1);
  });

  it('should show projects information', () => {
    expect(wrapper.find('[data-test="about-us-info-projects"]')).toHaveLength(
      1,
    );
  });

  it('should show raised information', () => {
    expect(wrapper.find('[data-test="about-us-info-raised"]')).toHaveLength(1);
  });
});

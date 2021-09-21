import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ContactUs from '../ContactUs';

describe('Testing HomePage > ContactUs', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(<ContactUs />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<ContactUs />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a cover image', () => {
    expect(wrapper.find('[data-test="contact-us-cover-image"]')).toHaveLength(
      1,
    );
  });

  it('should have a title', () => {
    expect(wrapper.find('[data-test="contact-us-title"]')).toHaveLength(
      1,
    );
  });

  it('should have a CTA button', () => {
    expect(wrapper.find('[data-test="contact-us-button"]')).toHaveLength(1);
  });
});

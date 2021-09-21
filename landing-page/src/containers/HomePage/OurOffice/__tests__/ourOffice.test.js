import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import preloadAll from 'jest-next-dynamic';

import OurOffice from '../OurOffice';

describe('Testing HomePage > OurOffice', () => {
  let wrapper;

  beforeAll(async () => {
    // WebImages and MobileImages included in OurOffice
    // And they are using dynamic import, see more in WebImages.js and MobileImages.js
    // So we need wait for it to load all before we can assert anything
    await preloadAll();
    wrapper = mount(<OurOffice />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<OurOffice />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a title', () => {
    expect(wrapper.find('[data-test="our-office-title"]')).toHaveLength(1);
  });

  it('should have some descriptions', () => {
    expect(wrapper.find('[data-test="our-office-description"]')).toHaveLength(
      2,
    );
  });

  it('should have a link talent-labs', () => {
    expect(
      wrapper.find('[data-test="our-office-link-talent-labs"]'),
    ).toHaveLength(1);
  });

  it('should have a link careers', () => {
    expect(wrapper.find('[data-test="our-office-link-careers"]')).toHaveLength(
      1,
    );
  });
});

import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import AboutProduct from '../AboutProduct';

describe('Testing DataLabs > Brands > AboutProduct', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(<AboutProduct />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<AboutProduct />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a title', () => {
    expect(wrapper.find('[data-test="about-product-title"]')).toHaveLength(1);
  });

  it('should have a description', () => {
    expect(
      wrapper.find('[data-test="about-product-description"]'),
    ).toHaveLength(1);
  });

  it('should show founed information', () => {
    expect(wrapper.find('[data-test="about-product-launch"]')).toHaveLength(1);
  });

  it('should show talents information', () => {
    expect(
      wrapper.find('[data-test="about-product-influencers"]'),
    ).toHaveLength(1);
  });

  it('should show projects information', () => {
    expect(wrapper.find('[data-test="about-product-brands"]')).toHaveLength(1);
  });

  it('should show raised information', () => {
    expect(wrapper.find('[data-test="about-product-campaigns"]')).toHaveLength(
      1,
    );
  });
});

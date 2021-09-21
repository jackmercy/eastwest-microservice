import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Reviews from '../Reviews';
import CustomCarousel from '../CustomCarousel';

describe('Testing DataLabs > Brands > Reviews', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(<Reviews />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<Reviews />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a title', () => {
    expect(wrapper.find('[data-test="reviews-title"]')).toHaveLength(1);
  });

  it('should have a list items', () => {
    expect(wrapper.find('[data-test="reviews-list-items"]')).toHaveLength(1);
  });

  it('should have CustomCarousel', () => {
    expect(wrapper.find(CustomCarousel)).toHaveLength(1);
  });
});

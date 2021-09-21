import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Products from '../Products';

describe('Testing TalentLabs > Products', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(<Products />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<Products />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a title', () => {
    expect(wrapper.find('[data-test="products-title"]')).toHaveLength(1);
  });

  it('should have a title', () => {
    expect(
      wrapper.find('[data-test="products-how-it-work-title"]'),
    ).toHaveLength(1);
  });

  it('should have a description', () => {
    expect(wrapper.find('[data-test="products-description"]')).toHaveLength(1);
  });
});

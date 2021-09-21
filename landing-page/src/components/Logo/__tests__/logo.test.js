import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Logo from '../Logo';

describe('Testing Logo component', () => {
  it('should render match snapshot', () => {
    const wrapper = shallow(<Logo />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a logo image', () => {
    const wrapper = mount(<Logo />);
    expect(wrapper.find('[data-test="component-logo-image"]')).toHaveLength(1);
  });
});

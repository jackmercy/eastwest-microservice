import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Layout from '../Layout';

describe('Testing Layout', () => {
  it('should render match snapshot', () => {
    const wrapper = shallow(<Layout />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

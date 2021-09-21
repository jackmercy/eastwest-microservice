import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Content from '../Content';

describe('Testing Terms > Content', () => {
  it('should render match snapshot', () => {
    const wrapper = shallow(<Content />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

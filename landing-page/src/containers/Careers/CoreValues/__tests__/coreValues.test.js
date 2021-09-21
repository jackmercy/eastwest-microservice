import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import CoreValues from '../CoreValues';

describe('Testing Careers > CoreValues', () => {
  const props = { id: 'our-mission' };

  it('should render match snapshot', () => {
    const wrapper = shallow(<CoreValues {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

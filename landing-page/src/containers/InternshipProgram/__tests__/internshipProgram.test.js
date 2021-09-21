import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import InternshipProgram from '../InternshipProgram';

describe('Testing InternshipProgram', () => {
  it('should render match snapshot', () => {
    const wrapper = shallow(<InternshipProgram />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

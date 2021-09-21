import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import FieldInput from '../FieldInput';

describe('Testing Input component > FieldInput', () => {
  it('should render match snapshot', () => {
    const wrapper = shallow(<FieldInput name="somename" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

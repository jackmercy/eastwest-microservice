import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import FieldError from '../FieldError';

describe('Testing Input component > FieldError', () => {
  it('should render match snapshot', () => {
    const wrapper = shallow(<FieldError error="Some error" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

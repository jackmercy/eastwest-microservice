import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import FieldLabel from '../FieldLabel';

describe('Testing Input component > FieldLabel', () => {
  it('should render match snapshot', () => {
    const wrapper = shallow(<FieldLabel htmlFor="something" label="Label" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { FieldLabel, FieldInput, FieldError } from '../components';
import Input from '../Input';

describe('Testing Input component', () => {
  let wrapper;
  const props = { label: 'input', name: 'input', error: 'some error' };

  beforeAll(() => {
    wrapper = mount(<Input {...props} />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<Input {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a FieldLabel', () => {
    expect(wrapper.find(FieldLabel)).toHaveLength(1);
  });

  it('should have a FieldInput', () => {
    expect(wrapper.find(FieldInput)).toHaveLength(1);
  });

  it('should have a FieldLabel', () => {
    expect(wrapper.find(FieldError)).toHaveLength(1);
  });
});

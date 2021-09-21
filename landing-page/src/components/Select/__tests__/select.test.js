import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Select from 'react-select';

import { FieldLabel, FieldError } from '../../Input';

import CustomSelect from '../Select';

describe('Testing Select component', () => {
  let wrapper;
  const props = {
    label: 'select',
    name: 'select',
    error: 'some error',
    onChange: jest.fn(),
    options: [],
  };

  beforeAll(() => {
    wrapper = mount(<CustomSelect {...props} />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<CustomSelect {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a FieldLabel', () => {
    expect(wrapper.find(FieldLabel)).toHaveLength(1);
  });

  it('should have a Select', () => {
    expect(wrapper.find(Select)).toHaveLength(1);
  });

  it('should have a FieldError', () => {
    expect(wrapper.find(FieldError)).toHaveLength(1);
  });
});

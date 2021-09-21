import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { FieldLabel, FieldInput, FieldError } from '../../components';
import InputPhone from '../InputPhone';

describe('Testing Input component > InputPhone', () => {
  let wrapper;
  const props = {
    label: 'Phone',
    name: 'phone',
    error: 'some error',
    onChange: jest.fn(),
  };

  beforeAll(() => {
    wrapper = mount(<InputPhone {...props} />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<InputPhone {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a FieldLabel', () => {
    expect(wrapper.find(FieldLabel)).toHaveLength(1);
  });

  it('should have a FieldInput', () => {
    expect(wrapper.find(FieldInput)).toHaveLength(1);
  });

  it('should have a FieldError', () => {
    expect(wrapper.find(FieldError)).toHaveLength(1);
  });
});

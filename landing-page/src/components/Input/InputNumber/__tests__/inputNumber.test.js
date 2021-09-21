import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { FieldLabel, FieldInput, FieldError } from '../../components';
import InputNumber from '../InputNumber';

describe('Testing Input component > InputNumber', () => {
  let wrapper;
  const props = {
    unit: '$',
    label: 'Amount',
    name: 'amount',
    error: 'some error',
    onChange: jest.fn(),
  };

  beforeAll(() => {
    wrapper = mount(<InputNumber {...props} />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<InputNumber {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a FieldLabel', () => {
    expect(wrapper.find(FieldLabel)).toHaveLength(1);
  });

  it('should have a FieldInput', () => {
    expect(wrapper.find(FieldInput)).toHaveLength(1);
  });

  it('should have a unit', () => {
    expect(
      wrapper.find('[data-test="component-input-number-unit"]'),
    ).toHaveLength(1);
  });

  it('should have a FieldError', () => {
    expect(wrapper.find(FieldError)).toHaveLength(1);
  });
});

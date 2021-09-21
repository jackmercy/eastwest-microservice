import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { FieldLabel, FieldInput, FieldError } from '../../components';
import InputPassword from '../InputPassword';

describe('Testing Input component > InputPassword', () => {
  let wrapper;
  const props = { label: 'Password', name: 'password', error: 'some error' };

  beforeAll(() => {
    wrapper = mount(<InputPassword {...props} />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<InputPassword {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a FieldLabel', () => {
    expect(wrapper.find(FieldLabel)).toHaveLength(1);
  });

  it('should have a FieldInput', () => {
    expect(wrapper.find(FieldInput)).toHaveLength(1);
  });

  it('should have a eye icon', () => {
    expect(
      wrapper.find('[data-test="component-input-password-icon"]'),
    ).toHaveLength(1);
  });

  it('should have a FieldError', () => {
    expect(wrapper.find(FieldError)).toHaveLength(1);
  });
});

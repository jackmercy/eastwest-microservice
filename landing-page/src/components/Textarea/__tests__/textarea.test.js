import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { FieldLabel, FieldInput, FieldError } from '../../Input';
import Textarea from '../Textarea';

describe('Testing Textarea component', () => {
  let wrapper;
  const props = {
    label: 'Note',
    name: 'note',
    error: 'some error',
  };

  beforeAll(() => {
    wrapper = mount(<Textarea {...props} />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<Textarea {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a FieldLabel', () => {
    expect(wrapper.find(FieldLabel)).toHaveLength(1);
  });

  it('should have a FieldInput with tag "textarea"', () => {
    expect(wrapper.find(FieldInput).props().tag).toEqual('textarea');
  });

  it('should have a FieldError', () => {
    expect(wrapper.find(FieldError)).toHaveLength(1);
  });
});
